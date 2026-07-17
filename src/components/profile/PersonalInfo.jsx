import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageContext";
export default function PersonalInfo({ data, onChange }) {
const { t } = useLanguage();
const countryCodes = [
{ value: "+91", label: t('india') },
{ value: "+880", label: t('bangladesh') },
{ value: "+92", label: t('pakistan') },
{ value: "+94", label: t('sriLanka') },
{ value: "+968", label: t('oman') },
{ value: "+971", label: t('uae') },
{ value: "+974", label: t('qatar') },
{ value: "+966", label: t('saudiArabia') },
{ value: "+965", label: t('kuwait') },
{ value: "+973", label: t('bahrain') }
];
const countries = [
{ value: "india", label: t('indiaCountry') },
{ value: "bangladesh", label: t('bangladeshCountry') },
{ value: "pakistan", label: t('pakistanCountry') },
{ value: "sri-lanka", label: t('sriLankaCountry') },
{ value: "oman", label: t('omanCountry') },
{ value: "uae", label: t('uaeCountry') },
{ value: "qatar", label: t('qatarCountry') },
{ value: "saudi-arabia", label: t('saudiArabiaCountry') },
{ value: "kuwait", label: t('kuwaitCountry') },
{ value: "bahrain", label: t('bahrainCountry') }
];
return (
<div className="space-y-6">
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="fullName">{t('fullName')} *</Label>
<Input
id="fullName"
value={data.fullName}
onChange={(e) => onChange('fullName', e.target.value)}
placeholder={t('enterFullName')}
/>
</div>
<div className="space-y-2">
<Label htmlFor="email">{t('emailAddress')} *</Label>
<Input
id="email"
type="email"
value={data.email}
onChange={(e) => onChange('email', e.target.value)}
placeholder="your@email.com"
/>
</div>
</div>
<div className="space-y-2">
<Label>{t('phoneNumber')} *</Label>
<div className="grid grid-cols-3 gap-3">
<Select value={data.countryCode} onValueChange={(value) => onChange('countryCode', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectCountryCode')} />
</SelectTrigger>
<SelectContent>
{countryCodes.map((code) => (
<SelectItem key={code.value} value={code.value}>



{code.label}
</SelectItem>
))}
</SelectContent>
</Select>
<div className="col-span-2">
<Input
value={data.phone}
onChange={(e) => onChange('phone', e.target.value)}
placeholder="123-456-7890"
/>
</div>
</div>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="dateOfBirth">{t('dateOfBirth')}</Label>
<Input
id="dateOfBirth"
type="date"
value={data.dateOfBirth}
onChange={(e) => onChange('dateOfBirth', e.target.value)}
/>
</div>
<div className="space-y-2">
<Label htmlFor="gender">{t('gender')}</Label>
<Select value={data.gender} onValueChange={(value) => onChange('gender', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectGender')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="male">{t('male')}</SelectItem>
<SelectItem value="female">{t('female')}</SelectItem>
<SelectItem value="other">{t('other')}</SelectItem>
<SelectItem value="prefer-not-to-say">{t('preferNotToSay')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="address">{t('address')} *</Label>
<Input
id="address"
value={data.address}
onChange={(e) => onChange('address', e.target.value)}
placeholder={t('streetAddress')}
/>
</div>
<div className="grid md:grid-cols-3 gap-6">
<div className="space-y-2">
<Label htmlFor="city">{t('city')} *</Label>
<Input
id="city"
value={data.city}
onChange={(e) => onChange('city', e.target.value)}
placeholder={t('city')}
/>
</div>
<div className="space-y-2">
<Label htmlFor="state">{t('stateProvince')}</Label>
<Input
id="state"
value={data.state}
onChange={(e) => onChange('state', e.target.value)}
placeholder={t('stateProvince')}
/>
</div>
<div className="space-y-2">
<Label htmlFor="postalCode">{t('postalCode')}</Label>
<Input
id="postalCode"
value={data.postalCode}
onChange={(e) => onChange('postalCode', e.target.value)}
placeholder="12345"
/>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="country">{t('country')} *</Label>
<Select value={data.country} onValueChange={(value) => onChange('country', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectCountry')} />
</SelectTrigger>
<SelectContent>
{countries.map((country) => (
<SelectItem key={country.value} value={country.value}>
{country.label}


</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>
);
}
