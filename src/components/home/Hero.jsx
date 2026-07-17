import React from "react";
import { Bot, Languages, PlayCircle, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/LanguageContext";

const languages = [
  "English",
  "हि ंदी (Hindi)",
  "‫( اردو‬Urdu)",
  "‫( العربية‬Arabic)",
  "தமிழ் (Tamil)",
  "తెలుగు (Telugu)",
  "ਪੰਜਾਬੀ (Punjabi)",
  "বাংলা (Bengali)",
];

export default function Hero() {
  const { currentLanguage, setCurrentLanguage, t } = useLanguage();
  const isEnglish = currentLanguage === "English";

  return (
    <section className="easefin-hero" aria-labelledby="easefin-hero-title">
      <div className="easefin-cloud easefin-cloud--one" aria-hidden="true" />
      <div className="easefin-cloud easefin-cloud--two" aria-hidden="true" />

      <div className="easefin-hero__hill easefin-hero__hill--back" aria-hidden="true" />
      <div className="easefin-hero__hill easefin-hero__hill--middle" aria-hidden="true" />
      <div className="easefin-hero__hill easefin-hero__hill--front" aria-hidden="true" />

      <div className="easefin-hero__copy">
        <h1 id="easefin-hero-title">
          {isEnglish ? (
            <>
              <span>Simplifying finance</span>
              <span>Amplifying opportunities</span>
            </>
          ) : (
            <span>{t("heroTitle")}</span>
          )}
        </h1>

        <span className="easefin-hero__rule" aria-hidden="true" />

        {isEnglish ? (
          <p>
            Making financial services accessible to <strong>1.4 billion adults</strong>{" "}
            worldwide. Connect with microfinance institutions, small banks, and
            government programs through our multilingual AI assistant.
          </p>
        ) : (
          <p>{t("heroSubtitle")}</p>
        )}

        <Link
          to={createPageUrl("StartJourney")}
          className="easefin-hero__join"
        >
          {isEnglish ? "Join Now" : t("getStarted")}
        </Link>
      </div>

      <div className="easefin-hero__visual">
        <img
          src="/easefin-hero-illustration.png"
          alt="Hands holding a globe surrounded by people and leaves"
          width="815"
          height="572"
          draggable="false"
        />
      </div>

      <nav className="easefin-quick-actions" aria-label="Quick actions">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="easefin-quick-action"
              aria-label={`${t("selectLanguage")}: ${currentLanguage}`}
              title={t("selectLanguage")}
            >
              <Languages aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="left"
            sideOffset={12}
            className="easefin-language-menu"
          >
            {languages.map((language) => (
              <DropdownMenuItem
                key={language}
                onSelect={() => setCurrentLanguage(language)}
                className={
                  language === currentLanguage
                    ? "easefin-language-menu__active"
                    : undefined
                }
              >
                {language}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          to={createPageUrl("AIAgent")}
          className="easefin-quick-action"
          aria-label={t("aiAgent")}
          title={t("aiAgent")}
        >
          <Bot aria-hidden="true" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="easefin-quick-action"
              aria-label="Profile and demo options"
              title="Profile and demo options"
            >
              <Settings aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="left"
            sideOffset={12}
            className="easefin-utility-menu"
          >
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("StartJourney")}>
                <UserRound aria-hidden="true" />
                {t("createProfile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("ProductVideo")}>
                <PlayCircle aria-hidden="true" />
                {t("watchDemo")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="sr-only">
        {t("aiPowered")}. {t("voiceEnabled")}. 50+ {t("languages")}. 24/7 {t("available")}.
      </div>
    </section>
  );
}
