import { notFound } from "next/navigation";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import GarageShowcase from "@/components/GarageShowcase/GarageShowcase";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getHomeContent } from "@/i18n/home";

import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale: requestedLocale } = await params;

  if (!isLocale(requestedLocale)) {
    notFound();
  }

  const locale: Locale = requestedLocale;
  const dictionary = getDictionary(locale);
  const content = getHomeContent(locale);

  return (
    <div id="top">
      <Header locale={locale} />

      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroMain}>
              <div>
                <p className={styles.eyebrowLight}>
                  {content.hero.eyebrow}
                </p>

                <h1>
                  {content.hero.lineOne}
                  <br />
                  {content.hero.lineTwo}
                  <br />
                  <span>{content.hero.lineThree}</span>
                </h1>

                <div className={styles.heroAside}>
                  <p>{content.hero.description}</p>

                  <div className={styles.heroActions}>
                    <a className={styles.primaryButton} href="#garage">
                      {content.hero.primary}
                    </a>

                    <a className={styles.textButton} href="#services">
                      {content.hero.secondary}
                    </a>
                  </div>

                  <small>{content.hero.note}</small>
                </div>
              </div>

              <div className={styles.heroVisual} aria-hidden="true">
                <svg viewBox="0 0 680 360" fill="none" focusable="false">
                  <ellipse className={styles.carShadow} cx="340" cy="277" rx="291" ry="42" />
                  <path className={styles.groundLine} d="M42 277H638" />
                  <g className={styles.car}>
                    <path className={styles.carBody} d="M57 239V216Q60 199 84 196L169 178 228 127Q254 105 296 103H429Q475 104 506 130L558 176 608 193Q628 199 631 221L626 244 591 250H82Z" />
                    <path className={styles.carGlass} d="M192 174 240 135Q259 118 297 117H426Q466 117 494 141L532 174Z" />
                    <path className={styles.carDetail} d="M326 117 321 175 318 238M436 117 449 175 456 236M75 215 135 210M209 207 528 196M218 237H477M344 191H366M468 189H488M530 191 545 178M594 231H624" />
                    <g className={styles.wheels}>
                      <circle cx="170" cy="241" r="36" />
                      <circle cx="534" cy="241" r="36" />
                      <circle cx="170" cy="241" r="20" />
                      <circle cx="534" cy="241" r="20" />
                      <path d="M170 225v32m-16-16h32m348-16v32m-16-16h32" />
                    </g>
                    <path className={styles.carOutline} pathLength="1" d="M57 239V216Q60 199 84 196L169 178 228 127Q254 105 296 103H429Q475 104 506 130L558 176 608 193Q628 199 631 221L626 244 591 250H574M494 250H210M130 250H82Z" />
                    <path className={styles.headlights} d="M577 200 608 207 616 215M62 217 88 211" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.intro} id="about">
          <div className={styles.inner}>
            <div className={styles.introGrid}>
              <div>
                <p className={styles.sectionLabel}>{content.intro.eyebrow}</p>
                <h2>
                  {content.intro.lineOne}
                  <br />
                  <span>{content.intro.lineTwo}</span>
                </h2>
              </div>
              <p className={styles.introCopy}>{content.intro.description}</p>
            </div>
          </div>
        </section>

        <section className={styles.garage} id="garage">
          <div className={styles.inner}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionLabel}>{content.garage.eyebrow}</p>

                <h2>
                  {content.garage.lineOne}
                  <br />
                  <span>{content.garage.lineTwo}</span>
                </h2>
              </div>

              <p className={styles.sectionDescription}>
                {content.garage.description}
              </p>
            </div>

            <GarageShowcase locale={locale} dictionary={dictionary} />

            <p className={styles.showcaseNote}>{content.garage.note}</p>
          </div>
        </section>

        <section className={styles.benefits}>
          <div className={styles.inner}>
            <div className={styles.benefitsTitle}>
              <p className={styles.sectionLabel}>
                {content.benefits.eyebrow}
              </p>

              <h2>
                {content.benefits.lineOne}
                <br />
                <span>{content.benefits.lineTwo}</span>
              </h2>
            </div>

            <div className={styles.benefitList}>
              {content.benefits.items.map((item) => (
                <article className={styles.benefit} key={item.number}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.services} id="services">
          <div className={styles.inner}>
            <div className={styles.servicesGrid}>
              <div className={styles.servicesTitle}>
                <p className={styles.eyebrowLight}>
                  {content.services.eyebrow}
                </p>

                <h2>
                  {content.services.lineOne}
                  <br />
                  <span>{content.services.lineTwo}</span>
                </h2>

                <p>{content.services.description}</p>
              </div>

              <div>
                <div className={styles.servicesList}>
                  {content.services.items.map((item) => (
                    <div className={styles.serviceItem} key={item.number}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>

                <p className={styles.servicesNote}>{content.services.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className={styles.inner}>
            <div className={styles.closingContent}>
              <h2>
                {content.closing.lineOne}
                <br />
                <span>{content.closing.lineTwo}</span>
              </h2>

              <a href="#top">
                {content.closing.action}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
