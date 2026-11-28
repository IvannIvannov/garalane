"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { setLocalePreference } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";
import { getSiteContent } from "@/i18n/site";

import styles from "./LanguageSwitcher.module.css";

type LanguageSwitcherProps = {
  locale: Locale;
};

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [hasError, setHasError] = useState(false);

  const { nav } = getSiteContent(locale);

  function changeLanguage(nextLocale: Locale) {
    if (isPending || nextLocale === locale) {
      return;
    }

    setHasError(false);

    startTransition(async () => {
      try {
        await setLocalePreference(nextLocale);

        const newPathname = pathname.replace(
          /^\/(bg|en)(?=\/|$)/,
          `/${nextLocale}`,
        );

        const target = newPathname || `/${nextLocale}`;
        const search = window.location.search;
        const hash = window.location.hash;

        router.push(`${target}${search}${hash}`);
      } catch {
        setHasError(true);
      }
    });
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.switcher}
        role="group"
        aria-label={nav.language}
        aria-busy={isPending}
      >
        <button
          type="button"
          className={locale === "bg" ? styles.selected : ""}
          aria-pressed={locale === "bg"}
          disabled={isPending}
          onClick={() => changeLanguage("bg")}
        >
          BG
        </button>

        <span className={styles.separator} aria-hidden="true" />

        <button
          type="button"
          className={locale === "en" ? styles.selected : ""}
          aria-pressed={locale === "en"}
          disabled={isPending}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      </div>

      {hasError && (
        <p className={styles.error} role="alert">
          {nav.languageError}
        </p>
      )}
    </div>
  );
}
