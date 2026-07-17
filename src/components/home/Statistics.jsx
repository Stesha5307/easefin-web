import React from "react";
import { Globe, TrendingUp, Users, Zap } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Statistics() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      number: "1.4B",
      label: t("unbankedAdults"),
      description: t("unbankedDesc"),
    },
    {
      icon: Globe,
      number: "50+",
      label: t("languagesSupported"),
      description: t("languagesSupportedDesc"),
    },
    {
      icon: TrendingUp,
      number: "75%",
      label: t("successRate"),
      description: t("successRateDesc"),
    },
    {
      icon: Zap,
      number: "24/7",
      label: t("aiAssistant"),
      description: t("aiAssistantDesc"),
    },
  ];

  return (
    <section className="easefin-section easefin-statistics" aria-labelledby="statistics-title">
      <div className="easefin-statistics__hill easefin-statistics__hill--one" aria-hidden="true" />
      <div className="easefin-statistics__hill easefin-statistics__hill--two" aria-hidden="true" />

      <div className="easefin-shell easefin-statistics__content">
        <header className="easefin-section-heading">
          <h2 id="statistics-title">{t("statsTitle")}</h2>
          <p>{t("statsSubtitle")}</p>
        </header>

        <div className="easefin-statistics__grid">
          {stats.map((stat) => (
            <article key={stat.number} className="easefin-stat-card">
              <div className="easefin-stat-card__icon">
                <stat.icon aria-hidden="true" />
              </div>
              <strong>{stat.number}</strong>
              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
