import React from "react";
import { ArrowRight, Mail, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";

export default function CallToAction() {
  const { t, isRTL } = useLanguage();

  const cards = [
    {
      icon: Mail,
      title: t("getInTouch"),
      description: t("getInTouchDesc"),
      link: "Contact",
      button: t("contactSupport"),
    },
    {
      icon: Phone,
      title: t("partnerWithUs"),
      description: t("partnerDesc"),
      link: "PartnerWithUs",
      button: t("becomePartner"),
    },
    {
      icon: Shield,
      title: t("verifyIdentityCTA"),
      description: t("verifyIdentityDesc"),
      link: "GovIdVerification",
      button: t("startVerification"),
    },
  ];

  return (
    <section className="easefin-section easefin-cta" aria-labelledby="cta-title">
      <div className="easefin-cta__leaf easefin-cta__leaf--one" aria-hidden="true" />
      <div className="easefin-cta__leaf easefin-cta__leaf--two" aria-hidden="true" />

      <div className="easefin-shell easefin-cta__content">
        <header className="easefin-section-heading">
          <h2 id="cta-title">{t("ctaTitle")}</h2>
          <p>{t("ctaSubtitle")}</p>
        </header>

        <div className="easefin-cta__actions">
          <Link
            to={createPageUrl("StartJourney")}
            className="easefin-button easefin-button--primary easefin-button--large"
          >
            {t("startJourney")}
            <ArrowRight
              aria-hidden="true"
              className={isRTL ? "easefin-icon--rtl" : undefined}
            />
          </Link>
          <Link
            to={createPageUrl("ScheduleDemo")}
            className="easefin-button easefin-button--outline easefin-button--large"
          >
            {t("scheduleDemo")}
          </Link>
        </div>

        <div className="easefin-cta__grid">
          {cards.map((card) => (
            <article key={card.link} className="easefin-contact-card">
              <div className="easefin-contact-card__icon">
                <card.icon aria-hidden="true" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link to={createPageUrl(card.link)} className="easefin-contact-card__link">
                {card.button}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
