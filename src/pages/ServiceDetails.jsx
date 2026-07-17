import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Info, Building2, CreditCard, TrendingUp, Shield, BookOpen, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function ServiceDetails() {
const { t, isRTL, getTextAlign } = useLanguage();
// NEW: helpers to title-case and provide clean fallbacks when a translation is missing
const camelToTitle = (str) => {
if (!str) return "";
// Check if the string already contains spaces, if so, assume it's already in a sentence-like format
// and just capitalize the first letter of each word.
if (/\s/.test(str)) return str.replace(/\b\w/g, (m) => m.toUpperCase());
// If it's a slug or camelCase, convert to space-separated words, then title case.
const spaced = str.replace(/[-_]/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
return spaced.replace(/\b\w/g, (m) => m.toUpperCase());
};
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || camelToTitle(key)) : v;
};
const params = new URLSearchParams(window.location.search);
const serviceId = params.get("service") || "low-cost-accounts";
const countries = ["india","pakistan","bangladesh","oman","uae","kuwait","qatar","bahrain","saudi-arabia"];
const southAsia = new Set(["india","pakistan","bangladesh"]);
const gcc = new Set(["oman","uae","kuwait","qatar","bahrain","saudi-arabia"]);
const [country, setCountry] = useState("india");
const formatCountry = (slug) => (slug || "").replace(/-/g, " ").toUpperCase();
const iconByService = {
"low-cost-accounts": Landmark,
"mobile-banking": CreditCard,
"remittance": TrendingUp,
"microloans": CreditCard,
"islamic-finance": Shield,
"savings-groups": UsersIconFallback,
"credit-building": TrendingUp,
"financial-education": BookOpen,
"financial-coaching": BookOpen,
"diaspora-investment": TrendingUp,
"micro-insurance": Shield,
"legal-help": Shield,
"digital-identity": Shield,
"cross-border-banking": Building2,
"community-banks": Building2,
"gold-loans": CreditCard



};
function UsersIconFallback(props){ return <Building2 {...props} />; }
// Build catalog (texts, providers, notes)
const catalog = useMemo(() => {
const providers = {
southAsia: {
"low-cost-accounts": ["SBI/Jan Dhan (IN)", "HBL Asaan (PK)", "BRAC Bank (BD)"],
"mobile-banking": ["Paytm/PhonePe (IN)", "Easypaisa/JazzCash (PK)", "bKash/Nagad (BD)"],
"microloans": ["Bandhan (IN)", "Kashf/Akhuwat (PK)", "BRAC MF (BD)"],
"islamic-finance": ["Meezan (PK)", "Al Baraka (BD)", "Islamic windows (IN)"],
"savings-groups": ["SHG/SHG-Bank Linkage (IN)", "ROSCA/Committee (PK)", "Samity/ROSCA (BD)"],
"credit-building": ["Secured cards (IN)", "Credit Builder (PK)", "MFI reporting (BD)"],
"financial-education": ["RBI SEBI portals (IN)", "SBP literacy (PK)", "Bangladesh Bank SME (BD)"],
"financial-coaching": ["MFIs/NGOs (IN)", "Karandaaz partners (PK)", "BRAC counselling (BD)"],
"diaspora-investment": ["NRE/NRO (IN)", "Roshan Digital (PK)", "NRB products (BD)"],
"micro-insurance": ["PMJJBY/PMSBY (IN)", "Takaful micro (PK)", "BRAC micro-insurance (BD)"],
"legal-help": ["Legal Services Authorities (IN)", "Free legal aid (PK)", "District legal aid (BD)"],
"digital-identity": ["Aadhaar (IN)", "NADRA CNIC (PK)", "NID (BD)"],
"cross-border-banking": ["SBI/ICICI (IN)", "HBL/UBL (PK)", "DBBL/BRAC (BD)"],
"community-banks": ["Regional Rural Banks (IN)", "Punjab/Sindh banks (PK)", "Govt banks (BD)"],
"gold-loans": ["Muthoot/Manappuram (IN)", "Bank/MFI pledge (PK)", "Jeweller-backed loans (BD)"]
},
gcc: {
"low-cost-accounts": ["Bank Muscat Basic (OM)", "Emirates NBD Liv. (UAE)", "NBK Basic (KW)", "QNB First (QA)", "BBK (BH)", "Al Rajhi (SA)"],
"mobile-banking": ["ONA (OM)", "Liv./Mashreq Neo (UAE)", "NBK Online (KW)", "QNB Mobile (QA)", "BenefitPay (BH)", "STC Pay (SA)"],
"microloans": ["Oman Dev. Bank (OM)", "ADCB SME (UAE)", "Kuwait SME (KW)", "QDB (QA)", "BDB (BH)", "SIDF/Monsha'at (SA)"],
"islamic-finance": ["Bank Nizwa (OM)", "Dubai Islamic (UAE)", "KFH (KW)", "QIB (QA)", "Ithmaar/Al Salam (BH)", "Al Rajhi (SA)"],
"savings-groups": ["Community ROSCA (all GCC)"],
"credit-building": ["Secured cards via banks", "Telco bill history"],
"financial-education": ["Central bank literacy", "Bank academies"],
"financial-coaching": ["SME hubs & incubators"],
"diaspora-investment": ["NRE remits, expat products"],
"micro-insurance": ["Takaful providers"],
"legal-help": ["Labour min. helpdesks", "Govt legal aid"],
"digital-identity": ["Resident ID systems"],
"cross-border-banking": ["Major banks with remittance corridors"],
"community-banks": ["Municipal/Dev. banks"],
"gold-loans": ["Bank Muscat (OM)", "Emirates NBD (UAE)", "NBK (KW)", "QNB (QA)", "BBK (BH)", "Al Rajhi (SA)"]
}
};
const identityNotes = {
"india": "Use Aadhaar + PAN for KYC; Jan Dhan/BSBDA available.",
"pakistan": "NADRA CNIC required; Roshan Digital for expats.",
"bangladesh": "NID + mobile verification; BRAC/bKash widely accepted.",
"uae": "Emirates ID required; many banks have app-onboarding.",
"oman": "Resident Card required; Sharia options available.",
"kuwait": "Civil ID required; KFH/NIbK offer Islamic products.",
"qatar": "Qatar ID mandatory; QNB/CBQ are common choices.",
"bahrain": "CPR required; BenefitPay widely used.",
"saudi-arabia": "Iqama and Absher verification are standard."
};
const serviceTexts = {
"low-cost-accounts": {
title: "No or Low-Cost Accounts",
desc: "Basic bank and digital accounts with minimal fees for everyday use.",
eligibility: ["Resident or valid ID", "Basic KYC", "Minimum opening balance often waived"],
docs: ["Government ID", "Address proof", "Mobile number"]
},
"mobile-banking": {
title: "Mobile Banking",
desc: "Open and manage accounts via secure mobile apps with instant transfers.",
eligibility: ["Valid ID", "Active mobile number"],
docs: ["ID + selfie (where applicable)", "Phone SIM registration"]
},
"remittance": {
title: "Remittance Services",
desc: "Send money across borders with transparent FX and fees.",
eligibility: ["Valid ID", "Recipient details"],
docs: ["Sender ID", "Recipient bank/wallet info"]
},
"microloans": {
title: "Microloans & Small Business Credit",
desc: "Small-ticket loans to grow micro and small businesses.",
eligibility: ["Business activity proof", "Ability to repay"],
docs: ["ID + address", "Bank statements", "Basic business proof"]
},
"islamic-finance": {
title: "Interest-Free Islamic Finance",
desc: "Sharia-compliant products like Murabaha, Ijara, and Musharaka.",
eligibility: ["Sharia-compliant use of funds"],
docs: ["ID/KYC", "Income or business proof"]
},
"savings-groups": {
title: "Savings Groups & Community Circles",
desc: "Peer-based savings and lending with rotating payouts.",
eligibility: ["Community membership"],
docs: ["ID (where formalized)", "Group rules/records"]
},


"credit-building": {
title: "Credit Building",
desc: "Build or repair credit using secured cards, microcredit, and timely bill payments.",
eligibility: ["Valid ID", "Income source"],
docs: ["ID/KYC", "Income or deposit for secured card"]
},
"financial-education": {
title: "Financial Education",
desc: "Practical programs to improve budgeting, debt management, and business skills.",
eligibility: ["Open to public"],
docs: []
},
"financial-coaching": {
title: "Financial Coaching",
desc: "One-on-one guidance to set goals and follow action plans.",
eligibility: ["Open to individuals and SMEs"],
docs: ["Basic income/expense info (optional)"]
},
"diaspora-investment": {
title: "Diaspora Investment",
desc: "Safe channels to invest back home via regulated bank products.",
eligibility: ["Non-resident status (where required)"],
docs: ["Passport/ID", "Non-resident proof (if applicable)"]
},
"micro-insurance": {
title: "Micro Insurance",
desc: "Low-premium protection for health, life, and assets.",
eligibility: ["Basic KYC"],
docs: ["ID/KYC", "Policy enrollment form"]
},
"legal-help": {
title: "Legal Help",
desc: "Assistance with documents, rights, contracts, and compliance.",
eligibility: ["Varies by jurisdiction"],
docs: ["Case documents (if any)"]
},
"digital-identity": {
title: "Digital Identity & KYC",
desc: "Verified identity to access financial services quickly and securely.",
eligibility: ["Resident/citizen status or visa"],
docs: ["Resident/citizen ID", "Biometrics (where applicable)"]
},
"cross-border-banking": {
title: "Cross-Border Banking",
desc: "Accounts and tools to manage income and payments across countries.",
eligibility: ["KYC & source of funds"],
docs: ["ID/KYC", "Employment or business proof"]
},
"community-banks": {
title: "Community & Regional Banks",
desc: "Local banks focused on community needs and access.",
eligibility: ["Local residency (often)"],
docs: ["Standard KYC"]
},
"gold-loans": {
title: "Gold Loans",
desc: "Borrow against your gold at transparent rates and flexible terms.",
eligibility: ["Ownership of pledged gold"],
docs: ["ID/KYC", "Gold valuation at branch"]
}
};
const perCountryNote = (c) => identityNotes[c] || "";
const getProviders = (s, c) =>
southAsia.has(c) ? (providers.southAsia[s] || []) : (providers.gcc[s] || []);
return { serviceTexts, getProviders, perCountryNote };
}, [southAsia]);
const svc = catalog.serviceTexts[serviceId] || catalog.serviceTexts["low-cost-accounts"];
const Icon = iconByService[serviceId] || Info;
const recommendedProviders = catalog.getProviders(serviceId, country);
const note = catalog.perCountryNote(country);
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
{/* Header */}
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("FinancialServices")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
<Icon className="w-6 h-6 text-white" />
</div>
<div>
<h1 className={`text-2xl font-bold text-gray-900 ${getTextAlign('left')}`}>{svc.title}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{svc.desc}</p>
</div>


</div>
</div>
{/* Selector */}
<Card className="shadow-xl mb-8">
<CardHeader>
<CardTitle className={`flex items-center gap-2 ${getTextAlign('left')}`}>
<Info className="w-5 h-5 text-teal-600" />
{safeT('selectCountry', 'Select Country')}
</CardTitle>
</CardHeader>
<CardContent>
<div className="grid md:grid-cols-3 gap-4">
<div className="space-y-2">
<Label className={getTextAlign('left')}>{safeT('country', 'Country')}</Label>
<Select value={country} onValueChange={setCountry}>
<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder={safeT('selectCountry', 'Select Country')} />
</SelectTrigger>
<SelectContent>
{countries.map((c) => (
<SelectItem key={c} value={c}>
{formatCountry(c)}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
{(serviceId === "remittance" || serviceId === "gold-loans") && (
<div className="md:col-span-2 flex items-end">
{serviceId === "remittance" ? (
<Link to={createPageUrl("RemittanceServices")}>
<Button className="bg-gradient-to-r from-teal-600 to-teal-700">
{safeT('openRemittanceCalculator', 'Open Remittance Calculator')}
</Button>
</Link>
) : (
<Link to={createPageUrl("GoldLoans")}>
<Button className="bg-gradient-to-r from-yellow-500 to-amber-600">
{safeT('openGoldLoanEstimator', 'Open Gold Loan Estimator')}
</Button>
</Link>
)}
</div>
)}
</div>
</CardContent>
</Card>
{/* Details */}
<div className="grid lg:grid-cols-3 gap-8">
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={`capitalize ${getTextAlign('left')}`}>{safeT('overview', 'Overview')}</CardTitle>
</CardHeader>
<CardContent>
<p className={`text-gray-700 leading-relaxed ${getTextAlign('left')}`}>
{svc.desc}
</p>
{svc.eligibility?.length > 0 && (
<div className="mt-6">
<h3 className={`font-semibold mb-2 capitalize ${getTextAlign('left')}`}>{safeT('eligibility', 'Eligibility')}</h3>
<ul className={`list-disc pl-5 space-y-1 ${getTextAlign('left')}`}>
{svc.eligibility.map((e, i) => <li key={i}>{e}</li>)}
</ul>
</div>
)}
{svc.docs?.length > 0 && (
<div className="mt-6">
<h3 className={`font-semibold mb-2 capitalize ${getTextAlign('left')}`}>{safeT('documentsRequired', 'Documents Required')}</h3>
<ul className={`list-disc pl-5 space-y-1 ${getTextAlign('left')}`}>
{svc.docs.map((d, i) => <li key={i}>{d}</li>)}
</ul>
</div>
)}
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>
{safeT('providersIn', 'Providers in')} {formatCountry(country)}
</CardTitle>
</CardHeader>
<CardContent>
{recommendedProviders?.length ? (
<div className="flex flex-wrap gap-2">
{recommendedProviders.map((p, i) => (
<Badge key={i} variant="secondary" className="text-sm">{p}</Badge>
))}
</div>


) : (
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('noProvidersFound', 'No providers listed yet')}</p>
)}
{note && (
<div className="mt-4 p-3 rounded-lg bg-teal-50 text-teal-800 text-sm">
{note}
</div>
)}
</CardContent>
</Card>
</div>
{/* CTA */}
<div className="mt-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white text-center">
<h2 className="text-2xl font-bold mb-3">{safeT('needHelpChoosing', 'Need help choosing?')}</h2>
<p className="text-teal-100 mb-6">{safeT('askAIToMatch', 'Ask our AI advisor to match you to the right provider.')}</p>
<Link to={createPageUrl("AIAgent")}>
<Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
{safeT('talkToAIAgent', 'Talk to AI Agent')}
</Button>
</Link>
</div>
</div>
</div>
);
}
