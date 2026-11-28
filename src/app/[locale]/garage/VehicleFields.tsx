"use client";

import { useState } from "react";

import type { Locale } from "@/i18n/config";
import { vehicleText } from "@/i18n/vehicles";

import catalog from "./vehicle-catalog.json";
import engineCatalog from "./engine-catalog.json";
import GarageDropdown, { dropdownOptions } from "./GarageDropdown";
import styles from "./garage.module.css";
import { useAstraEngines } from "./useAstraEngines";
import { fuelTypes, isFuelType, latestYear, type FuelType, type Vehicle } from "./vehicle-storage";

// Snapshot of the Mobile.bg car and SUV search catalog (cmm, categories 1 and 2).
// ADEME Car Labelling, 2026-10-14, Etalab Open Licence 2.0.
const enginesByMake: Record<string, Record<string, Partial<Record<FuelType, string[]>>>> = engineCatalog;

const modelsByMake = new Map(Object.entries(catalog).map(([make, models]) => [
  make,
  [...new Set([...models, ...Object.keys(enginesByMake[make] ?? {})])]
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true })),
]));
const makes = [...modelsByMake.keys()].sort((a, b) => a.localeCompare(b));
const custom = "__custom__";
const mileageOptions = Array.from({ length: 101 }, (_, index) => index * 5_000);

export default function VehicleFields({
  existing,
  locale,
  pending,
}: {
  existing: Vehicle | null;
  locale: Locale;
  pending: boolean;
}) {
  const t = vehicleText[locale];
  const [make, setMake] = useState(() => {
    if (!existing) return "";
    return makes.find((name) => name.toLowerCase() === existing.make.toLowerCase()) ?? custom;
  });
  const [model, setModel] = useState(() => {
    if (!existing) return "";
    return modelsByMake.get(make)?.find((name) => name.toLowerCase() === existing.model.toLowerCase()) ?? custom;
  });
  const [mileage, setMileage] = useState(() => {
    const value = existing?.mileage;
    if (value == null) return "";
    return mileageOptions.includes(value) ? String(value) : custom;
  });

  const [fuel, setFuel] = useState<FuelType | "">(existing?.fuel ?? "");
  const [year, setYear] = useState(existing ? String(existing.year) : "");
  const [engine, setEngine] = useState(existing?.engine ?? "");
  const [manualMake, setManualMake] = useState(existing?.make ?? "");
  const [manualModel, setManualModel] = useState(existing?.model ?? "");
  const [manualMileage, setManualMileage] = useState(existing?.mileage?.toString() ?? "");
  const [manualEngine, setManualEngine] = useState(existing?.engine ?? "");

  const models = modelsByMake.get(make) ?? [];
  const query = make && make !== custom && model && model !== custom && year && fuel
    ? new URLSearchParams({ make, model, year, fuel }).toString()
    : "";
  const astra = useAstraEngines(query);
  const loading = !!query && astra === undefined;
  const fallback = fuel ? enginesByMake[make]?.[model]?.[fuel] ?? [] : [];
  const matching = astra?.matching ?? [];
  const otherYears = astra?.otherYears ?? [];
  const undated = loading ? [] : fallback.filter((variant) => !matching.includes(variant) && !otherYears.includes(variant));
  const variants = [...matching, ...otherYears, ...undated];
  const engineChoice = engine && !variants.includes(engine) ? custom : engine;

  function clearEngine() {
    setEngine("");
    setManualEngine("");
  }

  const maxYear = latestYear();
  const years = Array.from({ length: maxYear - 1886 + 1 }, (_, index) => maxYear - index);
  if (existing && existing.year > maxYear) years.unshift(existing.year);
  const number = new Intl.NumberFormat(locale);

  const manualText = (max: number, onCommit: (value: string) => void) => ({
    label: t.useTypedValue,
    valid: (value: string) => value.length <= max,
    onCommit,
  });
  const empty = { value: "", label: t.optional };
  const engineOptions = (values: string[]) => values.map((value) => ({
    value, label: value.replace(/ · US EPA$/, " · " + t.usMarket),
  }));

  return (
    <div className={styles.fields}>
      <div>
        <GarageDropdown noResults={t.noMatches} label={t.make} placeholder={t.chooseMake} name={make === custom ? undefined : "make"}
          value={make} required disabled={pending}
          manual={manualText(60, (value) => {
            setManualMake(value);
            setMake(custom);
            setModel(custom);
            setManualModel("");
            clearEngine();
          })}
          groups={[{ options: [...dropdownOptions(makes), { value: custom, label: t.otherMake }] }]}
          onChange={(value) => {
            if (value === make) return;
            setMake(value);
            setModel(value === custom ? custom : "");
            setManualModel("");
            clearEngine();
          }} />
        {make === custom && (
          <label className={styles.customField}>
            {t.otherMake}
            <input name="make" value={manualMake} onChange={(event) => setManualMake(event.target.value)} required maxLength={60} disabled={pending} />
          </label>
        )}
      </div>

      <div>
        <GarageDropdown noResults={t.noMatches} label={t.model} placeholder={t.chooseModel} name={model === custom ? undefined : "model"}
          value={model} required disabled={pending || !make}
          manual={manualText(80, (value) => {
            setManualModel(value);
            setModel(custom);
            clearEngine();
          })}
          groups={[{ options: [...dropdownOptions(models), { value: custom, label: t.otherModel }] }]}
          onChange={(value) => {
            if (value === model) return;
            setModel(value);
            clearEngine();
          }} />
        {model === custom && (
          <label className={styles.customField}>
            {t.otherModel}
            <input name="model" value={manualModel} onChange={(event) => setManualModel(event.target.value)} required maxLength={80} disabled={pending} />
          </label>
        )}
      </div>

      <GarageDropdown noResults={t.noMatches} label={t.year} placeholder={t.chooseYear} name="year" value={year} required disabled={pending}
        groups={[{ options: dropdownOptions(years) }]} onChange={(value) => {
          if (value === year) return;
          setYear(value);
          clearEngine();
        }} />

      <GarageDropdown noResults={t.noMatches} label={t.fuel} placeholder={t.optional} name="fuel" value={fuel} disabled={pending}
        groups={[{ options: [empty, ...fuelTypes.map((type) => ({ value: type, label: t.fuels[type] }))] }]}
        onChange={(value) => {
          if (value === fuel) return;
          setFuel(isFuelType(value) ? value : "");
          clearEngine();
        }} />

      <div>
        <GarageDropdown noResults={t.noMatches} label={t.engine} placeholder={t.optional} name={engineChoice === custom ? undefined : "engine"}
          value={engineChoice} disabled={pending || !fuel || !model || !year} onChange={setEngine}
          manual={manualText(160, (value) => { setManualEngine(value); setEngine(custom); })}
          groups={[
            { options: [empty] },
            { label: t.engineMatching, options: engineOptions(matching) },
            { label: t.engineOtherYears, options: engineOptions(otherYears) },
            { label: t.engineUndated, options: engineOptions(undated) },
            { options: [{ value: custom, label: t.otherEngine }] },
          ]} />
        {query && engineChoice !== custom && (loading || !variants.length) && (
          <p className={styles.fieldNote} role="status">
            {loading ? t.engineLoading : astra === null ? t.engineUnavailable : t.engineMissing}
          </p>
        )}
        {engineChoice === custom && (
          <label className={styles.customField}>
            {t.otherEngine}
            <input name="engine" value={manualEngine} maxLength={160} required disabled={pending}
              onChange={(event) => setManualEngine(event.target.value)} />
          </label>
        )}
      </div>

      <div>
        <GarageDropdown noResults={t.noMatches} label={t.mileage} placeholder={t.optional} name={mileage === custom ? undefined : "mileage"}
          value={mileage} disabled={pending} onChange={setMileage}
          manual={{
            label: t.useTypedValue,
            valid: (value) => /^[0-9]+$/.test(value) && Number.isSafeInteger(Number(value)),
            onCommit: (value) => { setManualMileage(value); setMileage(custom); },
          }}
          groups={[{ options: [
            empty,
            ...mileageOptions.map((value) => ({ value: String(value), label: number.format(value) + " " + t.kilometers })),
            { value: custom, label: t.exactMileage },
          ] }]} />
        {mileage === custom && (
          <label className={styles.customField}>
            {t.exactMileage}
            <input name="mileage" type="number" min={0} max={Number.MAX_SAFE_INTEGER}
              value={manualMileage} onChange={(event) => setManualMileage(event.target.value)} required disabled={pending} />
          </label>
        )}
      </div>
    </div>
  );
}
