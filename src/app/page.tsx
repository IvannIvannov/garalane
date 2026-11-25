import Link from "next/link";

const expenseCategories = [
  { name: "Гориво", amount: "185,40 €", share: "48%", tone: "fuel" },
  { name: "Поддръжка", amount: "124,00 €", share: "32%", tone: "service" },
  { name: "Други", amount: "77,60 €", share: "20%", tone: "other" },
];

const services = [
  {
    title: "Автосервизи",
    description: "Поддръжка, диагностика и ремонт.",
  },
  {
    title: "Автомивки",
    description: "Грижа за автомобила отвътре и отвън.",
  },
  {
    title: "Детайлинг",
    description: "Специализирано почистване и защита.",
  },
];

function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Garalane — Начало">
      <span className="logo-symbol" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M4 25V14L16 5L28 14V25"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 25L16 14L21 25"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>garalane</span>
    </Link>
  );
}

function GaragePreview() {
  return (
    <div className="garage-preview">
      <div className="preview-heading">
        <div>
          <span className="preview-overline">Примерен изглед</span>
          <h3>Моят гараж</h3>
        </div>
        <span className="preview-date">Ноември 2026</span>
      </div>

      <div className="vehicle-card">
        <div className="vehicle-information">
          <span className="vehicle-label">МОЯТ АВТОМОБИЛ</span>
          <h4>BMW 320d Touring</h4>
          <p>2018 г. · Дизел · Автоматик</p>
        </div>
        <div className="vehicle-mileage">
          <span>Километраж</span>
          <strong>125 400 км</strong>
        </div>
      </div>

      <div className="expense-heading">
        <div>
          <span className="field-label">РАЗХОДИ ЗА МЕСЕЦА</span>
          <div className="expense-amount">387,00 €</div>
        </div>
        <span className="expense-period">Ноември</span>
      </div>

      <div
        className="expense-bar"
        aria-label="Разпределение на примерни разходи"
      >
        {expenseCategories.map((category) => (
          <span
            key={category.name}
            className={`bar-segment ${category.tone}`}
            style={{ width: category.share }}
          />
        ))}
      </div>

      <div className="expense-list">
        {expenseCategories.map((category) => (
          <div className="expense-item" key={category.name}>
            <div className="expense-category">
              <span className={`category-dot ${category.tone}`} />
              <span>{category.name}</span>
            </div>
            <strong>{category.amount}</strong>
          </div>
        ))}
      </div>

      <div className="preview-bottom">
        <span>Данните са илюстративни.</span>
        <span>GARALANE GARAGE</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-content">
          <Logo />

          <nav className="main-navigation" aria-label="Основна навигация">
            <a href="#garage">Моят гараж</a>
            <a href="#services">Услуги</a>
            <a href="#about">За платформата</a>
          </nav>

          <a href="#garage" className="header-link">
            Разгледай проекта
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">ТВОЯТ АВТОМОБИЛ, НА ЕДНО МЯСТО</span>

              <h1>
                По-лесен начин
                <br />
                да се грижиш
                <br />
                <span>за автомобила си.</span>
              </h1>

              <p>
                Следи разходите и обслужването на автомобила си. Откривай
                подходящи специалисти и пази всичко важно подредено на едно
                място.
              </p>

              <div className="hero-actions">
                <a href="#garage" className="primary-link">
                  Разгледай личния гараж
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="#about" className="text-link">
                  Научи повече
                </a>
              </div>

              <span className="development-note">
                GARALANE е в процес на разработка.
              </span>
            </div>

            <GaragePreview />
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="container intro-layout">
            <span className="section-label">ЗА GARALANE</span>
            <div className="intro-copy">
              <h2>
                Автомобилът е част от ежедневието. Грижата за него трябва да
                бъде по-лесна.
              </h2>
              <p>
                Създаваме платформа, която обединява личната автомобилна история
                и полезните услуги около нея. Без излишна сложност и разпиляна
                информация.
              </p>
            </div>
          </div>
        </section>

        <section className="garage-section" id="garage">
          <div className="container garage-layout">
            <div className="section-copy">
              <span className="section-label">МОЯТ ГАРАЖ</span>
              <h2>Познай автомобила си по-добре.</h2>
              <p>
                Добави автомобила си и съхранявай на едно място неговите
                разходи, ремонти, документи и история на обслужването.
              </p>
              <span className="section-status">В разработка</span>
            </div>

            <div className="garage-details">
              <div className="detail-row">
                <span className="detail-number">01</span>
                <div>
                  <h3>Разходи</h3>
                  <p>
                    Гориво, ремонти, консумативи и всичко останало, което плащаш
                    за автомобила.
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <span className="detail-number">02</span>
                <div>
                  <h3>Сервизна история</h3>
                  <p>
                    Съхранявай информация за обслужванията и извършените
                    ремонти.
                  </p>
                </div>
              </div>

              <div className="detail-row">
                <span className="detail-number">03</span>
                <div>
                  <h3>Важни дати</h3>
                  <p>
                    Организирай предстоящите обслужвания и документите на
                    автомобила.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <div className="services-intro">
              <div>
                <span className="section-label">АВТОМОБИЛНИ УСЛУГИ</span>
                <h2>Намери правилното място.</h2>
              </div>
              <p>
                Работим и върху пространство, в което ще можеш да откриваш
                автомобилни бизнеси според услугите, които търсиш.
              </p>
            </div>

            <div className="services-list">
              {services.map((service, index) => (
                <div className="service-row" key={service.title}>
                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <Logo />
          <p>Грижа за автомобила, без излишна сложност.</p>
          <span>© {new Date().getFullYear()} Garalane</span>
        </div>
      </footer>
    </div>
  );
}
