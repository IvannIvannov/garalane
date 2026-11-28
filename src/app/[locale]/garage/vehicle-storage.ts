export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number | null;
};

const key = "garalane.vehicles.v1";
const changeEvent = "garalane:vehicles-changed";

export const latestYear = () => new Date().getFullYear() + 1;

function isVehicle(value: unknown): value is Vehicle {
  if (!value || typeof value !== "object") return false;
  const { id, make, model, year, mileage } = value as Partial<Vehicle>;
  return (
    typeof id === "string" && id.length > 0 &&
    typeof make === "string" && make.trim().length > 0 && make.length <= 60 &&
    typeof model === "string" && model.trim().length > 0 && model.length <= 80 &&
    typeof year === "number" && Number.isInteger(year) && year >= 1886 &&
    (mileage === null || (typeof mileage === "number" && Number.isSafeInteger(mileage) && mileage >= 0))
  );
}

export function parseVehicles(serialized: string): Vehicle[] {
  const vehicles: unknown = JSON.parse(serialized);
  if (!Array.isArray(vehicles) || !vehicles.every(isVehicle) ||
      new Set(vehicles.map((vehicle) => vehicle.id)).size !== vehicles.length) {
    throw new Error("Invalid garage data");
  }
  return vehicles;
}

export function getVehicleSnapshot() {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return null;
  }
}

export function subscribeToVehicles(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === key || event.key === null) listener();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, listener);
  };
}

export async function updateVehicles(update: (vehicles: Vehicle[]) => Vehicle[] | null) {
  const write = () => {
    const current = parseVehicles(localStorage.getItem(key) ?? "[]");
    const next = update(current);
    if (!next) return false;
    localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new Event(changeEvent));
    return true;
  };

  return navigator.locks ? navigator.locks.request(key, write) : write();
}
