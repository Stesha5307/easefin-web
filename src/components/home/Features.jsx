import React from "react";
import { Brain, Heart, Mic, Shield } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function Features() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t("smartMatching"),
      description: t("smartMatchingDesc"),
      tone: "orange",
    },
    {
      icon: Mic,
      title: t("voiceInteraction"),
      description: t("voiceInteractionDesc"),
      tone: "gold",
    },
    {
      icon: Shield,
      title: t("securePrivate"),
      description: t("securePrivateDesc"),
      tone: "olive",
    },
    {
      icon: Heart,
      title: t("communityFocus"),
      description: t("communityFocusDesc"),
      tone: "forest",
    },
  ];

  return (
    <section className="easefin-section easefin-features" aria-labelledby="features-title">
      <div className="easefin-shell easefin-features__layout">
        <div className="easefin-features__content">
          <header className="easefin-section-heading easefin-section-heading--left">
            <h2 id="features-title">{t("featuresTitle")}</h2>
            <p>{t("featuresSubtitle")}</p>
          </header>

          <div className="easefin-features__list">
            {features.map((feature) => (
              <article key={feature.title} className="easefin-feature-item">
                <div
                  className={`easefin-feature-item__icon easefin-feature-item__icon--${feature.tone}`}
                >
                  <feature.icon aria-hidden="true" />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="easefin-assistant-demo" aria-label={t("voiceAssistantActive")}> 
          <div className="easefin-assistant-demo__halo" aria-hidden="true" />
          <div className="easefin-assistant-demo__card">
            <div className="easefin-assistant-demo__header">
              <div className="easefin-assistant-demo__avatar">
                <Mic aria-hidden="true" />
              </div>
              <div>
                <h3>{t("voiceAssistantActive")}</h3>
                <p>{t("voiceAssistantActiveDesc")}</p>
              </div>
              <span className="easefin-assistant-demo__status" aria-hidden="true" />
            </div>

            <div className="easefin-assistant-demo__conversation">
              <p className={`easefin-chat easefin-chat--user ${isRTL ? "easefin-chat--rtl" : ""}`}>
                {t("chat1")}
              </p>
              <p className={`easefin-chat easefin-chat--assistant ${isRTL ? "easefin-chat--rtl" : ""}`}>
                {t("chat2")}
              </p>
              <p className={`easefin-chat easefin-chat--user ${isRTL ? "easefin-chat--rtl" : ""}`}>
                {t("chat3")}
              </p>
            </div>

            <div className="easefin-assistant-demo__wave" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
