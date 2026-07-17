import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRightLeft, Calculator, Banknote } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// TODO-04/05 (see TODO.md): RemittanceCountry was a Base44 entity.
// Empty list until api.getRemittanceCountries() exists.
import { useLanguage } from "@/components/LanguageContext";
export default function RemittanceServices() {
const { t, isRTL, getTextAlign } = useLanguage();
const [countries, setCountries] = useState([]);
const [fromCode, setFromCode] = useState("");
const [toCode, setToCode] = useState("");
const [amount, setAmount] = useState("");
// Helper to uppercase country names and replace dashes with spaces
const formatCountry = useCallback((slug) => (slug || "").replace(/-/g, " ").toUpperCase(), []);
// NEW: prettify camelCase keys and safe translation fallback
const camelToTitle = useCallback((str) => {
if (!str) return "";
// if already has spaces, just capitalize first letter of each word
if (/\s/.test(str)) {
return str.replace(/\b\w/g, (m) => m.toUpperCase());
}
// handle kebab/snake/camel
const spaced = str
.replace(/[-_]/g, " ")
.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
return spaced.replace(/\b\w/g, (m) => m.toUpperCase());
}, []);
const safeT = useCallback(
(key, fallback) => {
const val = t(key);
if (!val || val === key) {
return fallback || camelToTitle(key);
}
return val;
},
[t, camelToTitle]
);
useEffect(() => {
const load = async () => {
const rows = []; // TODO-04/05: was RemittanceCountry.list()
setCountries(rows);
if (rows.length > 0) {
// Pre-select reasonable defaults if empty
setFromCode(rows.find(r => r.country === "uae") ? "uae" : rows[0].country);



setToCode(rows.find(r => r.country === "india") ? "india" : rows[1]?.country || rows[0].country);
}
};
load();
}, []);
const from = useMemo(() => countries.find(c => c.country === fromCode), [countries, fromCode]);
const to = useMemo(() => countries.find(c => c.country === toCode), [countries, toCode]);
const crossRate = useMemo(() => {
if (!from || !to) return null;
// 1 unit of FROM currency equals how many units of TO currency
return (to.usd_rate_local / from.usd_rate_local);
}, [from, to]);
const estFee = useMemo(() => {
if (!from || !amount) return 0;
return (parseFloat(amount || "0") * ((from.typical_bank_fee_percent_avg || 0) / 100));
}, [from, amount]);
const estPayout = useMemo(() => {
if (!from || !to || !amount || !crossRate) return 0;
const net = Math.max(parseFloat(amount || "0") - estFee, 0);
return net * crossRate;
}, [from, to, amount, crossRate, estFee]);
const formatNumber = (n, digits = 2) => {
const num = Number.isFinite(n) ? n : 0;
return num.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: 2 });
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
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
<ArrowRightLeft className="w-6 h-6 text-white" />
</div>
<div>
<h1 className={`text-2xl font-bold text-gray-900 ${getTextAlign('left')}`}>{safeT('remittanceServices', 'Remittance Services')}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('financialServicesSubtitle', 'Comprehensive financial solutions tailored for underserved communities')}</p>
</div>
</div>
</div>
<Card className="shadow-xl mb-8">
<CardHeader>
<CardTitle className={`flex items-center gap-2 ${getTextAlign('left')}`}>
<Calculator className="w-5 h-5 text-teal-600" />
{safeT('sendMoney', 'Send Money')}
</CardTitle>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{safeT('compareRatesAndFees', 'Compare rates and fees')}</p>
</CardHeader>
<CardContent className="space-y-4">
<div className="grid md:grid-cols-3 gap-4">
<div className="space-y-2">
<Label className={getTextAlign('left')}>{safeT('fromCountry', 'From Country')}</Label>
<Select value={fromCode} onValueChange={setFromCode}>
<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder={safeT('selectCountry', 'Select Country')} />
</SelectTrigger>
<SelectContent>
{countries.map(c => (
<SelectItem key={c.country} value={c.country}>
{c.currency_code} • {formatCountry(c.country)}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label className={getTextAlign('left')}>{safeT('toCountry', 'To Country')}</Label>
<Select value={toCode} onValueChange={setToCode}>
<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder={safeT('selectCountry', 'Select Country')} />
</SelectTrigger>
<SelectContent>
{countries.map(c => (
<SelectItem key={c.country} value={c.country}>
{c.currency_code} • {formatCountry(c.country)}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">


<Label className={getTextAlign('left')}>
{safeT('amount', 'Amount')} {from ? `(${from.currency_code})` : ''}
</Label>
<Input
type="number"
min="0"
value={amount}
onChange={(e) => setAmount(e.target.value)}
className={isRTL ? 'text-right' : ''}
placeholder="0.00"
/>
</div>
</div>
{from && to && crossRate && (
<div className="grid md:grid-cols-3 gap-4 pt-2">
<div className="p-4 bg-teal-50 rounded-lg">
<div className="text-sm font-medium text-teal-700">{safeT('exchangeRate', 'Exchange Rate')}</div>
<div className="text-lg font-semibold text-teal-900 mt-1">
1 {from.currency_code} ≈ {formatNumber(crossRate, 4)} {to.currency_code}
</div>
<div className="text-xs text-teal-700 mt-1">
1 USD = {formatNumber(from.usd_rate_local, 4)} {from.currency_code} • 1 USD = {formatNumber(to.usd_rate_local, 4)} {to.currency_code}
</div>
</div>
<div className="p-4 bg-amber-50 rounded-lg">
<div className="text-sm font-medium text-amber-700">{safeT('estimatedFees', 'Estimated Fees')}</div>
<div className="text-lg font-semibold text-amber-900 mt-1">
~ {formatNumber(estFee)} {from.currency_code}
</div>
<div className="text-xs text-amber-700 mt-1">
{safeT('typicalFee', 'Typical fee')}: {from.typical_bank_fee_percent_range} ({safeT('avg', 'avg')} {from.typical_bank_fee_percent_avg}%)
</div>
</div>
<div className="p-4 bg-emerald-50 rounded-lg">
<div className="text-sm font-medium text-emerald-700">{safeT('estimatedPayout', 'Estimated Payout')}</div>
<div className="text-lg font-semibold text-emerald-900 mt-1">
~ {formatNumber(estPayout)} {to.currency_code}
</div>
</div>
</div>
)}
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={`flex items-center gap-2 ${getTextAlign('left')}`}>
<Banknote className="w-5 h-5 text-teal-600" />
{safeT('bankFees', 'Bank Fees & FX by Country')}
</CardTitle>
</CardHeader>
<CardContent>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
{countries.map((c) => (
<div key={c.id} className="p-4 bg-white rounded-lg border hover:shadow-sm transition">
<div className="flex items-center justify-between">
<div className="font-semibold text-gray-900 uppercase tracking-wide">{formatCountry(c.country)}</div>
<Badge variant="outline">{c.currency_code}</Badge>
</div>
<div className="text-sm text-gray-600 mt-1">{c.currency_name}</div>
<div className="mt-2 text-sm">
<div className="text-gray-500">{safeT('exchangeRate', 'Exchange Rate')}</div>
<div className="font-medium">1 USD = {formatNumber(c.usd_rate_local, 4)} {c.currency_code}</div>
</div>
<div className="mt-2 text-sm">
<div className="text-gray-500">{safeT('typicalFee', 'Typical fee')}</div>
<div className="font-medium">{c.typical_bank_fee_percent_range} ({safeT('avg', 'avg')} {c.typical_bank_fee_percent_avg}%)</div>
</div>
{c.popular_banks?.length > 0 && (
<div className="mt-2 text-sm">
<div className="text-gray-500">{safeT('popularBanks', 'Popular Banks')}</div>
<div className="font-medium">{c.popular_banks.join(", ")}</div>
</div>
)}
{c.last_updated && (
<div className="mt-2 text-xs text-gray-500">
{safeT('lastUpdated', 'Last updated')}: {c.last_updated}
</div>
)}
</div>
))}
</div>
<div className={`text-xs text-gray-500 mt-6 ${getTextAlign('left')}`}>
{safeT('disclaimer', 'Disclaimer')}: {safeT('ratesDisclaimer', 'Rates and fees are indicative and for estimation only. Banks may add FX markups or flat fees. Please check with your provider for exact costs.')}
</div>
</CardContent>
</Card>
</div>
</div>


);
}
