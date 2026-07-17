import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageContext";
export default function FinancialInfo({ data, onChange }) {
const { t } = useLanguage();
const currencyOptions = [
{ value: 'INR', label: 'INR (Indian Rupee)' },
{ value: 'BDT', label: 'BDT (Bangladeshi Taka)' },
{ value: 'PKR', label: 'PKR (Pakistani Rupee)' },
{ value: 'LKR', label: 'LKR (Sri Lankan Rupee)' },
{ value: 'OMR', label: 'OMR (Omani Rial)' },
{ value: 'AED', label: 'AED (UAE Dirham)' },
{ value: 'QAR', label: 'QAR (Qatari Riyal)' },
{ value: 'SAR', label: 'SAR (Saudi Riyal)' },
{ value: 'KWD', label: 'KWD (Kuwaiti Dinar)' },
{ value: 'BHD', label: 'BHD (Bahraini Dinar)' }
];
return (
<div className="space-y-6">
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="currency">{t('preferredCurrency')}</Label>
<Select value={data.currency} onValueChange={(value) => onChange('currency', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectCurrency')} />
</SelectTrigger>
<SelectContent>
{currencyOptions.map(option => (
<SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="bankAccountType">{t('bankAccountType')}</Label>
<Select value={data.bankAccountType} onValueChange={(value) => onChange('bankAccountType', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectAccountType')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="savings">{t('savingsAccount')}</SelectItem>
<SelectItem value="current">{t('currentAccount')}</SelectItem>
<SelectItem value="both">{t('both')}</SelectItem>
<SelectItem value="none">{t('noBankAccount')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="monthlyIncome">{t('monthlyIncome')}</Label>
<Select value={data.monthlyIncome} onValueChange={(value) => onChange('monthlyIncome', value)}>



<SelectTrigger>
<SelectValue placeholder={t('selectIncomeRange')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="<10k">&lt; 10,000</SelectItem>
<SelectItem value="10k-25k">10,000 - 25,000</SelectItem>
<SelectItem value="25k-50k">25,000 - 50,000</SelectItem>
<SelectItem value="50k-100k">50,000 - 1,00,000</SelectItem>
<SelectItem value=">100k">&gt; 1,00,000</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="monthlyExpenses">{t('monthlyExpenses')}</Label>
<Select value={data.monthlyExpenses} onValueChange={(value) => onChange('monthlyExpenses', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectExpenseRange')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="<5k">&lt; 5,000</SelectItem>
<SelectItem value="5k-15k">5,000 - 15,000</SelectItem>
<SelectItem value="15k-30k">15,000 - 30,000</SelectItem>
<SelectItem value="30k-60k">30,000 - 60,000</SelectItem>
<SelectItem value=">60k">&gt; 60,000</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="existingLoans">{t('existingLoans')}</Label>
<Select value={data.existingLoans} onValueChange={(value) => onChange('existingLoans', value)}>
<SelectTrigger>
<SelectValue placeholder={t('existingLoansQuestion')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="none">{t('noExistingLoans')}</SelectItem>
<SelectItem value="personal">{t('personalLoan')}</SelectItem>
<SelectItem value="business">{t('businessLoan')}</SelectItem>
<SelectItem value="home">{t('homeLoan')}</SelectItem>
<SelectItem value="vehicle">{t('vehicleLoan')}</SelectItem>
<SelectItem value="multiple">{t('multipleLoans')}</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="creditScore">{t('creditScore')}</Label>
<Select value={data.creditScore} onValueChange={(value) => onChange('creditScore', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectCreditScore')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="unknown">{t('dontKnow')}</SelectItem>
<SelectItem value="poor">{t('poor')}</SelectItem>
<SelectItem value="fair">{t('fair')}</SelectItem>
<SelectItem value="good">{t('good')}</SelectItem>
<SelectItem value="excellent">{t('excellent')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="loanAmount">{t('loanAmountNeeded')}</Label>
<Select value={data.loanAmount} onValueChange={(value) => onChange('loanAmount', value)}>
<SelectTrigger>
<SelectValue placeholder={t('selectLoanAmount')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="<50k">&lt; 50,000</SelectItem>
<SelectItem value="50k-1L">50,000 - 1,00,000</SelectItem>
<SelectItem value="1L-5L">1,00,000 - 5,00,000</SelectItem>
<SelectItem value="5L-10L">5,00,000 - 10,00,000</SelectItem>
<SelectItem value=">10L">&gt; 10,00,000</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label htmlFor="loanPurpose">{t('loanPurpose')}</Label>
<Select value={data.loanPurpose} onValueChange={(value) => onChange('loanPurpose', value)}>
<SelectTrigger>
<SelectValue placeholder={t('loanPurposeQuestion')} />
</SelectTrigger>
<SelectContent>
<SelectItem value="expansion">{t('businessExpansion')}</SelectItem>
<SelectItem value="inventory">{t('inventoryPurchase')}</SelectItem>
<SelectItem value="equipment">{t('equipmentPurchase')}</SelectItem>
<SelectItem value="working-capital">{t('workingCapital')}</SelectItem>
<SelectItem value="property">{t('propertyPurchase')}</SelectItem>


<SelectItem value="education">{t('education')}</SelectItem>
<SelectItem value="medical">{t('medicalEmergency')}</SelectItem>
<SelectItem value="other">{t('other')}</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="collateral">{t('availableCollateral')}</Label>
<Textarea
id="collateral"
value={data.collateral}
onChange={(e) => onChange('collateral', e.target.value)}
placeholder={t('collateralPlaceholder')}
/>
</div>
</div>
);
}
