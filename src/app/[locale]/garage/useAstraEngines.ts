import { useEffect, useState } from "react";

type CatalogResult = { query: string; found: { matching: string[]; otherYears: string[] } | null };

export function useAstraEngines(query: string) {
  const [result, setResult] = useState<CatalogResult>();

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(`/api/vehicle-engines?${query}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Engine lookup failed");
        const found: NonNullable<CatalogResult["found"]> = await response.json();
        if (!controller.signal.aborted) setResult({ query, found });
      } catch {
        if (!controller.signal.aborted) setResult({ query, found: null });
      }
    }

    void load();
    return () => controller.abort();
  }, [query]);

  return result?.query === query ? result.found : undefined;
}
