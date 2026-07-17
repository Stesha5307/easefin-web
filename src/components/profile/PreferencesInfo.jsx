import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageContext";
export default function PreferencesInfo({ data, onChange }) {
const { t } = useLanguage();
const handleCheckboxChange = (field, checked, value) => {
const currentValues = data[field] || [];
if (checked) {
onChange(field, [...currentValues, value]);
} else {
onChange(field, currentValues.filter(item => item !== value));
}
};
const financialGoalsOptions = [
{ id: "build-savings", label: t('buildSavings') },
{ id: "business-expansion", label: t('businessExpansion') },
{ id: "education", label: t('education') },
{ id: "property-purchase", label: t('propertyPurchase') },
];
const lenderTypesOptions = [
{ id: "banks", label: t('lenderBanks') },
{ id: "mfi", label: t('lenderMFI') },
{ id: "nbfc", label: t('lenderNBFC') },
{ id: "gov-schemes", label: t('lenderGov') },
{ id: "co-op", label: t('lenderCoop') },
{ id: "shg", label: t('lenderSHG') },
{ id: "online", label: t('lenderOnline') },
];
const languages = [
"English", "हि ंदी (Hindi)", "‫( اردو‬Urdu)", "‫( العربية‬Arabic)",
"தமிழ் (Tamil)", "తెలుగు (Telugu)", "ਪੰਜਾਬੀ (Punjabi)", "বাংলা (Bengali)"
];
return (
<div className="space-y-6">
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="preferredLanguage">{t('selectLanguage')}</Label>
<Select value={data.preferredLanguage} onValueChange={(value) => onChange('preferredLanguage', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectLanguage')} />
</SelectTrigger>
<SelectContent>
{languages.map(lang => (
<SelectItem key={lang} value={lang}>{lang}</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="communicationMethod">{t('communicationMethod')}</Label>
<Select value={data.communicationMethod} onValueChange={(value) => onChange('communicationMethod', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectMethod')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="email">{t('emailComm')}</SelectItem>
<SelectItem value="sms">{t('smsComm')}</SelectItem>
<SelectItem value="whatsapp">{t('whatsappComm')}</SelectItem>
<SelectItem value="phone">{t('phoneComm')}</SelectItem>
<SelectItem value="app">{t('appComm')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="riskTolerance">{t('riskTolerance')}</Label>
<Select value={data.riskTolerance} onValueChange={(value) => onChange('riskTolerance', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectRisk')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="low">{t('lowRisk')}</SelectItem>



<SelectItem value="medium">{t('mediumRisk')}</SelectItem>
<SelectItem value="high">{t('highRisk')}</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-4">
<Label>{t('financialGoals')}</Label>
<div className="grid grid-cols-2 gap-4">
{financialGoalsOptions.map((goal) => (
<div key={goal.id} className="flex items-center space-x-2">
<Checkbox
id={goal.id}
checked={data.financialGoals?.includes(goal.id)}
onCheckedChange={(checked) => handleCheckboxChange('financialGoals', checked, goal.id)}
/>
<Label htmlFor={goal.id} className="font-normal">{goal.label}</Label>
</div>
))}
</div>
</div>
<div className="space-y-4">
<Label>{t('preferredLenders')}</Label>
<div className="grid grid-cols-2 gap-4">
{lenderTypesOptions.map((lender) => (
<div key={lender.id} className="flex items-center space-x-2">
<Checkbox
id={lender.id}
checked={data.preferredLenders?.includes(lender.id)}
onCheckedChange={(checked) => handleCheckboxChange('preferredLenders', checked, lender.id)}
/>
<Label htmlFor={lender.id} className="font-normal">{lender.label}</Label>
</div>
))}
</div>
</div>
</div>
);
}
