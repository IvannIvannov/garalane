"use client";

import { useState } from "react";
import Brand from "@/components/Brand/Brand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./GarageShowcase.module.css";

type GarageTab = "expenses" | "history";
type ExpenseColor = "fuel" | "maintenance" | "other";

type GarageShowcaseProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const expenses: {
  color: ExpenseColor;
  amount: number;
  percent: number;
}[] = [
  { color: "fuel", amount: 185.4, percent: 48 },
  { color: "maintenance", amount: 124, percent: 32 },
  { color: "other", amount: 77.6, percent: 20 },
];

const serviceHistory = [
  { id: "oil", mileage: 123800, price: 124 },
  { id: "brakes", mileage: 119200, price: 165 },
  { id: "inspection", mileage: 115400, price: 45 },
] as const;

function VehicleIllustration() {
  return (
    <div className={styles.vehicleOutline} aria-hidden="true">
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

function ExpenseOverview({ locale, dictionary }: GarageShowcaseProps) {
  const t = dictionary.garage;

  const formatter = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    style: "currency",
    currency: "EUR",
  });

  const names = [t.fuel, t.service, t.other];

  return (
    <div
      id="garage-expenses-panel"
      role="tabpanel"
      tabIndex={0}
      aria-labelledby="garage-expenses-tab"
    >
      <div className={styles.expenseSummary}>
        <div>
          <span>{t.expensesMonth}</span>
          <strong>{formatter.format(387)}</strong>
        </div>

        <span>{t.exampleData}</span>
      </div>

      <div
        className={styles.expenseTrack}
        role="img"
        aria-label={expenses
          .map((expense, index) => `${names[index]} ${expense.percent}%`)
          .join(", ")}
      >
        {expenses.map((item) => (
          <span
            key={item.color}
            data-category={item.color}
            style={{ width: `${item.percent}%` }}
          />
        ))}
      </div>

      <div className={styles.expenseLegend}>
        {expenses.map((item, index) => (
          <div key={item.color}>
            <span className={styles.legendDot} data-category={item.color} />
            <span>{names[index]}</span>
            <strong>{formatter.format(item.amount)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceHistory({ locale, dictionary }: GarageShowcaseProps) {
  const t = dictionary.garage;

  const currency = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    style: "currency",
    currency: "EUR",
  });

  const number = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB");

  const labels = {
    oil: { title: t.oil, date: t.sep },
    brakes: { title: t.brakes, date: t.jun },
    inspection: { title: t.inspection, date: t.mar },
  };

  return (
    <div
      id="garage-history-panel"
      role="tabpanel"
      tabIndex={0}
      aria-labelledby="garage-history-tab"
      className={styles.historyContent}
    >
      {serviceHistory.map((record) => (
        <div className={styles.historyRow} key={record.id}>
          <div>
            <strong>{labels[record.id].title}</strong>
            <span>
              {labels[record.id].date} · {number.format(record.mileage)}{" "}
              {t.kilometers}
            </span>
          </div>

          <strong>{currency.format(record.price)}</strong>
        </div>
      ))}

      <p>{t.historyNote}</p>
    </div>
  );
}

export default function GarageShowcase({
  locale,
  dictionary,
}: GarageShowcaseProps) {
  const [activeTab, setActiveTab] = useState<GarageTab>("expenses");

  const t = dictionary.garage;
  const number = new Intl.NumberFormat(locale === "bg" ? "bg-BG" : "en-GB");

  function moveTab(target: GarageTab) {
    setActiveTab(target);

    const elementId =
      target === "expenses" ? "garage-expenses-tab" : "garage-history-tab";

    document.getElementById(elementId)?.focus();
  }

  return (
    <div className={styles.garageWindow}>
      <aside className={styles.windowSidebar} aria-label={t.personalSpace}>
        <Brand locale={locale} />

        <div className={styles.sidebarNav}>
          <span className={styles.sidebarActive}>{t.personalSpace}</span>
          <span>{t.vehicles}</span>
          <span>{t.maintenance}</span>
          <span>{t.documents}</span>
        </div>

        <span className={styles.sidebarBottom}>{t.example}</span>
      </aside>

      <div className={styles.windowMain}>
        <div className={styles.windowHead}>
          <span>{t.digitalGarage}</span>
        </div>

        <div className={styles.windowTitle}>
          <div>
            <span className={styles.windowLabel}>{t.myVehicle}</span>
            <h3>BMW 320d Touring</h3>
            <p>
              2018 · 2.0 {t.diesel} · {t.automatic}
            </p>
          </div>

          <span className={styles.vehicleStatus}>
            <span />
            {t.active}
          </span>
        </div>

        <div className={styles.vehicleVisual}>
          <div className={styles.vehicleVisualInfo}>
            <span>{t.mileage}</span>
            <strong>
              {number.format(125400)} <small>{t.kilometers}</small>
            </strong>
          </div>


          <VehicleIllustration />
        </div>

        <div className={styles.garageTabs} role="tablist" aria-label={t.openTab}>
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
                moveTab("history");
              }
            }}
          >
            {t.expenses}
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
                moveTab("expenses");
              }
            }}
          >
            {t.history}
          </button>
        </div>

        <div className={styles.garageTabContent}>
          {activeTab === "expenses" ? (
            <ExpenseOverview locale={locale} dictionary={dictionary} />
          ) : (
            <ServiceHistory locale={locale} dictionary={dictionary} />
          )}
        </div>
      </div>
    </div>
  );
}
