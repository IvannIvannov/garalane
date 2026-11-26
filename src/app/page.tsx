"use client";

import Link from "next/link";
import { useState } from "react";

type GarageTab = "expenses" | "history";

const expenses = [
  { label: "Гориво", value: "185,40 €", percent: 48, color: "fuel" },
  { label: "Обслужване", value: "124,00 €", percent: 32, color: "maintenance" },
  { label: "Други", value: "77,60 €", percent: 20, color: "other" },
];

const history = [
  {
    title: "Масло и филтри",
    date: "12 сеп 2026",
    km: "123 800 км",
    price: "124,00 €",
  },
  {
    title: "Предни спирачни накладки",
    date: "04 юни 2026",
    km: "119 200 км",
    price: "165,00 €",
  },
  {
    title: "Годишен технически преглед",
    date: "18 мар 2026",
    km: "115 400 км",
    price: "45,00 €",
  },
];

const serviceTypes = [
  {
    name: "Автосервизи",
    description: "Поддръжка и ремонт",
    id: "01",
  },
  {
    name: "Автомивки",
    description: "Чистота и грижа",
    id: "02",
  },
  {
    name: "Детайлинг",
    description: "До последния детайл",
    id: "03",
  },
  {
    name: "Гуми и джанти",
    description: "За всеки сезон",
    id: "04",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M5 19 19 5M8 5h11v11" />
      ) : (
        <path d="M4 12h16m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Garalane — начало">
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 36 36" fill="none">
          <path
            d="M5 27V15L18 6l13 9v12"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m12 27 6-12 6 12M18 21v6"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>
        garalane<span className="brand-period">.</span>
      </span>
    </Link>
  );
}

function GarageShowcase() {
  const [activeTab, setActiveTab] = useState<GarageTab>("expenses");

  return (
    <div className="garage-window">
      <div className="window-sidebar">
        <Brand />

        <div className="sidebar-nav">
          <span className="sidebar-active">Моят гараж</span>
          <span>Автомобили</span>
          <span>Обслужвания</span>
          <span>Документи</span>
        </div>

        <span className="sidebar-bottom">Примерен изглед</span>
      </div>

      <div className="window-main">
        <div className="window-head">
          <span>Моят гараж</span>
          <span className="window-avatar">IV</span>
        </div>

        <div className="window-title">
          <div>
            <span className="window-label">МОЯТ АВТОМОБИЛ</span>
            <h3>BMW 320d Touring</h3>
            <p>2018 · 2.0 дизел · Автоматик</p>
          </div>

          <span className="vehicle-status">
            <span />
            Активен
          </span>
        </div>

        <div className="vehicle-visual">
          <div className="vehicle-visual-info">
            <span>ПРОБЕГ</span>
            <strong>
              125 400 <small>км</small>
            </strong>
          </div>

          <span className="vehicle-visual-note">Дигитален гараж</span>

          <div className="vehicle-outline" aria-hidden="true">
            <svg viewBox="0 0 650 230" fill="none">
              <path
                d="M78 144 131 130 191 73Q209 57 243 57h166q31 0 50 19l63 56 52 14q20 5 24 24l5 19H48l5-24q4-16 25-21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="m203 77-42 55h332l-47-51q-15-17-38-17H246q-28 0-43 13Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M326 65v67M156 132h341M72 157h514"
                stroke="currentColor"
                strokeOpacity=".45"
              />
              <circle
                cx="166"
                cy="185"
                r="34"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="492"
                cy="185"
                r="34"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle
                cx="166"
                cy="185"
                r="19"
                stroke="currentColor"
                strokeOpacity=".5"
              />
              <circle
                cx="492"
                cy="185"
                r="19"
                stroke="currentColor"
                strokeOpacity=".5"
              />
            </svg>
          </div>
        </div>

        <div
          className="garage-tabs"
          role="tablist"
          aria-label="Преглед на гаража"
        >
          <button
            type="button"
            role="tab"
            id="expenses-tab"
            aria-controls="garage-panel"
            aria-selected={activeTab === "expenses"}
            onClick={() => setActiveTab("expenses")}
            className={activeTab === "expenses" ? "active" : ""}
          >
            Разходи
          </button>

          <button
            type="button"
            role="tab"
            id="history-tab"
            aria-controls="garage-panel"
            aria-selected={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            className={activeTab === "history" ? "active" : ""}
          >
            Сервизна история
          </button>
        </div>

        <div className="garage-tab-content">
          {activeTab === "expenses" ? (
            <div
              id="garage-panel"
              role="tabpanel"
              aria-labelledby="expenses-tab"
              className="expense-content"
            >
              <div className="expense-summary">
                <div>
                  <span>Разходи за ноември</span>
                  <strong>387,00 €</strong>
                </div>
                <span>Примерни данни</span>
              </div>

              <div
                className="expense-track"
                role="img"
                aria-label="48% гориво, 32% обслужване, 20% други"
              >
                {expenses.map((item) => (
                  <span
                    key={item.label}
                    className={item.color}
                    style={{ width: `${item.percent}%` }}
                  />
                ))}
              </div>

              <div className="expense-legend">
                {expenses.map((item) => (
                  <div key={item.label}>
                    <span className={`legend-dot ${item.color}`} />
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              id="garage-panel"
              role="tabpanel"
              aria-labelledby="history-tab"
              className="history-content"
            >
              {history.map((item) => (
                <div className="history-row" key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      {item.date} · {item.km}
                    </span>
                  </div>
                  <strong>{item.price}</strong>
                </div>
              ))}

              <p>Примерни данни за представяне на функцията.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />

          <nav aria-label="Основна навигация" className="nav-links">
            <a href="#garage">Моят гараж</a>
            <a href="#services">Услуги</a>
            <a href="#vision">За Garalane</a>
          </nav>

          <a href="#garage" className="nav-cta">
            Разгледай <Arrow diagonal />
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-content">
              <div className="hero-heading">
                <p className="hero-overline">ЕДНО МЯСТО ЗА ТВОЯ АВТОМОБИЛ</p>

                <h1>
                  Всичко за колата ти.
                  <br />
                  <em>По твоя начин.</em>
                </h1>

                <p className="hero-subtitle">
                  Garalane събира на едно място личния ти автомобилен гараж,
                  разходите, историята на обслужванията и услугите, от които
                  имаш нужда.
                </p>

                <div className="hero-actions">
                  <a href="#garage" className="hero-button">
                    Разгледай моя гараж <Arrow />
                  </a>

                  <a href="#services" className="hero-text-link">
                    Автомобилни услуги <Arrow diagonal />
                  </a>
                </div>

                <p className="hero-development">
                  Платформата е в процес на разработка.
                </p>
              </div>

              <div className="hero-capabilities">
                <a href="#garage" className="hero-capability">
                  <div className="capability-top">
                    <span>01</span>
                    <Arrow diagonal />
                  </div>

                  <div>
                    <h2>Моят гараж</h2>
                    <p>
                      Добави автомобила си. Следи гориво, ремонти, разходи и
                      предстоящи обслужвания.
                    </p>
                  </div>
                </a>

                <a href="#services" className="hero-capability">
                  <div className="capability-top">
                    <span>02</span>
                    <Arrow diagonal />
                  </div>

                  <div>
                    <h2>Автомобилни услуги</h2>
                    <p>
                      Откривай автосервизи, автомивки и специалисти според
                      нуждите на автомобила ти.
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="hero-bottom">
              <span>GARALANE — YOUR CAR. YOUR WAY.</span>
              <a href="#vision">
                Научи повече <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section id="vision" className="statement-section">
          <div className="container statement-layout">
            <p className="section-overline">ПОЗНАЙ АВТОМОБИЛА СИ</p>

            <h2>
              Автомобилът ти има история.
              <span> Дай ѝ място.</span>
            </h2>

            <p className="statement-copy">
              Зареждания, ремонти, важни дати и документи. Всичко, което досега
              е било на различни места, вече може да има един дом.
            </p>
          </div>
        </section>

        <section id="garage" className="garage-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-overline">ЛИЧЕН ГАРАЖ</p>
                <h2>Твоят автомобил. Под контрол.</h2>
              </div>

              <p>
                Виж цялата информация за автомобила си, следи разходите и
                подреждай обслужванията.
              </p>
            </div>

            <GarageShowcase />

            <div className="garage-caption">
              <span>GARALANE GARAGE</span>
              <span>Интерактивна демонстрация · Функцията е в разработка</span>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="container benefits-layout">
            <div>
              <p className="section-overline">ВСИЧКО ВАЖНО</p>
              <h2>
                По-малко хаос.
                <br />
                Повече яснота.
              </h2>
            </div>

            <div className="benefit-list">
              <div>
                <span>01</span>
                <div>
                  <h3>Разходите на едно място</h3>
                  <p>
                    Гориво, ремонти и консумативи — виж какво действително
                    струва автомобилът ти.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>
                <div>
                  <h3>История, която остава</h3>
                  <p>
                    Подреждай ремонтите и обслужванията, за да знаеш какво е
                    правено и кога.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>
                <div>
                  <h3>Грижа навреме</h3>
                  <p>
                    Важни дати, документи и предстоящи обслужвания — без излишно
                    търсене.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="container services-layout">
            <div className="services-intro">
              <p className="section-overline">УСЛУГИ ЗА АВТОМОБИЛА</p>

              <h2>
                Правилното място.
                <br />
                <em>Когато ти трябва.</em>
              </h2>

              <p>
                Garalane ще свързва шофьорите с автомобилни специалисти, сервизи
                и бизнеси на едно място.
              </p>
            </div>

            <div className="service-list">
              {serviceTypes.map((service) => (
                <div key={service.id} className="service-row">
                  <span>{service.id}</span>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <Arrow diagonal />
                </div>
              ))}

              <p className="service-disclaimer">
                Каталогът с услуги е в разработка.
              </p>
            </div>
          </div>
        </section>

        <section className="end-section">
          <div className="container end-layout">
            <p>EVERY CAR HAS A STORY.</p>
            <h2>Нека я подредим.</h2>
            <a href="#garage">
              Разгледай гаража <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-layout">
          <Brand />
          <span>Платформата е в процес на разработка.</span>
          <span>© 2026 GARALANE</span>
        </div>
      </footer>
    </div>
  );
}
