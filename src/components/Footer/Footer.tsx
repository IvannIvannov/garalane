import Link from "next/link";

import Brand from "@/components/Brand/Brand";

import type { Locale } from "@/i18n/config";
import { getSiteContent } from "@/i18n/site";

import styles from "./Footer.module.css";

type FooterProps = {
  locale: Locale;
};

export default function Footer({ locale }: FooterProps) {
  const { footer } = getSiteContent(locale);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Brand locale={locale} tone="dark" />

            <p>{footer.tagline}</p>
          </div>

          <nav className={styles.links}>
            <Link href={`/${locale}#garage`}>{footer.garage}</Link>

            <Link href={`/${locale}#services`}>{footer.services}</Link>

            <Link href={`/${locale}#about`}>{footer.about}</Link>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span>{footer.description}</span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
