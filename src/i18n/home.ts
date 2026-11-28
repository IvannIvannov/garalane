import type { Locale } from "./config";

const homeContent = {
  bg: {
    hero: {
      eyebrow: "ЕДНО МЯСТО ЗА ТВОЯ АВТОМОБИЛ",
      lineOne: "Всичко за",
      lineTwo: "колата ти.",
      lineThree: "По твоя начин.",
      description:
        "Твоят автомобилен свят, подреден на едно място. Управлявай разходите, следи обслужванията и откривай подходящите услуги.",
      primary: "Разгледай гаража",
      secondary: "Автомобилни услуги",
      note: "Платформата е в процес на разработка.",
    },
    intro: {
      eyebrow: "ЗАЩО GARALANE",
      lineOne: "Автомобилът ти има история.",
      lineTwo: "Дай ѝ място.",
      description:
        "Зареждания, ремонти, важни дати и документи. Информацията, която досега е била на различни места, вече може да има един дом.",
    },
    garage: {
      eyebrow: "ДИГИТАЛЕН ГАРАЖ",
      lineOne: "Твоят автомобил.",
      lineTwo: "Всичко под контрол.",
      description:
        "Един по-ясен поглед към автомобила ти — от последното зареждане до следващото обслужване.",
      note: "Интерактивен пример с демонстрационни данни.",
    },
    benefits: {
      eyebrow: "СЪЗДАДЕН ЗА ЕЖЕДНЕВИЕТО",
      lineOne: "По-малко хаос.",
      lineTwo: "Повече яснота.",
      items: [
        {
          number: "01",
          title: "Твоят личен гараж",
          description:
            "Организирай информацията за автомобилите си в едно пространство.",
        },
        {
          number: "02",
          title: "Разходи без догадки",
          description:
            "Проследявай колко харчиш за гориво, ремонти и поддръжка.",
        },
        {
          number: "03",
          title: "История, която остава",
          description: "Преглеждай извършените обслужвания и важните събития.",
        },
      ],
    },
    services: {
      eyebrow: "АВТОМОБИЛНИ УСЛУГИ",
      lineOne: "Грижата за колата.",
      lineTwo: "На една ръка разстояние.",
      description:
        "Откривай места и специалисти според нуждите на автомобила си. Разработваме каталог, който да прави избора по-лесен.",
      items: [
        {
          number: "01",
          title: "Автосервизи",
          description: "Поддръжка и ремонти",
        },
        {
          number: "02",
          title: "Автомивки",
          description: "Почистване и грижа",
        },
        {
          number: "03",
          title: "Детайлинг",
          description: "Професионална грижа",
        },
        {
          number: "04",
          title: "Части и аксесоари",
          description: "Всичко необходимо",
        },
      ],
      note: "Каталогът с услуги е в процес на разработка.",
    },
    closing: {
      lineOne: "Твоят автомобил.",
      lineTwo: "Твоят начин.",
      action: "Обратно към началото",
    },
  },
  en: {
    hero: {
      eyebrow: "ONE PLACE FOR YOUR CAR",
      lineOne: "Everything for",
      lineTwo: "your car.",
      lineThree: "Your way.",
      description:
        "Your automotive world, organized in one place. Manage expenses, follow maintenance history, and discover the services you need.",
      primary: "Explore the garage",
      secondary: "Automotive services",
      note: "The platform is currently in development.",
    },
    intro: {
      eyebrow: "WHY GARALANE",
      lineOne: "Your car has a story.",
      lineTwo: "Give it a place.",
      description:
        "Fuel stops, repairs, important dates, and documents. Information that used to live in different places can finally have one home.",
    },
    garage: {
      eyebrow: "DIGITAL GARAGE",
      lineOne: "Your vehicle.",
      lineTwo: "Everything in control.",
      description:
        "A clearer view of your car — from your last fuel stop to the next maintenance appointment.",
      note: "Interactive preview with sample data.",
    },
    benefits: {
      eyebrow: "BUILT FOR EVERYDAY LIFE",
      lineOne: "Less chaos.",
      lineTwo: "More clarity.",
      items: [
        {
          number: "01",
          title: "Your personal garage",
          description:
            "Keep information about your vehicles organized in one space.",
        },
        {
          number: "02",
          title: "Know what you spend",
          description: "Track fuel, repairs, and maintenance expenses.",
        },
        {
          number: "03",
          title: "A history that stays",
          description:
            "Review completed services and important vehicle events.",
        },
      ],
    },
    services: {
      eyebrow: "AUTOMOTIVE SERVICES",
      lineOne: "Better care for your car.",
      lineTwo: "Easier to find.",
      description:
        "Discover businesses and specialists for your car. We're building a directory to make finding the right service easier.",
      items: [
        {
          number: "01",
          title: "Repair shops",
          description: "Maintenance and repairs",
        },
        {
          number: "02",
          title: "Car washes",
          description: "Cleaning and care",
        },
        {
          number: "03",
          title: "Detailing",
          description: "Professional care",
        },
        {
          number: "04",
          title: "Parts and accessories",
          description: "Everything you need",
        },
      ],
      note: "The services directory is under development.",
    },
    closing: {
      lineOne: "Your car.",
      lineTwo: "Your way.",
      action: "Back to top",
    },
  },
} as const;

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}
