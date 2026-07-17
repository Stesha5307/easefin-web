import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Mail, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import api from "@/api/client";
export default function Contact() {
const { t, isRTL, getTextAlign } = useLanguage();
const [formData, setFormData] = useState({
fullName: "",
email: "",
subject: "",
message: ""
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
const handleInputChange = (e) => {
const { id, value } = e.target;
setFormData(prev => ({ ...prev, [id]: value }));
};
// TODO: depends on the easefin-ai backend /leads endpoint existing —
// until then this submit will reach the error path at runtime.
const handleSubmit = async (e) => {
e.preventDefault();
setIsSubmitting(true);
setSubmitStatus(null);
try {
await api.submitLead({ type: "contact", ...formData });
setSubmitStatus('success');
setFormData({ fullName: "", email: "", subject: "", message: "" });
} catch (error) {
console.error("Contact lead failed:", error);
setSubmitStatus('error');
} finally {
setIsSubmitting(false);
}
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
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
<h1 className="text-2xl font-bold text-gray-900">{t('getInTouch')}</h1>
<p className="text-gray-600">{t('getInTouchDesc')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<div className="lg:col-span-2">
<Card className="shadow-xl">
<CardHeader>
<CardTitle className="flex items-center gap-3">
<Send className="w-6 h-6 text-teal-600" />
{t('sendMessage')}
</CardTitle>
</CardHeader>
<CardContent>
<form onSubmit={handleSubmit} className="space-y-6">
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="fullName" className={getTextAlign()}>{t('fullName')}</Label>
<Input id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder={t('enterFullName')} required />
</div>
<div className="space-y-2">
<Label htmlFor="email" className={getTextAlign()}>{t('emailAddress')}</Label>
<Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
</div>
</div>
<div className="space-y-2">
<Label htmlFor="subject" className={getTextAlign()}>{t('subject')}</Label>
<Input id="subject" value={formData.subject} onChange={handleInputChange} placeholder={t('subject')} required />
</div>
<div className="space-y-2">
<Label htmlFor="message" className={getTextAlign()}>{t('message')}</Label>
<Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder={t('message')} required className="min-h-[150px]" />
</div>
{submitStatus === 'success' && (
<p className="text-sm font-medium text-green-700 bg-green-50 rounded-lg p-3">Your message has been sent. We'll get back to you soon.</p>
)}
{submitStatus === 'error' && (
<p className="text-sm font-medium text-red-700 bg-red-50 rounded-lg p-3">Something went wrong sending your message. Please try again.</p>
)}
<Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-teal-600 to-teal-700">
<Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
{isSubmitting ? 'Sending…' : t('sendMessage')}
</Button>
</form>
</CardContent>
</Card>
</div>
<div className="space-y-8">
<Card className="shadow-lg">
<CardHeader>
<CardTitle className="flex items-center gap-3">
<Mail className="w-6 h-6 text-orange-500" />
{t('emailUs')}
</CardTitle>
</CardHeader>
<CardContent>
<p className="text-gray-600">{t('emailDesc')}</p>
<a href="mailto:support@easefin.ai" className="text-teal-600 font-medium mt-2 inline-block">
support@easefin.ai
</a>
</CardContent>
</Card>
<Card className="shadow-lg">
<CardHeader>
<CardTitle className="flex items-center gap-3">
<Building className="w-6 h-6 text-purple-500" />
{t('partnerWithUs')}
</CardTitle>
</CardHeader>
<CardContent>
<p className="text-gray-600">{t('partnerDesc')}</p>
<Link to={createPageUrl("PartnerWithUs")}>
<Button variant="outline" className="w-full mt-4">
{t('becomePartner')}
</Button>
</Link>
</CardContent>
</Card>
</div>
</div>
</div>
</div>
);
}
