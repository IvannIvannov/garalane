import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { isLocale } from "@/i18n/config";
import { vehicleText } from "@/i18n/vehicles";

import VehicleGarage from "./VehicleGarage";
import styles from "./garage.module.css";

type GaragePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: GaragePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return {
    title: `${vehicleText[locale].title} | GARALANE`,
    description: vehicleText[locale].description,
    alternates: {
      canonical: `/${locale}/garage`,
      languages: { bg: "/bg/garage", en: "/en/garage" },
    },
  };
}

export default async function GaragePage({ params }: GaragePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = vehicleText[locale];

  return (
    <>
      <Header locale={locale} />
      <main className={styles.main}>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
        <p className={styles.storage}>{t.storage}</p>
        <VehicleGarage locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
