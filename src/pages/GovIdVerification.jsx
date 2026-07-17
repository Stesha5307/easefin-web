import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function GovIdVerification() {
const { t, isRTL } = useLanguage();
const [selectedIdType, setSelectedIdType] = useState("");
const [uploadedFiles, setUploadedFiles] = useState({ front: null, back: null });
const [isVerified, setIsVerified] = useState(false);
const handleFileUpload = (side, event) => {
const file = event.target.files[0];
if (file) {
setUploadedFiles(prev => ({ ...prev, [side]: file }));
}
};
const handleVerify = () => {
const selectedTypeInfo = idTypes.find(type => type.value === selectedIdType);
if (uploadedFiles.front && (!selectedTypeInfo?.needsBack || uploadedFiles.back)) {
setIsVerified(true);
}
};
const idTypes = [
{ value: "passport", label: t('passports'), needsBack: false },
{ value: "national-id", label: t('nationalIdCards'), needsBack: true },
{ value: "driving-license", label: t('drivingLicenses'), needsBack: true },
{ value: "voter-id", label: t('voterIdCards'), needsBack: true },
{ value: "aadhar", label: t('aadharCard'), needsBack: true },
{ value: "pakistan-id", label: t('pakistanIdCard'), needsBack: true },
{ value: "bangladesh-id", label: t('bangladeshIdCard'), needsBack: true },
{ value: "emirates-id", label: t('emiratesId'), needsBack: true },
{ value: "iqama", label: t('iqamaSaudi'), needsBack: true },
{ value: "omani-resident", label: t('omaniResidentCard'), needsBack: true },
{ value: "qatar-id", label: t('qatarId'), needsBack: true },
{ value: "kuwait-civil", label: t('kuwaitCivilId'), needsBack: true },
{ value: "bahrain-cpr", label: t('bahrainCpr'), needsBack: true }
];
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-4xl mx-auto">
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
<h1 className="text-2xl font-bold text-gray-900">{t('govIdVerification')}</h1>
<p className="text-gray-600">{t('verifyIdentitySubtitle')}</p>
</div>
</div>
</div>
{!isVerified ? (
<Card className="shadow-xl">
<CardHeader>
<CardTitle className="flex items-center gap-3">



<FileText className="w-6 h-6 text-teal-600" />
{t('uploadId')}
</CardTitle>
<p className="text-gray-600">{t('uploadIdDesc')}</p>
</CardHeader>
<CardContent className="space-y-6">
<div>
<Label>{t('selectIdType')}</Label>
<Select value={selectedIdType} onValueChange={setSelectedIdType}>
<SelectTrigger className="mt-2">
<SelectValue placeholder={t('chooseIdType')} />
</SelectTrigger>
<SelectContent>
{idTypes.map((type) => (
<SelectItem key={type.value} value={type.value}>
{type.label}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
{selectedIdType && (
<div className="grid md:grid-cols-2 gap-6">
<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
<input
type="file"
accept="image/*"
onChange={(e) => handleFileUpload('front', e)}
className="hidden"
id="front-upload"
/>
<label htmlFor="front-upload" className="cursor-pointer">
{uploadedFiles.front ? (
<div className="space-y-3">
<CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
<p className="text-green-600 font-medium">{t('frontUploadedSuccess')}</p>
<p className="text-sm text-gray-500">{uploadedFiles.front.name}</p>
</div>
) : (
<div className="space-y-3">
<Upload className="w-12 h-12 text-gray-400 mx-auto" />
<p className="text-gray-600 font-medium">{t('uploadFrontSide')}</p>
<p className="text-sm text-gray-400">{t('clickToSelectFile')}</p>
</div>
)}
</label>
</div>
{idTypes.find(type => type.value === selectedIdType)?.needsBack && (
<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
<input
type="file"
accept="image/*"
onChange={(e) => handleFileUpload('back', e)}
className="hidden"
id="back-upload"
/>
<label htmlFor="back-upload" className="cursor-pointer">
{uploadedFiles.back ? (
<div className="space-y-3">
<CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
<p className="text-green-600 font-medium">{t('backUploadedSuccess')}</p>
<p className="text-sm text-gray-500">{uploadedFiles.back.name}</p>
</div>
) : (
<div className="space-y-3">
<Upload className="w-12 h-12 text-gray-400 mx-auto" />
<p className="text-gray-600 font-medium">{t('uploadBackSide')}</p>
<p className="text-sm text-gray-400">{t('clickToSelectFile')}</p>
</div>
)}
</label>
</div>
)}
</div>
)}
{selectedIdType && uploadedFiles.front && (
<Button
onClick={handleVerify}
className="w-full bg-gradient-to-r from-teal-600 to-teal-700"
disabled={!!idTypes.find(type => type.value === selectedIdType)?.needsBack && !uploadedFiles.back}
>
{t('verifyIdentity')}
</Button>
)}
<div className="bg-amber-50 p-4 rounded-lg">
<h4 className="font-medium text-amber-900 mb-2">{t('compFinancialServices')}</h4>
<div className="grid md:grid-cols-2 gap-2 text-sm text-amber-800">
<div>


<h5 className="font-semibold">{t('financialServices')}</h5>
<ul className="space-y-1">
<li>• {t('microfinance')}</li>
<li>• {t('remittanceServices')}</li>
<li>• {t('currencyExchange')}</li>
<li>• {t('mobileBanking')}</li>
<li>• {t('creditUnionServices')}</li>
</ul>
</div>
<div>
<h5 className="font-semibold">{t('additionalServices')}</h5>
<ul className="space-y-1">
<li>• {t('savingsAccounts')}</li>
<li>• {t('paymentServices')}</li>
<li>• {t('insuranceServices')}</li>
<li>• {t('emergencyCredit')}</li>
<li>• {t('billPayments')}</li>
</ul>
</div>
</div>
</div>
</CardContent>
</Card>
) : (
<Card className="shadow-xl border-green-200">
<CardContent className="text-center p-12">
<CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
<h2 className="text-2xl font-bold text-green-600 mb-4">{t('idVerifiedSuccess')}</h2>
<p className="text-gray-600 mb-8">{t('idVerifiedSuccessDesc')}</p>
<div className="flex gap-4 justify-center">
<Link to={createPageUrl("FaceIdVerification")}>
<Button className="bg-gradient-to-r from-teal-600 to-teal-700">
{t('continueToFaceVerification')}
</Button>
</Link>
<Link to={createPageUrl("Home")}>
<Button variant="outline">
{t('backToHome')}
</Button>
</Link>
</div>
</CardContent>
</Card>
)}
</div>
</div>
);
}
