"use client";

import { useState } from "react";
import Brand from "@/components/layout/Brand";

type GarageTab = "expenses" | "history";

type ExpenseColor = "fuel" | "maintenance" | "other";

type ExpenseSummary = {
  label: string;
  value: string;
  percent: number;
  color: ExpenseColor;
};

type ServiceRecord = {
  id: string;
  title: string;
  date: string;
  mileage: string;
  price: string;
};

const expenses: ExpenseSummary[] = [
  {
    label: "Гориво",
    value: "185,40 €",
    percent: 48,
    color: "fuel",
  },
  {
    label: "Обслужване",
    value: "124,00 €",
    percent: 32,
    color: "maintenance",
  },
  {
    label: "Други",
    value: "77,60 €",
    percent: 20,
    color: "other",
  },
];

const serviceHistory: ServiceRecord[] = [
  {
    id: "service-1",
    title: "Масло и филтри",
    date: "12 сеп 2026",
    mileage: "123 800 км",
    price: "124,00 €",
  },
  {
    id: "service-2",
    title: "Предни спирачни накладки",
    date: "04 юни 2026",
    mileage: "119 200 км",
    price: "165,00 €",
  },
  {
    id: "service-3",
    title: "Годишен технически преглед",
    date: "18 мар 2026",
    mileage: "115 400 км",
    price: "45,00 €",
  },
];

function VehicleIllustration() {
  return (
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
  );
}

function ExpenseOverview() {
  return (
    <div
      id="garage-expenses-panel"
      role="tabpanel"
      aria-labelledby="garage-expenses-tab"
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
  );
}

function ServiceHistory() {
  return (
    <div
      id="garage-history-panel"
      role="tabpanel"
      aria-labelledby="garage-history-tab"
      className="history-content"
    >
      {serviceHistory.map((record) => (
        <div className="history-row" key={record.id}>
          <div>
            <strong>{record.title}</strong>
            <span>
              {record.date} · {record.mileage}
            </span>
          </div>

          <strong>{record.price}</strong>
        </div>
      ))}

      <p>Примерни данни за представяне на функцията.</p>
    </div>
  );
}

export default function GarageShowcase() {
  const [activeTab, setActiveTab] = useState<GarageTab>("expenses");

  return (
    <div className="garage-window">
      <aside className="window-sidebar" aria-label="Демонстрационен гараж">
        <Brand />

        <div className="sidebar-nav">
          <span className="sidebar-active">Моят гараж</span>
          <span>Автомобили</span>
          <span>Обслужвания</span>
          <span>Документи</span>
        </div>

        <span className="sidebar-bottom">Примерен изглед</span>
      </aside>

      <div className="window-main">
        <div className="window-head">
          <span>Моят гараж</span>
          <span className="window-avatar" aria-label="Демонстрационен профил">
            IV
          </span>
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

          <VehicleIllustration />
        </div>

        <div
          className="garage-tabs"
          role="tablist"
          aria-label="Преглед на гаража"
        >
          <button
            type="button"
            role="tab"
            id="garage-expenses-tab"
            aria-controls="garage-expenses-panel"
            aria-selected={activeTab === "expenses"}
            tabIndex={activeTab === "expenses" ? 0 : -1}
            onClick={() => setActiveTab("expenses")}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                setActiveTab("history");
                document.getElementById("garage-history-tab")?.focus();
              }
            }}
            className={activeTab === "expenses" ? "active" : ""}
          >
            Разходи
          </button>

          <button
            type="button"
            role="tab"
            id="garage-history-tab"
            aria-controls="garage-history-panel"
            aria-selected={activeTab === "history"}
            tabIndex={activeTab === "history" ? 0 : -1}
            onClick={() => setActiveTab("history")}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                setActiveTab("expenses");
                document.getElementById("garage-expenses-tab")?.focus();
              }
            }}
            className={activeTab === "history" ? "active" : ""}
          >
            Сервизна история
          </button>
        </div>

        <div className="garage-tab-content">
          {activeTab === "expenses" ? <ExpenseOverview /> : <ServiceHistory />}
        </div>
      </div>
    </div>
  );
}
