import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Globe, Languages, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function MultilingualSupportInfo() {
const { t, isRTL, getTextAlign } = useLanguage();
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || key) : v;
};
return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div>
<h1 className={`text-3xl font-bold text-gray-900 ${getTextAlign('left')}`}>{safeT('multilingualTitle', 'Multilingual Support')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('multilingualDesc', 'Get assistance in your preferred language, ensuring services are truly accessible.')}</p>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>What you get</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<ul className={`list-disc pl-6 space-y-2 text-gray-700 ${getTextAlign('left')}`}>
<li>Guidance and support in 50+ languages</li>
<li>Localized documentation and checklists</li>
<li>Voice and text interfaces for convenience</li>



<li>Region-aware recommendations and examples</li>
</ul>
<div className="p-4 bg-white rounded-lg border">
<div className="font-semibold mb-2">Popular languages</div>
<div className="flex flex-wrap gap-2 text-sm">
{["English","हि ंदी","العربية","اردو","தமிழ்","తెలుగు","ਪੰਜਾਬੀ","বাংলা"].map((lang, i)=>(
<span key={i} className="px-2 py-1 bg-gray-100 rounded-full">{lang}</span>
))}
</div>
</div>
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Channels</CardTitle>
</CardHeader>
<CardContent className="space-y-3 text-gray-700">
<div className="flex items-start gap-2">
<Globe className="w-4 h-4 text-blue-600 mt-1" />
<span>In-app chat and knowledge base</span>
</div>
<div className="flex items-start gap-2">
<Languages className="w-4 h-4 text-blue-600 mt-1" />
<span>Translated forms and workflows</span>
</div>
<div className="flex items-start gap-2">
<Headphones className="w-4 h-4 text-blue-600 mt-1" />
<span>Voice prompts and call-back support</span>
</div>
</CardContent>
</Card>
</div>
<div className="mt-10 grid md:grid-cols-3 gap-4">
<Link to={createPageUrl("FinancialServices")} className="w-full">
<Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">Explore Services</Button>
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
