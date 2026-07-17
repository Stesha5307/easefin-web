import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function GovernmentProgramsInfo() {
const { t, isRTL, getTextAlign } = useLanguage();
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || key) : v;
};
return (
<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div>
<h1 className={`text-3xl font-bold text-gray-900 ${getTextAlign('left')}`}>{safeT('governmentTitle', 'Government Programs')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('governmentDesc', 'Discover and access government subsidy programs and financial assistance.')}</p>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Common areas of support</CardTitle>
</CardHeader>
<CardContent>
<ul className={`list-disc pl-6 space-y-2 text-gray-700 ${getTextAlign('left')}`}>
<li>Cash transfers and basic income support</li>
<li>Interest subsidies for small-business loans</li>
<li>Insurance schemes for health, life, and crops</li>



<li>Skilling and entrepreneurship grants</li>
</ul>
<div className="mt-6 p-4 bg-white rounded-lg border">
<div className="font-semibold mb-2">Sample programs</div>
<div className="grid md:grid-cols-2 gap-3 text-sm">
<div>
<div className="text-gray-500 mb-1">South Asia</div>
<div className="space-y-1">
<div>India: PMMY, PMJJBY/PMSBY, Jan Dhan</div>
<div>Pakistan: Ehsaas, Kamyab Jawan</div>
<div>Bangladesh: SME Foundation grants</div>
</div>
</div>
<div>
<div className="text-gray-500 mb-1">GCC</div>
<div className="space-y-1">
<div>UAE: SME development funds, Khalifa Fund</div>
<div>Saudi Arabia: Monsha'at, SIDF programs</div>
<div>Qatar/Bahrain/Kuwait/Oman: National SME schemes</div>
</div>
</div>
</div>
</div>
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Eligibility & documents</CardTitle>
</CardHeader>
<CardContent className="space-y-3 text-gray-700">
<div className="flex items-start gap-2">
<ShieldCheck className="w-4 h-4 text-orange-600 mt-1" />
<span>Valid national ID and residency status</span>
</div>
<div className="flex items-start gap-2">
<FileText className="w-4 h-4 text-orange-600 mt-1" />
<span>Business or income proof (if applicable)</span>
</div>
<div className="flex items-start gap-2">
<FileText className="w-4 h-4 text-orange-600 mt-1" />
<span>Program-specific forms and declarations</span>
</div>
</CardContent>
</Card>
</div>
<div className="mt-10 grid md:grid-cols-3 gap-4">
<Link to={createPageUrl("FinancialServices")} className="w-full">
<Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">Explore Services</Button>
</Link>
<Link to={createPageUrl("AIAgent")} className="w-full">
<Button className="w-full" variant="outline">Ask AI</Button>
</Link>
<Link to={createPageUrl("StartJourney")} className="w-full">
<Button className="w-full" variant="outline">Create Profile</Button>
</Link>
</div>
</div>
</div>
);
}
