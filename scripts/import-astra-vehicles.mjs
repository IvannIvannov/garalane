import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline";

// Source: Swiss Federal Roads Office (ASTRA), TARGA open government data.
// https://opendata.astra.admin.ch/ivzod/2000-Typengenehmigungen_TG_TARGA/2200-Basisdaten_TG_ab_1995/
// Download TG-Automobil.txt; the field layout is documented in Basisdaten_TG_ab_1995.pdf.
const [input] = process.argv.slice(2);
if (!input) throw new Error("Usage: node scripts/import-astra-vehicles.mjs path/to/TG-Automobil.txt");

const garage = new URL("../src/app/[locale]/garage/", import.meta.url);
const catalog = JSON.parse(await readFile(new URL("vehicle-catalog.json", garage), "utf8"));
const ademe = JSON.parse(await readFile(new URL("engine-catalog.json", garage), "utf8"));
const decoder = new TextDecoder("windows-1252");
const decode = (value) => decoder.decode(Buffer.from(value, "latin1")).trim();
const normalize = (value) => value.normalize("NFKD").replace(/\p{M}/gu, "").toUpperCase();
const key = (value) => normalize(value).replace(/[^\p{L}\p{N}]/gu, "");
const makes = new Map(Object.keys(catalog).map((make) => [key(make), make]));
makes.set("VOLKSWAGEN", "VW");
makes.set("MERCEDES", "Mercedes-Benz");

const models = Object.fromEntries(Object.entries(catalog).map(([make, names]) => [
  make,
  [...new Set([...names, ...Object.keys(ademe[make] ?? {})])]
    .map((name) => [name, normalize(name).replace(/[^A-Z0-9]+/g, " ").trim().split(" ")])
    .sort((a, b) => b[0].length - a[0].length),
]));

const fuels = {
  B: "petrol", D: "diesel", E: "electric", K: "ethanol", N: "cng", X: "hydrogen", Z: "lpg",
};
const records = new Map();
let header = false;
const lines = createInterface({ input: createReadStream(input, { encoding: "latin1" }), crlfDelay: Infinity });

for await (const line of lines) {
  if (!header) {
    if (!line.startsWith("Typengenehmigungsnummer\t")) throw new Error("Unexpected ASTRA header");
    header = true;
    continue;
  }

  const fields = line.split("\t");
  if (fields[9] !== "M1") continue;
  const make = makes.get(key(decode(fields[10])));
  const fuelCode = fields[62];
  const fuel = fuelCode === "C" || fuelCode === "F"
    ? (/\bPin\b/i.test(fields[61]) ? "plugInHybrid" : "hybrid")
    : fuels[fuelCode];
  const from = Number(fields[1]?.slice(0, 4));
  const until = Number(fields[2]?.slice(0, 4));
  const power = Number(fields[64]);
  const displacement = Number(fields[63]);
  if (!make || !fuel || !Number.isInteger(from) || from < 1900 || from > 2100 || !power || (until && until < from)) continue;

  const name = decode(fields[11]).replace(/\s+/g, " ");
  const parts = normalize(name).replace(/\bALLR\./g, "ALLROAD ").replace(/[^A-Z0-9]+/g, " ").trim().split(" ");
  const model = models[make].find(([, tokens]) => tokens.every((token, i) =>
    token === parts[i] ||
    (make === "BMW" && /^\d{3}$/.test(token) && parts[i]?.startsWith(token) && /^([DEI]|GT)$/.test(parts[i].slice(3))),
  ))?.[0];
  if (!model) continue;

  const engineCode = decode(fields[60]).replace(/\s+/g, " ");
  // Audi's approval-type field can say B8 on both generations; use chassis prefixes.
  const chassis = make === "Audi" && /^A4\b/i.test(name) ? fields[13]?.slice(6, 8) : "";
  const generation = chassis === "8K" ? "B8" : chassis === "F4" ? "B9" : "";
  const description = [name, generation, engineCode, displacement > 0 && displacement + " cm³", power + " kW"]
    .filter(Boolean).join(" · ");
  if (description.length > 160) continue;

  const fingerprint = JSON.stringify([make, model, fuel, from, until || null, description]);
  records.set(fingerprint, [make, model, fuel, from, until || null, description]);
}

const rows = [...records.values()].sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
const audi = rows.filter(([make, model, fuel, from, until]) =>
  make === "Audi" && model === "A4" && fuel === "diesel" && from <= 2015 && (!until || until >= 2015),
);
if (rows.length < 1000 || !audi.some((row) => row[5].includes("B8 · CGLC")) || !audi.some((row) => row[5].includes("B9 · DEUA"))) {
  throw new Error("ASTRA export did not include expected Audi A4 diesel variants; check the source file");
}

await writeFile(new URL("astra-engine-catalog.json", garage), "[\n" + rows.map((row) => "  " + JSON.stringify(row)).join(",\n") + "\n]\n");
console.log(`Imported ${rows.length} records, including ${audi.length} Audi A4 diesel approval records for 2015.`);
