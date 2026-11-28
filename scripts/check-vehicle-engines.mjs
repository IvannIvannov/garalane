import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:3187";

async function lookup(make, model, year, fuel = "diesel") {
  const query = new URLSearchParams({ make, model, year: String(year), fuel });
  const response = await fetch(new URL(`/api/vehicle-engines?${query}`, base));
  assert.equal(response.status, 200);
  return response.json();
}

async function engines(make, model, year) {
  return (await lookup(make, model, year)).matching;
}

const series3 = await engines("BMW", "3", 2015);
assert(series3.some((name) => name.includes("320d") && name.includes("N47D20C")), "BMW 3 Series should list 320d");
assert(!series3.some((name) => name.includes("520d")), "BMW 3 Series should exclude 520d");

const specific320 = await engines("BMW", "320", 2024);
assert(specific320.some((name) => name.includes("320d") && name.includes("B47D20B")), "BMW 320 diesel should include the diesel hybrid");
assert(!specific320.some((name) => name.includes("320i")), "BMW 320 diesel should exclude petrol versions");

const series5 = await engines("BMW", "5", 2018);
assert(series5.some((name) => name.includes("520d")), "BMW 5 Series should list 520d");

const a4 = await engines("Audi", "A4", 2015);
assert(a4.some((name) => name.includes("B8 · CGLC")) && a4.some((name) => name.includes("B9 · DEUA")), "Audi A4 should still list both 2015 generations");

const avalanche = await lookup("Chevrolet", "Avalanche", 2012, "ethanol");
assert(avalanche.matching.some((name) => name.includes("5.3 L") && name.includes("US EPA")), "EPA-only model should appear");
const otherYears = await lookup("Audi", "A4", 2014);
assert(!otherYears.matching.some((name) => name.includes("B9 · DEUA")), "B9 must not be listed as a 2014 match");
assert(otherYears.otherYears.some((name) => name.includes("B9 · DEUA")), "Other-year variants remain selectable");

console.log("BMW, Audi, Chevrolet and year-group checks passed.");
