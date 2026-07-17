import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Building2, CreditCard, TrendingUp, Shield, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function FinancialServices() {
const { t, isRTL } = useLanguage();
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("all");
// NEW: helpers to prettify keys and provide fallbacks when a translation is missing
const camelToTitle = useCallback((str) => {
if (!str) return "";
// If the string already contains spaces, it's likely already in a readable format,
// so just capitalize each word.
if (/\s/.test(str)) {
return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
// Convert camelCase or snake_case/kebab-case to spaced words, then title case
const spaced = str.replace(/[-_]/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2");
return spaced.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}, []);
const safeT = useCallback((key, fallback) => {
const translatedValue = t(key);
// If the translation returns the key itself, it means the key was not found.
// In that case, use the provided fallback or generate one from the key.
if (!translatedValue || translatedValue === key) {



return fallback || camelToTitle(key);
}
return translatedValue;
}, [t, camelToTitle]);
const serviceCategories = [
{ id: "all", label: safeT('allServices', 'All Services'), icon: Building2 },
{ id: "banking", label: safeT('bankingAccounts', 'Banking & Accounts'), icon: Building2 },
{ id: "credit", label: safeT('creditLoans', 'Credit & Loans'), icon: CreditCard },
{ id: "investment", label: safeT('investmentSavings', 'Investment & Savings'), icon: TrendingUp },
{ id: "insurance", label: safeT('insurance', 'Insurance'), icon: Shield },
{ id: "support", label: safeT('supportServices', 'Support Services'), icon: BookOpen }
];
const financialServices = [
{
id: "low-cost-accounts",
category: "banking",
title: safeT('lowCostAccounts', 'Low-Cost Accounts'),
description: safeT('lowCostAccountsDesc', 'Affordable, accessible accounts designed for everyday needs.'),
features: [t('lowFees'), t('multilingual'), t('noCredit')]
},
{
id: "mobile-banking",
category: "banking",
title: safeT('mobileBanking', 'Mobile Banking'),
description: safeT('mobileBankingDesc', 'Bank on the go with secure, convenient mobile features.'),
features: [t('crossBorder'), t('instant'), t('secure')]
},
{
id: "remittance",
category: "banking",
title: safeT('remittanceServices', 'Remittance Services'),
description: safeT('remittanceServicesDesc', 'Send money and compare rates and fees by country.'),
features: [t('lowFees'), t('crossBorder'), t('instant')]
},
{
id: "microloans",
category: "credit",
title: safeT('microloans', 'Microloans'),
description: safeT('microloansDesc', 'Small loans tailored to help your business grow.'),
features: [t('noCredit'), t('communityBased'), t('lowFees')]
},
{
id: "islamic-finance",
category: "credit",
title: safeT('islamicFinance', 'Islamic Finance'),
description: safeT('islamicFinanceDesc', 'Ethical, Sharia-compliant financing options.'),
features: [t('shariaCompliant'), t('communityBased'), t('multilingual')]
},
{
id: "savings-groups",
category: "investment",
title: safeT('savingsGroups', 'Savings Groups'),
description: safeT('savingsGroupsDesc', 'Community-driven savings and lending circles.'),
features: [t('communityBased'), t('noCredit'), t('lowFees')]
},
{
id: "credit-building",
category: "credit",
title: safeT('creditBuilding', 'Credit Building'),
description: safeT('creditBuildingDesc', 'Build or repair your credit with guided steps.'),
features: [t('noCredit'), t('instant'), t('secure')]
},
{
id: "financial-education",
category: "support",
title: safeT('financialEducation', 'Financial Education'),
description: safeT('financialEducationDesc', 'Learn money skills in your preferred language.'),
features: [t('multilingual'), t('communityBased'), t('lowFees')]
},
{
id: "financial-coaching",
category: "support",
title: safeT('financialCoaching', 'Financial Coaching'),
description: safeT('financialCoachingDesc', 'Personalized coaching to reach your goals.'),
features: [t('multilingual'), t('communityBased'), t('instant')]
},
{
id: "diaspora-investment",
category: "investment",
title: safeT('diasporaInvestment', 'Diaspora Investment'),
description: safeT('diasporaInvestmentDesc', 'Invest back home with trusted partners.'),
features: [t('crossBorder'), t('secure'), t('communityBased')]
},
{
id: "micro-insurance",
category: "insurance",
title: safeT('microInsurance', 'Micro Insurance'),
description: safeT('microInsuranceDesc', 'Protect your family and business affordably.'),
features: [t('lowFees'), t('multilingual'), t('instant')]
},
{
id: "legal-help",


category: "support",
title: safeT('legalHelp', 'Legal Help'),
description: safeT('legalHelpDesc', 'Guidance on documents, rights, and compliance.'),
features: [t('multilingual'), t('communityBased'), t('secure')]
},
{
id: "digital-identity",
category: "banking",
title: safeT('digitalIdentity', 'Digital Identity'),
description: safeT('digitalIdentityDesc', 'Verify your identity securely to access services.'),
features: [t('noCredit'), t('instant'), t('secure')]
},
{
id: "cross-border-banking",
category: "banking",
title: safeT('crossBorderBanking', 'Cross-Border Banking'),
description: safeT('crossBorderBankingDesc', 'Manage funds across borders easily.'),
features: [t('crossBorder'), t('multilingual'), t('secure')]
},
{
id: "community-banks",
category: "banking",
title: safeT('communityBanks', 'Community Banks'),
description: safeT('communityBanksDesc', 'Local banks serving local needs.'),
features: [t('communityBased'), t('multilingual'), t('lowFees')]
},
// Gold Loans card with safe fallbacks (fixes raw key rendering)
{
id: "gold-loans",
category: "credit",
title: safeT('goldLoansTitle', 'Gold Loans'),
description: safeT('goldLoansDesc', 'Borrow against your gold at transparent rates with quick approval and flexible repayment.'),
features: [t('secure'), t('instant'), t('lowFees')]
}
];
const filteredServices = financialServices.filter(service => {
const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
service.description.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
return matchesSearch && matchesCategory;
});
const getFeatureBadgeColor = (feature) => {
const colorMap = {
[t('lowFees')]: "bg-green-100 text-green-800",
[t('crossBorder')]: "bg-blue-100 text-blue-800",
[t('shariaCompliant')]: "bg-purple-100 text-purple-800",
[t('communityBased')]: "bg-orange-100 text-orange-800",
[t('multilingual')]: "bg-pink-100 text-pink-800",
[t('noCredit')]: "bg-emerald-100 text-emerald-800",
[t('instant')]: "bg-yellow-100 text-yellow-800",
[t('secure')]: "bg-gray-100 text-gray-800"
};
return colorMap[feature] || "bg-gray-100 text-gray-800";
};
return (
<div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 p-4 md:p-8">
<div className="max-w-7xl mx-auto">
{/* Header */}
<div className="flex items-center gap-4 mb-8">
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className="flex items-center gap-3">
{/* TODO: replace with real EaseFin logo asset (public/easefin-logo.png is a placeholder) */}
<img
src="/easefin-logo.png"
alt="EaseFin AI Logo"
className="w-10 h-10"
/>
<div>
<h1 className="text-2xl font-bold text-gray-900">{safeT('financialServicesTitle', 'Financial Services')}</h1>
<p className="text-gray-600 mt-0.5">{safeT('financialServicesSubtitle', 'Comprehensive solutions tailored for underserved communities')}</p>
</div>
</div>
</div>
{/* Search and Filter */}
<div className="flex flex-col md:flex-row gap-4 mb-8">
<div className="relative flex-1">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
<Input
placeholder={safeT('searchFinancialServicesPlaceholder', 'Search services...')}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="pl-10"
/>
</div>
<div className="flex gap-2 overflow-x-auto pb-2">
{serviceCategories.map((category) => (


<Button
key={category.id}
variant={selectedCategory === category.id ? "default" : "outline"}
onClick={() => setSelectedCategory(category.id)}
className={`flex items-center gap-2 whitespace-nowrap ${
selectedCategory === category.id
? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white"
: ""
}`}
>
<category.icon className="w-4 h-4" />
{category.label}
</Button>
))}
</div>
</div>
{/* Services Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{filteredServices.map((service) => (
<Card key={service.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
<CardHeader>
<CardTitle className="text-lg font-semibold text-gray-900">
{service.title}
</CardTitle>
</CardHeader>
<CardContent>
<p className="text-gray-600 mb-4 leading-relaxed">
{service.description}
</p>
<div className="flex flex-wrap gap-2 mb-4">
{service.features.map((feature, index) => (
<Badge
key={index}
className={`${getFeatureBadgeColor(feature)} text-xs`}
>
{feature}
</Badge>
))}
</div>
<div className="flex gap-2">
{service.id === "remittance" ? (
<Link to={createPageUrl("RemittanceServices")} className="flex-1">
<Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
{safeT('learnMore', 'Learn More')}
</Button>
</Link>
) : service.id === "gold-loans" ? (
<Link to={createPageUrl("GoldLoans")} className="flex-1">
<Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
{safeT('learnMore', 'Learn More')}
</Button>
</Link>
) : (
<Link to={createPageUrl(`ServiceDetails?service=${service.id}`)} className="flex-1">
<Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
{safeT('learnMore', 'Learn More')}
</Button>
</Link>
)}
<Link to={createPageUrl("AIAgent")} className="flex-1">
<Button size="sm" variant="outline" className="w-full">
{safeT('askAI', 'Ask AI')}
</Button>
</Link>
</div>
</CardContent>
</Card>
))}
</div>
{filteredServices.length === 0 && (
<div className="text-center py-12">
<p className="text-gray-500 text-lg">{safeT('noServicesFound', 'No services found')}</p>
<Button
onClick={() => {
setSearchTerm("");
setSelectedCategory("all");
}}
className="mt-4"
>
{safeT('clearFilters', 'Clear Filters')}
</Button>
</div>
)}
{/* CTA Section */}
<div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
<h2 className="text-2xl font-bold mb-4">{safeT('personalizedRecommendationsTitle', 'Personalized Recommendations')}</h2>


<p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
{safeT('personalizedRecommendationsDesc', 'Get tailored financial services based on your profile and goals.')}
</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link to={createPageUrl("AIAgent")}>
<Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
{safeT('talkToAIAgent', 'Talk to AI Agent')}
</Button>
</Link>
<Link to={createPageUrl("StartJourney")}>
<Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-700">
{safeT('createProfile', 'Create Profile')}
</Button>
</Link>
</div>
</div>
</div>
</div>
);
}
