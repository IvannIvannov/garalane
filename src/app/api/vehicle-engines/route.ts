import astraRecords from "../../[locale]/garage/astra-engine-catalog.json";
import epaRecords from "../../[locale]/garage/epa-engine-catalog.json";

type EngineRecord = [number, number | null, string];
const engines = new Map<string, EngineRecord[]>();
const normalize = (value: string) => value.normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const engineKey = (make: string, model: string, fuel: string) => JSON.stringify([normalize(make), normalize(model), fuel]);

for (const [make, model, fuel, first, last, description] of [...astraRecords, ...epaRecords] as
  [string, string, string, ...EngineRecord][]) {
  const models = [model];
  if (make === "BMW" && /^[1-8]\d{2}$/.test(model)) models.push(model[0]);

  // BMW's d badge identifies diesel variants, including those with electric assistance.
  const dieselHybrid = make === "BMW" && fuel === "hybrid" &&
    /\b(?:[1-8]\d{2}|(?:xdrive|sdrive|m)?\d{2})d\b/i.test(description.split(" · ", 1)[0]);
  const fuels = dieselHybrid ? [fuel, "diesel"] : [fuel];

  for (const name of models) {
    for (const energy of fuels) {
      const key = engineKey(make, name, energy);
      const variants = engines.get(key) ?? [];
      variants.push([first, last, description]);
      engines.set(key, variants);
    }
  }
}

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const make = params.get("make");
  const model = params.get("model");
  const year = Number(params.get("year"));
  const fuel = params.get("fuel");

  if (!make || make.length > 60 || !model || model.length > 80 ||
      !fuel || fuel.length > 20 || !Number.isInteger(year) || year < 1886 || year > 2100) {
    return Response.json({ error: "Invalid vehicle filters" }, { status: 400 });
  }

  const variants = engines.get(engineKey(make, model, fuel)) ?? [];
  const matching = new Set<string>();
  const otherYears = new Set<string>();
  for (const [first, last, description] of variants) {
    const group = first <= year && (last === null || last >= year) ? matching : otherYears;
    group.add(description);
  }

  const sort = (a: string, b: string) => a.localeCompare(b, "en", { numeric: true });
  return Response.json({
    matching: [...matching].sort(sort),
    otherYears: [...otherYears].filter((description) => !matching.has(description)).sort(sort),
  });
}
