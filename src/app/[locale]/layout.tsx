import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = getDictionary(locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    applicationName: "GARALANE",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bg: "/bg",
        en: "/en",
      },
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale: Locale = locale;

  return (
    <html lang={currentLocale}>
      <body>{children}</body>
    </html>
  );
}
