import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import api from "@/api/client";
export default function ScheduleDemo() {
const { t, isRTL, getTextAlign } = useLanguage();
const [formData, setFormData] = useState({
name: "", email: "", phone: "", company: "", role: "",
preferredDate: "", preferredTime: "", message: ""
});
const [showVideo, setShowVideo] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState(false);
const handleInputChange = (field, value) => {
setFormData(prev => ({ ...prev, [field]: value }));
};
// TODO: depends on the easefin-ai backend /leads endpoint existing —
// until then this submit will reach the error path at runtime.
const handleSubmit = async (e) => {
e.preventDefault();
setIsSubmitting(true);
setSubmitError(false);
try {
await api.submitLead({ type: "demo", ...formData });
setIsSubmitted(true);
} catch (error) {
console.error("Demo lead failed:", error);
setSubmitError(true);
} finally {
setIsSubmitting(false);
}
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
{/* TODO: replace with real EaseFin logo asset (public/easefin-logo.png is a placeholder) */}
<img src="/easefin-logo.png" alt="EaseFin AI Logo" className="w-10 h-10" />
<div>
<h1 className={`text-2xl font-bold text-gray-900 ${getTextAlign('left')}`}>{t('scheduleADemo')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{t('scheduleDemoSubtitle')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-2 gap-8">
<div>
<Card className="shadow-xl mb-8">
<CardHeader>
<CardTitle className={`text-xl ${getTextAlign('left')}`}>{t('watchSampleDemo')}</CardTitle>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{t('demoPreview')}</p>
</CardHeader>
<CardContent>
{!showVideo ? (
<div className="relative bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl aspect-video flex items-center justify-center cursor-pointer group" onClick={() => setShowVideo(true)}>
<div className="absolute inset-0 bg-black/20 rounded-xl"></div>
<div className="relative z-10 text-center text-white">
<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">



<Play className="w-8 h-8 ms-1" />
</div>
<h3 className="text-xl font-bold mb-2">{t('demoVideoTitle')}</h3>
<p className="opacity-90">{t('demoVideoDesc')}</p>
</div>
</div>
) : (
<div className="rounded-xl overflow-hidden">
<iframe
className="w-full aspect-video"
src="https://www.youtube.com/embed/cyGDEB-kR8k"
title="Financial Inclusion AI"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
></iframe>
</div>
)}
</CardContent>
</Card>
<Card className="bg-gradient-to-br from-teal-900 to-emerald-900 text-white">
<CardContent className="p-8">
<h3 className={`text-2xl font-bold mb-4 ${getTextAlign('left')}`}>{t('whyScheduleDemo')}</h3>
<div className="space-y-4">
<div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
<div className="w-6 h-6 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
<span className="text-xs font-bold">1</span>
</div>
<div>
<h4 className={`font-semibold ${getTextAlign('left')}`}>{t('personalizedExperience')}</h4>
<p className={`text-teal-100 text-sm ${getTextAlign('left')}`}>{t('personalizedExpDesc')}</p>
</div>
</div>
<div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
<div className="w-6 h-6 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
<span className="text-xs font-bold">2</span>
</div>
<div>
<h4 className={`font-semibold ${getTextAlign('left')}`}>{t('askQuestions')}</h4>
<p className={`text-teal-100 text-sm ${getTextAlign('left')}`}>{t('askQuestionsDesc')}</p>
</div>
</div>
<div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
<div className="w-6 h-6 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
<span className="text-xs font-bold">3</span>
</div>
<div>
<h4 className={`font-semibold ${getTextAlign('left')}`}>{t('discoverFeatures')}</h4>
<p className={`text-teal-100 text-sm ${getTextAlign('left')}`}>{t('discoverFeaturesDesc')}</p>
</div>
</div>
</div>
</CardContent>
</Card>
</div>

<div>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>{t('bookYourDemo')}</CardTitle>
</CardHeader>
<CardContent>
{isSubmitted ? (
<div className={`text-center p-8 ${getTextAlign('center')}`}>
<h3 className="text-2xl font-bold text-teal-600 mb-4">{t('thankYou')}</h3>
<p className="text-gray-700">{t('demoSubmittedMsg')}</p>
</div>
) : (
<form onSubmit={handleSubmit} className="space-y-4">
<div className="grid md:grid-cols-2 gap-4">
<div>
<Label htmlFor="name" className={getTextAlign('left')}>{t('fullName')}</Label>
<Input id="name" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
<div>
<Label htmlFor="email" className={getTextAlign('left')}>{t('emailAddress')}</Label>
<Input id="email" type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
</div>
<div>
<Label htmlFor="phone" className={getTextAlign('left')}>{t('phoneNumber')}</Label>
<Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
<div>
<Label htmlFor="company" className={getTextAlign('left')}>{t('company')}</Label>
<Input id="company" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
<div>
<Label htmlFor="role" className={getTextAlign('left')}>{t('yourRole')}</Label>



<Input id="role" value={formData.role} onChange={(e) => handleInputChange('role', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
<div className="grid md:grid-cols-2 gap-4">
<div>
<Label htmlFor="preferredDate" className={getTextAlign('left')}>{t('preferredDate')}</Label>
<Input id="preferredDate" type="date" value={formData.preferredDate} onChange={(e) => handleInputChange('preferredDate', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
<div>
<Label htmlFor="preferredTime" className={getTextAlign('left')}>{t('preferredTime')}</Label>
<Input id="preferredTime" type="time" value={formData.preferredTime} onChange={(e) => handleInputChange('preferredTime', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
</div>
<div>
<Label htmlFor="message" className={getTextAlign('left')}>{t('messageOptional')}</Label>
<Textarea id="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} className={isRTL ? 'text-right' : ''} />
</div>
{submitError && (
<p className="text-sm font-medium text-red-700 bg-red-50 rounded-lg p-3">Something went wrong submitting your request. Please try again.</p>
)}
<Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-teal-600 to-teal-700">
<Send className="w-4 h-4 me-2" /> {isSubmitting ? 'Submitting…' : t('submitDemo')}
</Button>
</form>
)}
</CardContent>
</Card>
</div>
</div>
</div>
</div>
);
}
