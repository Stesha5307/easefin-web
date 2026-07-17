import React from "react";
import { Bot, Languages, Menu, PlayCircle, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/LanguageContext";

const subscriptionLabelMap = {
  English: "Subscription",
  "हि ंदी (Hindi)": "सदस्यता",
  "தமிழ் (Tamil)": "சந்தா",
  "తెలుగు (Telugu)": "చందా",
  "ਪੰਜਾਬੀ (Punjabi)": "ਸਬਸਕ੍ਰਿਪਸ਼ਨ",
  "বাংলা (Bengali)": "সাবস্ক্রিপশন",
};

export default function Header() {
  const { currentLanguage, t } = useLanguage();
  const subscriptionLabel =
    subscriptionLabelMap[currentLanguage] || "Subscription";

  const primaryLinks = [
    {
      label: t("financialServicesNav"),
      page: "FinancialServices",
    },
    {
      label: t("partnersNav"),
      page: "PartnerWithUs",
    },
    {
      label: subscriptionLabel,
      page: "Subscription",
    },
  ];

  return (
    <header className="easefin-header">
      <div className="easefin-header__inner">
        <Link
          to={createPageUrl("Home")}
          className="easefin-brand"
          aria-label="EaseFin AI home"
        >
          <img
            src="/easefin-logo.png"
            alt=""
            aria-hidden="true"
            className="easefin-brand__mark"
          />
          <span className="easefin-brand__name">EaseFin AI</span>
        </Link>

        <nav className="easefin-header__nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link key={link.page} to={createPageUrl(link.page)}>
              {link.label}
            </Link>
          ))}
          <Link
            to={createPageUrl("StartJourney")}
            className="easefin-header__join"
          >
            Join Now
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="easefin-header__menu-button"
              aria-label="Open navigation menu"
            >
              <Menu aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="easefin-mobile-menu"
          >
            {primaryLinks.map((link) => (
              <DropdownMenuItem key={link.page} asChild>
                <Link to={createPageUrl(link.page)}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("AIAgent")}>
                <Bot aria-hidden="true" />
                {t("aiAgent")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("ProductVideo")}>
                <PlayCircle aria-hidden="true" />
                {t("watchDemo")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("StartJourney")}>
                <UserRound aria-hidden="true" />
                {t("createProfile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Languages aria-hidden="true" />
              {currentLanguage}
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="easefin-mobile-menu__join">
              <Link to={createPageUrl("StartJourney")}>Join Now</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
