import Link from "next/link";

import type { Locale } from "@/i18n/config";

import styles from "./Brand.module.css";

type BrandProps = {
  locale: Locale;
  tone?: "light" | "dark";
};

export default function Brand({ locale, tone = "light" }: BrandProps) {
  return (
    <Link
      href={`/${locale}`}
      className={styles.brand}
      data-tone={tone}
      aria-label="GARALANE — Home"
    >
      <span className={styles.symbol} aria-hidden="true">
        <svg viewBox="0 0 38 38" fill="none">
          <path
            d="M5 29V16.5L19 5L33 16.5V29"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 29L19 15L26 29"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 23V32"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className={styles.wordmark}>
        garalane<span className={styles.period}>.</span>
      </span>
    </Link>
  );
}
