import React from "react";
import { HeartHandshake } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Mission() {
  const { t } = useLanguage();

  const missionPoints = [
    {
      value: "1.4B",
      title: t("unbankedAdults"),
      description: t("unbankedDesc"),
    },
    {
      value: "∞",
      title: t("opportunities"),
      description: t("opportunitiesDesc"),
    },
    {
      value: null,
      title: t("empowerment"),
      description: t("empowermentDesc"),
    },
  ];

  return (
    <section className="easefin-section easefin-mission" aria-labelledby="mission-title">
      <div className="easefin-mission__orbit easefin-mission__orbit--one" aria-hidden="true" />
      <div className="easefin-mission__orbit easefin-mission__orbit--two" aria-hidden="true" />
      <div className="easefin-mission__orbit easefin-mission__orbit--three" aria-hidden="true" />

      <div className="easefin-shell easefin-mission__content">
        <header className="easefin-section-heading easefin-section-heading--light">
          <h2 id="mission-title">{t("ourMission")}</h2>
          <p>{t("missionText")}</p>
        </header>

        <div className="easefin-mission__grid">
          {missionPoints.map((point) => (
            <article key={point.title} className="easefin-mission-card">
              <div className="easefin-mission-card__mark">
                {point.value ? point.value : <HeartHandshake aria-hidden="true" />}
              </div>
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
