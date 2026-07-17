import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Building, CreditCard, MapPin, Save, Lock, Bot, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PersonalInfo from "@/components/profile/PersonalInfo";
import BusinessInfo from "@/components/profile/BusinessInfo";
import FinancialInfo from "@/components/profile/FinancialInfo";
import PreferencesInfo from "@/components/profile/PreferencesInfo";
import { useLanguage } from "@/components/LanguageContext";
import api from "@/api/client";
export default function StartJourney() {
const { t, isRTL } = useLanguage();
const [currentStep, setCurrentStep] = useState(1);
const [isSaving, setIsSaving] = useState(false);
const [saveStatus, setSaveStatus] = useState(null); // null | 'success' | 'error'
const [profileData, setProfileData] = useState({
// Personal Info
fullName: "",
email: "",
phone: "",
countryCode: "",
dateOfBirth: "",
gender: "",
address: "",
city: "",
state: "",
postalCode: "",
country: "",
// Business Info
businessName: "",
businessType: "",
businessCategory: "",
yearsInBusiness: "",
numberOfEmployees: "",
monthlyRevenue: "",
businessAddress: "",
businessDescription: "",
// Financial Info
currency: "INR", // Default currency
bankAccountType: "",
existingLoans: "",
creditScore: "",
monthlyIncome: "",
monthlyExpenses: "",
loanAmount: "",
loanPurpose: "",
collateral: "",
// Preferences
preferredLanguage: "English",
communicationMethod: "email",
financialGoals: [],
riskTolerance: "medium",
preferredLenders: []
});
// Prefill from URL params if coming from Subscription
useEffect(() => {
const urlParams = new URLSearchParams(window.location.search);
const from = urlParams.get('from');



const country = urlParams.get('country');
const currency = urlParams.get('currency');
if (from === 'subscription') {
setProfileData(prev => ({
...prev,
country: country || prev.country,
currency: currency || prev.currency
}));
}
}, []);
const steps = [
{ id: 1, title: t('personalInfo'), icon: User },
{ id: 2, title: t('businessInfo'), icon: Building },
{ id: 3, title: t('financialInfo'), icon: CreditCard },
{ id: 4, title: t('preferences'), icon: MapPin }
];
const handleInputChange = (field, value) => {
setProfileData(prev => ({
...prev,
[field]: value
}));
};
const handleNext = () => {
if (currentStep < 4) {
setCurrentStep(currentStep + 1);
}
};
const handlePrev = () => {
if (currentStep > 1) {
setCurrentStep(currentStep - 1);
}
};
// TODO: depends on the easefin-ai backend /profiles endpoint existing —
// until then this save will reach the error path at runtime. Once auth
// exists, the backend should associate the profile with the real user id.
const handleSubmit = async () => {
setIsSaving(true);
setSaveStatus(null);
try {
await api.saveProfile(profileData);
setSaveStatus('success');
} catch (error) {
console.error("Profile save failed:", error);
setSaveStatus('error');
} finally {
setIsSaving(false);
}
};
const renderStepContent = () => {
switch (currentStep) {
case 1:
return <PersonalInfo data={profileData} onChange={handleInputChange} />;
case 2:
return <BusinessInfo data={profileData} onChange={handleInputChange} />;
case 3:
return <FinancialInfo data={profileData} onChange={handleInputChange} />;
case 4:
return <PreferencesInfo data={profileData} onChange={handleInputChange} />;
default:
return null;
}
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-4xl mx-auto">
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
className="w-14 h-14 md:w-16 md:h-16"
/>
<div>
<h1 className="text-2xl font-bold text-gray-900">{t('createProfile')}</h1>
<p className="text-gray-600 mt-0.5">{t('heroSubtitle')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-4 gap-8">
{/* Steps Navigation */}
<div className="lg:col-span-1">
<Card className="sticky top-8">
<CardHeader>
<CardTitle className="text-lg">{t('profileSetup')}</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
{steps.map((step) => (
<div
key={step.id}
className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
currentStep === step.id


? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
: currentStep > step.id
? "bg-green-50 text-green-700"
: "bg-gray-50 text-gray-600 hover:bg-gray-100"
}`}
onClick={() => setCurrentStep(step.id)}
>
<div className={`w-8 h-8 rounded-full flex items-center justify-center ${
currentStep === step.id
? "bg-white/20"
: currentStep > step.id
? "bg-green-100"
: "bg-white"
}`}>
<step.icon className="w-4 h-4" />
</div>
<span className="font-medium text-sm">{step.title}</span>
</div>
))}
</CardContent>
</Card>
</div>
{/* Main Content */}
<div className="lg:col-span-3">
<Card className="shadow-xl">
<CardHeader className="border-b">
<div className="flex items-center justify-between">
<div>
<CardTitle className="text-xl">
{t('step')} {currentStep}: {steps.find(s => s.id === currentStep)?.title}
</CardTitle>
<p className="text-gray-600 mt-1">
{t('fillOutInfo')}
</p>
</div>
<div className="text-sm text-gray-500">
{currentStep} / {steps.length}
</div>
</div>
<div className="mt-4">
<div className="w-full bg-gray-200 rounded-full h-2">
<div
className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300"
style={{ width: `${(currentStep / steps.length) * 100}%` }}
></div>
</div>
</div>
</CardHeader>
<CardContent className="p-8">
{renderStepContent()}
<Separator className="my-8" />
{saveStatus === 'success' && (
<p className="text-sm font-medium text-green-700 bg-green-50 rounded-lg p-3 mb-4">Profile saved! We'll help you find the best financial solutions.</p>
)}
{saveStatus === 'error' && (
<p className="text-sm font-medium text-red-700 bg-red-50 rounded-lg p-3 mb-4">Something went wrong saving your profile. Please try again.</p>
)}
<div className="flex justify-between">
<Button
variant="outline"
onClick={handlePrev}
disabled={currentStep === 1}
>
{t('previous')}
</Button>
<div className="flex gap-3 flex-wrap justify-end">
{currentStep === steps.length ? (
<>
{/* NEW: Start Free Month (Subscription) */}
<Link to={createPageUrl(`Subscription?country=${encodeURIComponent(profileData.country || '')}`)}>
<Button
variant="outline"
className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
>
<DollarSign className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
Start Free Month
</Button>
</Link>
<Link to={createPageUrl("GovIdVerification")}>
<Button
variant="outline"
className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
>
<Lock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
{t('verifyIdentityFirst')}
</Button>
</Link>
<Link to={createPageUrl("AIAgent")}>
<Button
className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
>
<Bot className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
{t('consultAI')}
</Button>


</Link>
<Button
onClick={handleSubmit}
disabled={isSaving}
className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
>
<Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
{isSaving ? 'Saving…' : t('saveProfile')}
</Button>
</>
) : (
<Button
onClick={handleNext}
className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
>
{t('nextStep')}
</Button>
)}
</div>
</div>
</CardContent>
</Card>
</div>
</div>
</div>
</div>
);
}
