import React from "react";
import { ArrowRight, Building2, Globe, Smartphone, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";

export default function Services() {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t("microfinanceTitle"),
      description: t("microfinanceDesc"),
      tone: "orange",
      link: "MicrofinanceInfo",
    },
    {
      icon: Users,
      title: t("governmentTitle"),
      description: t("governmentDesc"),
      tone: "gold",
      link: "GovernmentProgramsInfo",
    },
    {
      icon: Globe,
      title: t("multilingualTitle"),
      description: t("multilingualDesc"),
      tone: "olive",
      link: "MultilingualSupportInfo",
    },
    {
      icon: Smartphone,
      title: t("voiceAiTitle"),
      description: t("voiceAiDesc"),
      tone: "forest",
      link: "VoiceAIInfo",
    },
  ];

  return (
    <section className="easefin-section easefin-services" aria-labelledby="services-title">
      <div className="easefin-shell">
        <header className="easefin-section-heading">
          <h2 id="services-title">{t("servicesTitle")}</h2>
          <p>{t("servicesSubtitle")}</p>
        </header>

        <div className="easefin-services__grid">
          {services.map((service) => (
            <article
              key={service.link}
              className={`easefin-service-card easefin-service-card--${service.tone}`}
            >
              <div className="easefin-service-card__icon">
                <service.icon aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link
                to={createPageUrl(service.link)}
                className="easefin-text-link"
              >
                {t("learnMore")}
                <ArrowRight
                  aria-hidden="true"
                  className={isRTL ? "easefin-icon--rtl" : undefined}
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
