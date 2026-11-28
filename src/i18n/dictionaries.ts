import type { Locale } from "./config";

const bg = {
  nav: {
    garage: "Моят гараж",
    services: "Услуги",
    about: "За Garalane",
    explore: "Разгледай",
    language: "Език",
  },
  hero: {
    eyebrow: "ЕДНО МЯСТО ЗА ТВОЯ АВТОМОБИЛ",
    title: "Всичко за колата ти.",
    titleAccent: "По твоя начин.",
    description:
      "Garalane събира на едно място личния ти автомобилен гараж, разходите, историята на обслужванията и услугите, от които имаш нужда.",
    primary: "Разгледай моя гараж",
    secondary: "Автомобилни услуги",
    development: "Платформата е в процес на разработка.",
    garageTitle: "Моят гараж",
    garageDescription:
      "Добави автомобила си. Следи гориво, ремонти, разходи и предстоящи обслужвания.",
    servicesTitle: "Автомобилни услуги",
    servicesDescription:
      "Откривай автосервизи, автомивки и специалисти според нуждите на автомобила ти.",
    learnMore: "Научи повече",
  },
  vision: {
    eyebrow: "ПОЗНАЙ АВТОМОБИЛА СИ",
    title: "Автомобилът ти има история.",
    accent: "Дай ѝ място.",
    description:
      "Зареждания, ремонти, важни дати и документи. Всичко, което досега е било на различни места, вече може да има един дом.",
  },
  garage: {
    eyebrow: "ЛИЧЕН ГАРАЖ",
    title: "Твоят автомобил. Под контрол.",
    description:
      "Виж цялата информация за автомобила си, следи разходите и подреждай обслужванията.",
    preview: "Интерактивна демонстрация · Функцията е в разработка",
    personalSpace: "Моят гараж",
    vehicles: "Автомобили",
    maintenance: "Обслужвания",
    documents: "Документи",
    example: "Примерен изглед",
    myVehicle: "МОЯТ АВТОМОБИЛ",
    diesel: "дизел",
    automatic: "Автоматик",
    active: "Активен",
    mileage: "ПРОБЕГ",
    kilometers: "км",
    digitalGarage: "Дигитален гараж",
    expenses: "Разходи",
    history: "Сервизна история",
    expensesMonth: "Разходи за ноември",
    exampleData: "Примерни данни",
    fuel: "Гориво",
    service: "Обслужване",
    other: "Други",
    oil: "Масло и филтри",
    brakes: "Предни спирачни накладки",
    inspection: "Годишен технически преглед",
    sep: "12 сеп 2026",
    jun: "04 юни 2026",
    mar: "18 мар 2026",
    historyNote: "Примерни данни за представяне на функцията.",
    openTab: "Преглед на гаража",
  },
  benefits: {
    eyebrow: "ВСИЧКО ВАЖНО",
    title: "По-малко хаос.",
    accent: "Повече яснота.",
    items: [
      {
        title: "Разходите на едно място",
        description:
          "Гориво, ремонти и консумативи — виж какво действително струва автомобилът ти.",
      },
      {
        title: "История, която остава",
        description:
          "Подреждай ремонтите и обслужванията, за да знаеш какво е правено и кога.",
      },
      {
        title: "Грижа навреме",
        description:
          "Важни дати, документи и предстоящи обслужвания — без излишно търсене.",
      },
    ],
  },
  services: {
    eyebrow: "УСЛУГИ ЗА АВТОМОБИЛА",
    title: "Правилното място.",
    accent: "Когато ти трябва.",
    description:
      "Garalane ще свързва шофьорите с автомобилни специалисти, сервизи и бизнеси на едно място.",
    disclaimer: "Каталогът с услуги е в разработка.",
    items: [
      { title: "Автосервизи", description: "Поддръжка и ремонт" },
      { title: "Автомивки", description: "Чистота и грижа" },
      { title: "Детайлинг", description: "До последния детайл" },
      { title: "Гуми и джанти", description: "За всеки сезон" },
    ],
  },
  closing: {
    eyebrow: "EVERY CAR HAS A STORY.",
    title: "Нека я подредим.",
    action: "Разгледай гаража",
  },
  footer: {
    development: "Платформата е в процес на разработка.",
  },
  metadata: {
    title: "GARALANE — Всичко за автомобила ти",
    description:
      "Личен дигитален гараж, автомобилни разходи, сервизна история и услуги на едно място.",
  },
};

export type Dictionary = typeof bg;

const en: Dictionary = {
  nav: {
    garage: "My Garage",
    services: "Services",
    about: "About Garalane",
    explore: "Explore",
    language: "Language",
  },
  hero: {
    eyebrow: "ONE PLACE FOR EVERYTHING AUTOMOTIVE",
    title: "Everything about your car.",
    titleAccent: "Your way.",
    description:
      "Garalane brings your personal garage, vehicle expenses, maintenance history and automotive services together in one place.",
    primary: "Explore My Garage",
    secondary: "Automotive services",
    development: "The platform is currently in development.",
    garageTitle: "My Garage",
    garageDescription:
      "Add your vehicle. Keep track of fuel, repairs, expenses and upcoming maintenance.",
    servicesTitle: "Automotive services",
    servicesDescription:
      "Discover repair shops, car washes and specialists for your vehicle.",
    learnMore: "Learn more",
  },
  vision: {
    eyebrow: "KNOW YOUR CAR BETTER",
    title: "Every car has a story.",
    accent: "Give yours a home.",
    description:
      "Fuel stops, repairs, important dates and documents. All the details that used to live in different places can finally come together.",
  },
  garage: {
    eyebrow: "YOUR PERSONAL GARAGE",
    title: "Your car. Under control.",
    description:
      "View your vehicle details, track expenses and keep your maintenance history organized.",
    preview: "Interactive preview · Feature in development",
    personalSpace: "My Garage",
    vehicles: "Vehicles",
    maintenance: "Maintenance",
    documents: "Documents",
    example: "Preview",
    myVehicle: "MY VEHICLE",
    diesel: "diesel",
    automatic: "Automatic",
    active: "Active",
    mileage: "MILEAGE",
    kilometers: "km",
    digitalGarage: "Digital garage",
    expenses: "Expenses",
    history: "Service history",
    expensesMonth: "Expenses in November",
    exampleData: "Sample data",
    fuel: "Fuel",
    service: "Maintenance",
    other: "Other",
    oil: "Oil and filters",
    brakes: "Front brake pads",
    inspection: "Annual vehicle inspection",
    sep: "12 Sep 2026",
    jun: "04 Jun 2026",
    mar: "18 Mar 2026",
    historyNote: "Sample records used to demonstrate this feature.",
    openTab: "Garage overview",
  },
  benefits: {
    eyebrow: "THE ESSENTIALS",
    title: "Less hassle.",
    accent: "More clarity.",
    items: [
      {
        title: "Expenses in one place",
        description:
          "Fuel, repairs and maintenance — understand what owning your car really costs.",
      },
      {
        title: "A history worth keeping",
        description:
          "Keep track of repairs and maintenance, so you always know what was done and when.",
      },
      {
        title: "Stay a step ahead",
        description:
          "Important dates, documents and upcoming maintenance, all organized.",
      },
    ],
  },
  services: {
    eyebrow: "AUTOMOTIVE SERVICES",
    title: "The right place.",
    accent: "When you need it.",
    description:
      "Garalane will help drivers discover automotive professionals, workshops and services in one place.",
    disclaimer: "The services directory is in development.",
    items: [
      { title: "Repair shops", description: "Maintenance and repairs" },
      { title: "Car washes", description: "Cleaning and care" },
      { title: "Detailing", description: "Attention to every detail" },
      { title: "Tires and wheels", description: "Ready for every season" },
    ],
  },
  closing: {
    eyebrow: "EVERY CAR HAS A STORY.",
    title: "Let's keep yours together.",
    action: "Explore My Garage",
  },
  footer: {
    development: "The platform is currently in development.",
  },
  metadata: {
    title: "GARALANE — Everything about your car",
    description:
      "Your digital garage, vehicle expenses, maintenance history and automotive services in one place.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { bg, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
