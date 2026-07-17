import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mic, Shield, Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function VoiceAIInfo() {
const { t, isRTL, getTextAlign } = useLanguage();
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || key) : v;
};
return (
<div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div>
<h1 className={`text-3xl font-bold text-gray-900 ${getTextAlign('left')}`}>{safeT('voiceAiTitle', 'Voice-Enabled AI')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('voiceAiDesc', 'Interact naturally with our AI assistant through simple voice commands.')}</p>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>What you can do</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
<ul className={`list-disc pl-6 space-y-2 text-gray-700 ${getTextAlign('left')}`}>
<li>Ask about the best account or loan for your situation</li>
<li>Compare remittance fees and payout rates</li>
<li>Get step-by-step guidance for government programs</li>
<li>Collect required documents with AI checklists</li>
</ul>
<div className="grid md:grid-cols-3 gap-4">
<div className="p-4 bg-white rounded-lg border">
<Mic className="w-4 h-4 text-purple-600 mb-2" />
<div className="font-semibold">Natural dialog</div>
<div className="text-sm text-gray-600">Multi-turn conversations in your language</div>
</div>
<div className="p-4 bg-white rounded-lg border">
<Waves className="w-4 h-4 text-purple-600 mb-2" />
<div className="font-semibold">On low bandwidth</div>
<div className="text-sm text-gray-600">Optimized prompts even on basic smartphones</div>
</div>
<div className="p-4 bg-white rounded-lg border">
<Shield className="w-4 h-4 text-purple-600 mb-2" />
<div className="font-semibold">Privacy-first</div>
<div className="text-sm text-gray-600">Your data is protected and never sold</div>
</div>
</div>
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Get started</CardTitle>
</CardHeader>
<CardContent className="space-y-3 text-gray-700">
<div>1. Open the AI Agent</div>
<div>2. Choose your language</div>
<div>3. Say what you need (e.g., “Show me low-cost accounts in the UAE”)</div>
<div>4. Follow the steps to apply or compare options</div>
</CardContent>
</Card>
</div>
<div className="mt-10 grid md:grid-cols-3 gap-4">
<Link to={createPageUrl("AIAgent")} className="w-full">
<Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Open AI Agent</Button>
</Link>
<Link to={createPageUrl("FinancialServices")} className="w-full">
<Button className="w-full" variant="outline">Explore Services</Button>
</Link>
<Link to={createPageUrl("StartJourney")} className="w-full">
<Button className="w-full" variant="outline">Create Profile</Button>
</Link>
</div>



</div>
</div>
);
}
