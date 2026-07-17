import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coins, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// TODO-04 (see TODO.md): GoldRate was a Base44 entity.
// Empty list until api.getGoldRates() exists.
import { useLanguage } from "@/components/LanguageContext";
export default function GoldLoans() {
const { t, isRTL, getTextAlign } = useLanguage();
const [rates, setRates] = useState([]);
const [country, setCountry] = useState("");
const [karat, setKarat] = useState("24");
const [grams, setGrams] = useState("");
const [ltv, setLtv] = useState(75);
const formatCountry = useCallback((slug) => (slug || "").replace(/-/g, " ").toUpperCase(), []);
const formatNumber = (n, digits = 2) =>
(Number.isFinite(+n) ? +n : 0).toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: 2 });
useEffect(() => {
const load = async () => {
const rows = []; // TODO-04: was GoldRate.list()
setRates(rows);
if (rows.length) setCountry(rows[0].country);
};
load();
}, []);
const current = useMemo(() => rates.find(r => r.country === country), [rates, country]);
const pricePerGram = useMemo(() => {
if (!current) return 0;
if (karat === "24") return current.rate_24k_per_gram;
if (karat === "22") return current.rate_22k_per_gram;
return current.rate_18k_per_gram;
}, [current, karat]);
const estLoan = useMemo(() => {
const g = parseFloat(grams || "0");
const pct = parseFloat(ltv || "0") / 100;
return Math.max(g, 0) * pricePerGram * pct;
}, [grams, ltv, pricePerGram]);
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("FinancialServices")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
<Coins className="w-6 h-6 text-white" />
</div>
<div>
<h1 className={`text-2xl font-bold text-gray-900 ${getTextAlign('left')}`}>Gold Loans & Current Gold Rates</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>Borrow against your gold and view current 18K/22K/24K prices by country.</p>
</div>
</div>
</div>
<Card className="shadow-xl mb-8">
<CardHeader>
<CardTitle className={`flex items-center gap-2 ${getTextAlign('left')}`}>
<Calculator className="w-5 h-5 text-yellow-600" />
Gold Loan Estimator
</CardTitle>
<p className={`text-gray-600 ${getTextAlign('left')}`}>Select your country, karat and weight to estimate eligible loan amount.</p>
</CardHeader>
<CardContent className="space-y-4">
<div className="grid md:grid-cols-4 gap-4">
<div className="space-y-2">
<Label className={getTextAlign('left')}>Country</Label>
<Select value={country} onValueChange={setCountry}>



<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder="Select Country" />
</SelectTrigger>
<SelectContent>
{rates.map(r => (
<SelectItem key={r.country} value={r.country}>
{r.currency_code} • {formatCountry(r.country)}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label className={getTextAlign('left')}>Karat</Label>
<Select value={karat} onValueChange={setKarat}>
<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder="Select Karat" />
</SelectTrigger>
<SelectContent>
<SelectItem value="18">18K</SelectItem>
<SelectItem value="22">22K</SelectItem>
<SelectItem value="24">24K</SelectItem>
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label className={getTextAlign('left')}>Weight (grams)</Label>
<Input
type="number"
min="0"
value={grams}
onChange={(e) => setGrams(e.target.value)}
className={isRTL ? 'text-right' : ''}
placeholder="e.g. 25"
/>
</div>
<div className="space-y-2">
<Label className={getTextAlign('left')}>LTV (%)</Label>
<Input
type="number"
min="0"
max="95"
value={ltv}
onChange={(e) => setLtv(e.target.value)}
className={isRTL ? 'text-right' : ''}
placeholder="75"
/>
</div>
</div>
{current && (
<div className="grid md:grid-cols-3 gap-4 pt-2">
<div className="p-4 bg-yellow-50 rounded-lg">
<div className="text-sm font-medium text-yellow-700">Price per gram</div>
<div className="text-lg font-semibold text-yellow-900 mt-1">
{formatNumber(pricePerGram)} {current.currency_code}
</div>
<div className="text-xs text-yellow-700 mt-1">Based on selected karat and country</div>
</div>
<div className="p-4 bg-emerald-50 rounded-lg">
<div className="text-sm font-medium text-emerald-700">Estimated Loan</div>
<div className="text-lg font-semibold text-emerald-900 mt-1">
~ {formatNumber(estLoan)} {current.currency_code}
</div>
<div className="text-xs text-emerald-700 mt-1">Assuming LTV {ltv}%</div>
</div>
<div className="p-4 bg-gray-50 rounded-lg">
<div className="text-sm font-medium text-gray-700">Reference</div>
<div className="text-xs text-gray-600 mt-1">Rates last updated: {current.last_updated}</div>
</div>
</div>
)}
</CardContent>
</Card>
<Card className="shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Current Gold Rates by Country</CardTitle>
</CardHeader>
<CardContent>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
{rates.map((r) => (
<div key={r.country} className="p-4 bg-white rounded-lg border hover:shadow-sm transition">
<div className="flex items-center justify-between">
<div className="font-semibold text-gray-900 uppercase tracking-wide">{formatCountry(r.country)}</div>
<Badge variant="outline">{r.currency_code}</Badge>
</div>
<div className="mt-3 text-sm space-y-1">
<div className="flex justify-between"><span className="text-gray-500">24K</span><span className="font-medium">{formatNumber(r.rate_24k_per_gram)} {r.currency_code}/g</span></div>
<div className="flex justify-between"><span className="text-gray-500">22K</span><span className="font-medium">{formatNumber(r.rate_22k_per_gram)} {r.currency_code}/g</span></div>
<div className="flex justify-between"><span className="text-gray-500">18K</span><span className="font-medium">{formatNumber(r.rate_18k_per_gram)} {r.currency_code}/g</span></div>
</div>
<div className="text-xs text-gray-500 mt-3">Last updated: {r.last_updated}</div>
</div>
))}
</div>
<div className={`text-xs text-gray-500 mt-6 ${getTextAlign('left')}`}>
Disclaimer: Rates are indicative and for estimation only. Lenders set final LTV, fees, and documentation requirements.
</div>
</CardContent>
</Card>
</div>
</div>
);
}
