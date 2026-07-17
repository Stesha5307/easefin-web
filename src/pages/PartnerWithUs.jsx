import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Target, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import api from "@/api/client";
export default function PartnerWithUs() {
const { t, isRTL, getTextAlign } = useLanguage();
const [formData, setFormData] = useState({
institutionName: "",
contactPerson: "",
email: "",
phone: "",
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
await api.submitLead({ type: "partner", ...formData });
setSubmitStatus('success');
setFormData({ institutionName: "", contactPerson: "", email: "", phone: "", message: "" });
} catch (error) {
console.error("Partner lead failed:", error);
setSubmitStatus('error');
} finally {
setIsSubmitting(false);
}
};
const features = [
{ icon: Target, title: t('expandYourReach'), description: t('expandReachDesc') },
{ icon: Globe, title: t('overcomeBarriers'), description: t('overcomeBarriersDesc') },
{ icon: Shield, title: t('driveSocialImpact'), description: t('socialImpactDesc') }
];
return (
<div className="min-h-screen bg-white">



{/* Header section */}
<div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-8 md:p-12">
<div className="max-w-6xl mx-auto">
<div className="flex items-center gap-4 mb-4">
<Link to={createPageUrl("Home")}>
<Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
<ArrowLeft className={`w-5 h-5 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<h1 className="text-3xl md:text-4xl font-bold">{t('partnerWithUs')}</h1>
</div>
<p className="text-emerald-200 text-lg max-w-3xl">{t('partnerDesc')}</p>
</div>
</div>
{/* Features section */}
<div className="bg-emerald-50 py-16">
<div className="max-w-6xl mx-auto px-6">
<h2 className={`text-3xl font-bold text-gray-900 mb-12 ${getTextAlign('center')}`}>{t('whyPartnerWithUs')}</h2>
<div className="grid md:grid-cols-3 gap-8">
{features.map((feature, index) => (
<div key={index} className={`p-6 rounded-lg ${getTextAlign()}`}>
<feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
<h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
<p className="text-gray-600">{feature.description}</p>
</div>
))}
</div>
</div>
</div>
{/* Form section */}
<div className="py-16">
<div className="max-w-4xl mx-auto px-6">
<Card className="shadow-xl border-t-4 border-emerald-600">
<CardHeader>
<CardTitle className="text-2xl">{t('partnershipInquiry')}</CardTitle>
<p className="text-gray-600">{t('partnershipInquiryDesc')}</p>
</CardHeader>
<CardContent>
<form onSubmit={handleSubmit} className="space-y-6">
<div className="space-y-2">
<Label htmlFor="institutionName" className={getTextAlign()}>{t('institutionName')}</Label>
<Input id="institutionName" value={formData.institutionName} onChange={handleInputChange} required />
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="contactPerson" className={getTextAlign()}>{t('contactPerson')}</Label>
<Input id="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
</div>
<div className="space-y-2">
<Label htmlFor="email" className={getTextAlign()}>{t('emailAddress')}</Label>
<Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
</div>
</div>
<div className="space-y-2">
<Label htmlFor="phone" className={getTextAlign()}>{t('phoneNumber')}</Label>
<Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
</div>
<div className="space-y-2">
<Label htmlFor="message" className={getTextAlign()}>{t('messageOptional')}</Label>
<Textarea id="message" value={formData.message} onChange={handleInputChange} className="min-h-[120px]" />
</div>
{submitStatus === 'success' && (
<p className="text-sm font-medium text-green-700 bg-green-50 rounded-lg p-3">Your inquiry has been submitted. Our team will get in touch with you shortly.</p>
)}
{submitStatus === 'error' && (
<p className="text-sm font-medium text-red-700 bg-red-50 rounded-lg p-3">Something went wrong submitting your inquiry. Please try again.</p>
)}
<Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-lg py-6">
<Send className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
{isSubmitting ? 'Submitting…' : t('submitInquiry')}
</Button>
</form>
</CardContent>
</Card>
</div>
</div>
</div>
);
}
