import Link from "next/link";

import Brand from "@/components/Brand/Brand";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

import type { Locale } from "@/i18n/config";
import { getSiteContent } from "@/i18n/site";

import styles from "./Header.module.css";

type HeaderProps = {
  locale: Locale;
};

export default function Header({ locale }: HeaderProps) {
  const { nav } = getSiteContent(locale);

  const links = [
    { href: `/${locale}/garage`, label: nav.garage },
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}#about`, label: nav.about },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Brand locale={locale} />

        <nav className={styles.navigation} aria-label={nav.navigation}>
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher locale={locale} />

          <Link className={styles.actionLink} href={`/${locale}#garage`}>
            {nav.explore}
          </Link>
        </div>
      </div>

      <nav className={styles.mobileNavigation} aria-label={nav.navigation}>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
