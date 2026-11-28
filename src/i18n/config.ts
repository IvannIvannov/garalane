export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export const localeCookie = "garalane-locale";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
