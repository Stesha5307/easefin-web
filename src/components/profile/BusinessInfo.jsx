import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageContext";
export default function BusinessInfo({ data, onChange }) {
const { t } = useLanguage();
return (
<div className="space-y-6">
<div className="space-y-2">



<Label htmlFor="businessName">{t('businessName')}</Label>
<Input
id="businessName"
value={data.businessName}
onChange={(e) => onChange('businessName', e.target.value)}
placeholder={t('businessNamePlaceholder')}
/>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="businessType">{t('businessType')}</Label>
<Select value={data.businessType} onValueChange={(value) => onChange('businessType', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectBusinessType')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="sole-proprietorship">{t('soleProprietorship')}</SelectItem>
<SelectItem value="partnership">{t('partnership')}</SelectItem>
<SelectItem value="private-limited">{t('privateLimited')}</SelectItem>
<SelectItem value="llp">{t('llp')}</SelectItem>
<SelectItem value="cooperative">{t('cooperative')}</SelectItem>
<SelectItem value="other">{t('other')}</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="businessCategory">{t('businessCategory')}</Label>
<Select value={data.businessCategory} onValueChange={(value) => onChange('businessCategory', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectCategory')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="retail">{t('retail')}</SelectItem>
<SelectItem value="manufacturing">{t('manufacturing')}</SelectItem>
<SelectItem value="agriculture">{t('agriculture')}</SelectItem>
<SelectItem value="services">{t('servicesCategory')}</SelectItem>
<SelectItem value="technology">{t('technology')}</SelectItem>
<SelectItem value="food-beverage">{t('foodBeverage')}</SelectItem>
<SelectItem value="textiles">{t('textiles')}</SelectItem>
<SelectItem value="handicrafts">{t('handicrafts')}</SelectItem>
<SelectItem value="trading">{t('trading')}</SelectItem>
<SelectItem value="other">{t('other')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="yearsInBusiness">{t('yearsInBusiness')}</Label>
<Select value={data.yearsInBusiness} onValueChange={(value) => onChange('yearsInBusiness', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectYears')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="less-than-1">{t('lessThanOneYear')}</SelectItem>
<SelectItem value="1-2">{t('oneToTwoYears')}</SelectItem>
<SelectItem value="3-5">{t('threeToFiveYears')}</SelectItem>
<SelectItem value="6-10">{t('sixToTenYears')}</SelectItem>
<SelectItem value="more-than-10">{t('moreThanTenYears')}</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="numberOfEmployees">{t('numberOfEmployees')}</Label>
<Select value={data.numberOfEmployees} onValueChange={(value) => onChange('numberOfEmployees', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectRange')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="1">{t('justMe')}</SelectItem>
<SelectItem value="2-5">{t('twoToFive')}</SelectItem>
<SelectItem value="6-10">{t('sixToTen')}</SelectItem>
<SelectItem value="11-25">{t('elevenToTwentyFive')}</SelectItem>
<SelectItem value="26-50">{t('twentySixToFifty')}</SelectItem>
<SelectItem value="more-than-50">{t('moreThanFifty')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="monthlyRevenue">{t('averageMonthlyRevenue')}</Label>
<Select value={data.monthlyRevenue} onValueChange={(value) => onChange('monthlyRevenue', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectRevenueRange')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="less-than-10000">Less than 10,000</SelectItem>
<SelectItem value="10000-25000">10,000 - 25,000</SelectItem>
<SelectItem value="25000-50000">25,000 - 50,000</SelectItem>


<SelectItem value="50000-100000">50,000 - 1,00,000</SelectItem>
<SelectItem value="100000-250000">1,00,000 - 2,50,000</SelectItem>
<SelectItem value="250000-500000">2,50,000 - 5,00,000</SelectItem>
<SelectItem value="more-than-500000">More than 5,00,000</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="businessAddress">{t('businessAddress')}</Label>
<Input
id="businessAddress"
value={data.businessAddress}
onChange={(e) => onChange('businessAddress', e.target.value)}
placeholder={t('businessAddressPlaceholder')}
/>
</div>
<div className="space-y-2">
<Label htmlFor="businessDescription">{t('businessDescription')}</Label>
<Textarea
id="businessDescription"
value={data.businessDescription}
onChange={(e) => onChange('businessDescription', e.target.value)}
placeholder={t('businessDescPlaceholder')}
rows={4}
/>
</div>
</div>
);
}
