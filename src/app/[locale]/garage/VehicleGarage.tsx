"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import type { Locale } from "@/i18n/config";
import { vehicleText } from "@/i18n/vehicles";

import styles from "./garage.module.css";
import VehicleFields from "./VehicleFields";
import {
  getVehicleSnapshot,
  isFuelType,
  latestYear,
  parseVehicles,
  subscribeToVehicles,
  updateVehicles,
  type Vehicle,
} from "./vehicle-storage";

const serverSnapshot = () => undefined;

export default function VehicleGarage({ locale }: { locale: Locale }) {
  const t = vehicleText[locale];
  const snapshot = useSyncExternalStore(subscribeToVehicles, getVehicleSnapshot, serverSnapshot);
  const [editor, setEditor] = useState<Vehicle | "new" | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (snapshot === undefined) return <p role="status">{t.loading}</p>;
  let vehicles: Vehicle[];

  try {
    if (snapshot === null) throw new Error("Storage unavailable");
    vehicles = parseVehicles(snapshot);
  } catch {
    return <p role="alert">{t.unavailable}</p>;
  }

  const existing = editor === "new" ? null : editor;
  const number = new Intl.NumberFormat(locale);

  function openEditor(target: typeof editor) {
    setError("");
    setEditor(target);
  }

  async function apply(update: Parameters<typeof updateVehicles>[0], closeEditor = false) {
    if (pending) return;
    setPending(true);
    setError("");
    try {
      if (!(await updateVehicles(update))) {
        setError(t.missing);
      } else if (closeEditor) {
        setEditor(null);
      }
    } catch {
      setError(t.saveError);
    } finally {
      setPending(false);
    }
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const make = String(form.get("make") ?? "").trim();
    const model = String(form.get("model") ?? "").trim();
    const year = Number(form.get("year"));
    const fuelInput = form.get("fuel");
    const engine = String(form.get("engine") ?? "").trim() || undefined;
    const fuel = isFuelType(fuelInput) ? fuelInput : undefined;
    const mileageInput = String(form.get("mileage") ?? "").trim();
    const mileage = mileageInput === "" ? null : Number(mileageInput);

    if (!make || make.length > 60 || !model || model.length > 80 ||
        (!fuel && Boolean(fuelInput)) || (engine && (!fuel || engine.length > 160)) ||
        !Number.isInteger(year) || year < 1886 || year > latestYear() ||
        (mileage !== null && (!Number.isSafeInteger(mileage) || mileage < 0))) {
      setError(t.invalid);
      return;
    }

    void apply((current) => {
      if (!existing) return [...current, { id: crypto.randomUUID(), make, model, year, mileage, fuel, engine }];
      if (!current.some(({ id }) => id === existing.id)) return null;
      return current.map((car) => car.id === existing.id ? { ...car, make, model, year, mileage, fuel, engine } : car);
    }, true);
  }

  function remove(vehicle: Vehicle) {
    if (!window.confirm(t.confirm.replace("{vehicle}", () => `${vehicle.make} ${vehicle.model}`))) return;
    void apply((current) => current.some(({ id }) => id === vehicle.id)
      ? current.filter(({ id }) => id !== vehicle.id)
      : null);
  }

  return (
    <section className={styles.workspace} aria-label={t.title} aria-busy={pending}>
      {editor === null ? (
        <button className={styles.primary} type="button" onClick={() => openEditor("new")} disabled={pending}>
          {t.add}
        </button>
      ) : (
        <form className={styles.editor} onSubmit={save}>
          <h2>{existing ? t.edit : t.add}</h2>
          <VehicleFields existing={existing} locale={locale} pending={pending} />
          <div className={styles.actions}>
            <button className={styles.primary} disabled={pending}>{t.save}</button>
            <button className={styles.secondary} type="button" disabled={pending} onClick={() => openEditor(null)}>{t.cancel}</button>
          </div>
        </form>
      )}
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {vehicles.length === 0 ? <p className={styles.empty}>{t.empty}</p> : (
        <ul className={styles.list}>
          {vehicles.map((vehicle) => (
            <li key={vehicle.id} className={styles.vehicle}>
              <div>
                <h2>{vehicle.make} {vehicle.model}</h2>
                <p>{vehicle.year}{vehicle.mileage !== null && ` · ${number.format(vehicle.mileage)} ${t.kilometers}`}</p>
                {vehicle.fuel && <p>{t.fuels[vehicle.fuel]}{vehicle.engine && ` · ${vehicle.engine.replace(/ · US EPA$/, " · " + t.usMarket)}`}</p>}
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.secondary} aria-label={`${t.edit} — ${vehicle.make} ${vehicle.model}`} disabled={pending || editor !== null} onClick={() => openEditor(vehicle)}>{t.edit}</button>
                <button type="button" className={styles.secondary} aria-label={`${t.remove} — ${vehicle.make} ${vehicle.model}`} disabled={pending || editor !== null} onClick={() => remove(vehicle)}>{t.remove}</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
