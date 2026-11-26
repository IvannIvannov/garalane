import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ArrowIcon from "@/components/ui/ArrowIcon";
import GarageShowcase from "@/features/garage/components/GarageShowcase";

const serviceTypes = [
  {
    id: "01",
    name: "Автосервизи",
    description: "Поддръжка и ремонт",
  },
  {
    id: "02",
    name: "Автомивки",
    description: "Чистота и грижа",
  },
  {
    id: "03",
    name: "Детайлинг",
    description: "До последния детайл",
  },
  {
    id: "04",
    name: "Гуми и джанти",
    description: "За всеки сезон",
  },
];

function HeroSection() {
  return (
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
              разходите, историята на обслужванията и услугите, от които имаш
              нужда.
            </p>

            <div className="hero-actions">
              <a href="#garage" className="hero-button">
                Разгледай моя гараж
                <ArrowIcon />
              </a>

              <a href="#services" className="hero-text-link">
                Автомобилни услуги
                <ArrowIcon diagonal />
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
                <ArrowIcon diagonal />
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
                <ArrowIcon diagonal />
              </div>

              <div>
                <h2>Автомобилни услуги</h2>
                <p>
                  Откривай автосервизи, автомивки и специалисти според нуждите
                  на автомобила ти.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>GARALANE — YOUR CAR. YOUR WAY.</span>

          <a href="#vision">
            Научи повече
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="statement-section">
      <div className="container statement-layout">
        <p className="section-overline">ПОЗНАЙ АВТОМОБИЛА СИ</p>

        <h2>
          Автомобилът ти има история.
          <span> Дай ѝ място.</span>
        </h2>

        <p className="statement-copy">
          Зареждания, ремонти, важни дати и документи. Всичко, което досега е
          било на различни места, вече може да има един дом.
        </p>
      </div>
    </section>
  );
}

function GarageSection() {
  return (
    <section id="garage" className="garage-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-overline">ЛИЧЕН ГАРАЖ</p>
            <h2>Твоят автомобил. Под контрол.</h2>
          </div>

          <p>
            Виж цялата информация за автомобила си, следи разходите и подреждай
            обслужванията.
          </p>
        </div>

        <GarageShowcase />

        <div className="garage-caption">
          <span>GARALANE GARAGE</span>
          <span>Интерактивна демонстрация · Функцията е в разработка</span>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
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
                Гориво, ремонти и консумативи — виж какво действително струва
                автомобилът ти.
              </p>
            </div>
          </div>

          <div>
            <span>02</span>

            <div>
              <h3>История, която остава</h3>
              <p>
                Подреждай ремонтите и обслужванията, за да знаеш какво е правено
                и кога.
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
  );
}

function ServicesSection() {
  return (
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
            Garalane ще свързва шофьорите с автомобилни специалисти, сервизи и
            бизнеси на едно място.
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

              <ArrowIcon diagonal />
            </div>
          ))}

          <p className="service-disclaimer">
            Каталогът с услуги е в разработка.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="end-section">
      <div className="container end-layout">
        <p>EVERY CAR HAS A STORY.</p>

        <h2>Нека я подредим.</h2>

        <a href="#garage">
          Разгледай гаража
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="site">
      <Header />

      <main>
        <HeroSection />
        <VisionSection />
        <GarageSection />
        <BenefitsSection />
        <ServicesSection />
        <ClosingSection />
      </main>

      <Footer />
    </div>
  );
}
