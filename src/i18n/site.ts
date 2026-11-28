import type { Locale } from "./config";

const siteContent = {
  bg: {
    nav: {
      garage: "Моят гараж",
      services: "Услуги",
      about: "За GARALANE",
      explore: "Разгледай",
      navigation: "Основна навигация",
      language: "Избор на език",
      languageError: "Не успяхме да сменим езика. Опитай отново.",
    },
    footer: {
      tagline: "Your car. Your way.",
      description: "Едно място за твоя автомобил.",
      about: "За платформата",
      garage: "Дигитален гараж",
      services: "Автомобилни услуги",
      copyright: "© 2026 GARALANE",
    },
  },
  en: {
    nav: {
      garage: "My garage",
      services: "Services",
      about: "About GARALANE",
      explore: "Explore",
      navigation: "Main navigation",
      language: "Select language",
      languageError: "Could not change language. Please try again.",
    },
    footer: {
      tagline: "Your car. Your way.",
      description: "One place for your car.",
      about: "About the platform",
      garage: "Digital garage",
      services: "Automotive services",
      copyright: "© 2026 GARALANE",
    },
  },
} as const;

export function getSiteContent(locale: Locale) {
  return siteContent[locale];
}
