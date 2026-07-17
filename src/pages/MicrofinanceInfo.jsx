import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function MicrofinanceInfo() {
const { t, isRTL, getTextAlign } = useLanguage();
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || key) : v;
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl flex items-center justify-center">
<Building2 className="w-6 h-6 text-white" />
</div>
<div>
<h1 className={`text-3xl font-bold text-gray-900 ${getTextAlign('left')}`}>{safeT('microfinanceTitle', 'Microfinance Connections')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('microfinanceDesc', 'Connect with trusted microfinance institutions tailored to your business needs.')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>How it helps</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<ul className={`list-disc pl-6 space-y-2 text-gray-700 ${getTextAlign('left')}`}>
<li>Small-ticket loans for working capital and inventory</li>
<li>Flexible repayment aligned to cash flows</li>
<li>Limited or no credit history required</li>
<li>Community-based support and financial coaching</li>
</ul>
<div className="p-4 bg-white rounded-lg border">
<div className="font-semibold mb-2">Examples by region</div>
<div className="grid md:grid-cols-2 gap-3 text-sm">
<div>
<div className="text-gray-500 mb-1">South Asia</div>
<div className="flex flex-wrap gap-2">
{["Bandhan (IN)", "Akhuwat/Kashf (PK)", "BRAC MF (BD)"].map((p,i)=>(
<span key={i} className="px-2 py-1 bg-gray-100 rounded-full">{p}</span>
))}
</div>
</div>
<div>
<div className="text-gray-500 mb-1">GCC</div>
<div className="flex flex-wrap gap-2">



{["SME dev. programs", "Bank micro-lending windows"].map((p,i)=>(
<span key={i} className="px-2 py-1 bg-gray-100 rounded-full">{p}</span>
))}
</div>
</div>
</div>
</div>
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Who is it for?</CardTitle>
</CardHeader>
<CardContent className="space-y-3 text-gray-700">
<div className="flex items-start gap-2">
<CheckCircle2 className="w-4 h-4 text-teal-600 mt-1" />
<span>Micro and small business owners</span>
</div>
<div className="flex items-start gap-2">
<CheckCircle2 className="w-4 h-4 text-teal-600 mt-1" />
<span>First-time borrowers with limited credit history</span>
</div>
<div className="flex items-start gap-2">
<CheckCircle2 className="w-4 h-4 text-teal-600 mt-1" />
<span>Community savings groups (ROSCA/SHG)</span>
</div>
</CardContent>
</Card>
</div>
<div className="mt-10 grid md:grid-cols-3 gap-4">
<Link to={createPageUrl("FinancialServices")} className="w-full">
<Button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600">Explore Services</Button>
</Link>
<Link to={createPageUrl("AIAgent")} className="w-full">
<Button className="w-full" variant="outline">Ask AI</Button>
</Link>
<Link to={createPageUrl("StartJourney")} className="w-full">
<Button className="w-full" variant="outline">
<Users className="w-4 h-4 mr-2" /> Create Profile
</Button>
</Link>
</div>
</div>
</div>
);
}
