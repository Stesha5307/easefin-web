import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, CreditCard, Banknote, Smartphone, Gift, CheckCircle2, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
// TODO-05/06 (see TODO.md): RemittanceCountry was a Base44 entity.
// Empty list for now until a backend endpoint exists — pricing section
// will show no countries until api.getRemittanceCountries() is wired.
import api from "@/api/client";
// TODO-06 (see TODO.md): SubscriptionRequest was a Base44 entity.
// Now uses api.submitLead(); backend owns the confirmation email.
import { useLanguage } from "@/components/LanguageContext";
export default function Subscription() {
const { t, isRTL, getTextAlign, currentLanguage } = useLanguage();
const [countries, setCountries] = useState([]);
const [selectedCountry, setSelectedCountry] = useState("");
const [paymentMethod, setPaymentMethod] = useState("card");
const [showDialog, setShowDialog] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
const [form, setForm] = useState({ name: "", email: "", notes: "" });
const safeT = (key, fallback) => {
const v = t(key);
return (!v || v === key) ? (fallback || key) : v;
};
const subscriptionLabelMap = {
"English": "Subscription",
"हि ंदी (Hindi)": "सदस्यता",
// TODO: PDF extraction corrupted the Urdu/Arabic entries here (bidi text
// reversed). Restore from the actual Base44-synced repo — keys must match
// LanguageContext.jsx's language list exactly (also flagged there).
"தமிழ் (Tamil)": "சந்தா",
"తెలుగు (Telugu)": "చందా",
"ਪੰਜਾਬੀ (Punjabi)": "ਸਬਸਕ੍ਰਿ ਪਸ਼ਨ",
"বাংলা (Bengali)": "সাবস্ক্রি পশন"
};
const subscriptionSubtitleMap = {
"English": "First month free, then $5/month. Cancel anytime.",
"हि ंदी (Hindi)": "पहला महीना मुफ्त, उसके बाद $5/माह। कभी भी रद्द करें।",
// TODO: PDF extraction corrupted the Urdu/Arabic entries here (bidi text
// reversed/reordered across multiple lines). Restore from the actual
// Base44-synced repo — keys must match LanguageContext.jsx's language list.
"தமிழ் (Tamil)": "முதல் மாதம் இலவசம், பின்னர் $5/மாதம். எப்போது வேண்டுமானாலும் ரத்து செய்யலாம்.",
"తెలుగు (Telugu)": "మొదటి నెల ఉచితం, తరువాత $5/నెల. ఎప్పు డైనా రద్దు చేసుకోవచ్చు .",
"ਪੰਜਾਬੀ (Punjabi)": "ਪਹਿ ਲਾ ਮਹੀਨਾ ਮੁਫ਼ਤ, ਫਿ ਰ $5/ਮਹੀਨਾ। ਕਦੇ ਵੀ ਰੱਦ ਕਰੋ।",
"বাংলা (Bengali)": "প্র থম মাস ফ্রি , এরপর $5/মাস। যে ক োন ো সময় বাতি ল করুন।"
};
const subLabel = subscriptionLabelMap[currentLanguage] || safeT('subscription', 'Subscription');
const subSubtitle = subscriptionSubtitleMap[currentLanguage] || safeT('subscriptionSubtitle', 'First month free, then $5/month. Cancel anytime.');
const USD_PRICE = 5;
const formatCountry = useCallback((slug) => (slug || "").replace(/-/g, " ").toUpperCase(), []);
const formatMoney = (amt, code) =>
`${Number(amt || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${code || ""}`.trim();
useEffect(() => {



const load = async () => {
// TODO-05/06: was RemittanceCountry.list(). Empty until backend exists.
const rows = [];
setCountries(rows);
// Read optional ?country= param to preselect
const urlParams = new URLSearchParams(window.location.search);
const requested = urlParams.get('country');
const exists = requested && rows.find(r => r.country === requested);
const def = exists ? requested : (rows.find(r => r.country === "uae")?.country || rows[0]?.country || "");
setSelectedCountry(def);
};
load();
}, []);
const current = useMemo(() => countries.find(c => c.country === selectedCountry), [countries, selectedCountry]);
const localPrice = useMemo(() => {
if (!current) return 0;
// usd_rate_local = local per 1 USD
return USD_PRICE * (current.usd_rate_local || 0);
}, [current]);
const handleStartTrial = () => {
setShowDialog(true);
setSubmitted(false);
};
const handleSubmit = async () => {
setIsSubmitting(true);
setSubmitError("");
const payload = {
name: form.name || "",
email: form.email,
notes: form.notes || "",
country: selectedCountry,
currency_code: current?.currency_code || "",
payment_method: paymentMethod,
plan: "basic",
monthly_price_usd: USD_PRICE,
monthly_price_local: Number(localPrice?.toFixed(2) || 0)
};
try {
await api.submitLead({ type: "subscription", ...payload });
// TODO-06: confirmation email was sent client-side via Base44's SendEmail.
// The backend should send it when it processes this lead instead —
// client-side email sending isn't something we have a replacement for,
// and it's a better fit for the backend anyway (retries, templates, etc).
setSubmitted(true);
} catch (error) {
console.error("Subscription lead failed:", error);
setSubmitError(safeT('submitFailed', 'Something went wrong. Please try again.'));
} finally {
setIsSubmitting(false);
}
};
const startJourneyUrl = createPageUrl(
`StartJourney?from=subscription&country=${encodeURIComponent(selectedCountry || "")}&currency=${encodeURIComponent(current?.currency_code || "")}`
);
return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
<div className={`flex items-center gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
<DollarSign className="w-6 h-6 text-white" />
</div>
<div>
<h1 className={`text-2xl md:text-3xl font-bold text-gray-900 ${getTextAlign('left')}`}>{subLabel}</h1>
<p className={`text-gray-600 ${getTextAlign('left')}`}>{subSubtitle}</p>
</div>
</div>


</div>
<div className="grid lg:grid-cols-3 gap-8">
{/* Plan */}
<Card className="lg:col-span-2 shadow-xl">
<CardHeader>
<CardTitle className={getTextAlign('left')}>Your Plan</CardTitle>
</CardHeader>
<CardContent className="space-y-6">
<div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center">
<Gift className="w-5 h-5" />
</div>
<div className={getTextAlign('left')}>
<div className="text-lg font-semibold text-gray-900">Free for 1 month</div>
<div className="text-gray-600">Then 5.00 USD/month</div>
</div>
</div>
<div className={`grid sm:grid-cols-2 gap-4 ${getTextAlign('left')}`}>
<div className="p-4 rounded-xl bg-white border">
<div className="text-sm text-gray-500 mb-1">USD Price</div>
<div className="text-2xl font-bold text-gray-900">$ {USD_PRICE.toFixed(2)}/mo</div>
</div>
<div className="p-4 rounded-xl bg-white border">
<div className="flex items-center justify-between mb-1">
<div className="text-sm text-gray-500">Local Price</div>
{current?.currency_code && (
<Badge variant="outline">{current.currency_code}</Badge>
)}
</div>
<div className="text-2xl font-bold text-gray-900">
{current ? `${formatMoney(localPrice, current.currency_code)}/mo` : "—"}
</div>
<div className="text-xs text-gray-500 mt-1">Based on current USD→local rate.</div>
</div>
</div>
<div className="grid sm:grid-cols-2 gap-4">
<div className="space-y-2">
<Label className={getTextAlign('left')}>Your Country</Label>
<Select value={selectedCountry} onValueChange={setSelectedCountry}>
<SelectTrigger className={isRTL ? 'text-right' : ''}>
<SelectValue placeholder="Select Country" />
</SelectTrigger>
<SelectContent>
{countries.map((c) => (
<SelectItem key={c.country} value={c.country}>
{c.currency_code} • {formatCountry(c.country)}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<div className="space-y-2">
<Label className={getTextAlign('left')}>Payment Method</Label>
<RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-2">
<label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
<RadioGroupItem value="card" id="pm-card" />
<CreditCard className="w-4 h-4 text-gray-600" />
<span>Card</span>
</label>
<label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
<RadioGroupItem value="bank_transfer" id="pm-bank" />
<Banknote className="w-4 h-4 text-gray-600" />
<span>Bank Transfer</span>
</label>
<label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
<RadioGroupItem value="mobile_wallet" id="pm-wallet" />
<Smartphone className="w-4 h-4 text-gray-600" />
<span>Mobile Wallet</span>
</label>
</RadioGroup>
</div>
</div>
<div className="flex flex-wrap items-center gap-3">
<Badge className="bg-emerald-100 text-emerald-800">Cancel anytime</Badge>
<Badge className="bg-blue-100 text-blue-800">No hidden fees</Badge>
<Badge className="bg-purple-100 text-purple-800">First month free</Badge>
</div>
<div className="flex justify-end">
<Button onClick={handleStartTrial} className="bg-gradient-to-r from-teal-600 to-teal-700">
Start Free Month
</Button>
</div>
</CardContent>
</Card>
{/* Multi-currency reference */}
<Card className="shadow-xl">


<CardHeader>
<CardTitle className={getTextAlign('left')}>Monthly Price by Country</CardTitle>
</CardHeader>
<CardContent>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
{countries.map((c) => {
const price = USD_PRICE * (c.usd_rate_local || 0);
return (
<div key={c.id} className="p-3 bg-white border rounded-lg">
<div className="flex items-center justify-between">
<div className="font-semibold text-gray-900">{formatCountry(c.country)}</div>
<Badge variant="outline">{c.currency_code}</Badge>
</div>
<div className="text-sm text-gray-600 mt-1">~ {formatMoney(price, c.currency_code)}/mo</div>
</div>
);
})}
</div>
<div className={`text-xs text-gray-500 mt-3 ${getTextAlign('left')}`}>
Prices are indicative based on current USD conversion.
</div>
</CardContent>
</Card>
</div>
{/* NEW: Profile creation CTA */}
<div className="mt-10">
<div className="rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 p-6 md:p-8 text-white text-center">
<h3 className="text-xl md:text-2xl font-bold mb-2">{safeT('unlockPersonalizedMatches', 'Unlock personalized matches')}</h3>
<p className="text-teal-100 mb-5">{safeT('createProfileSubtitle', 'Create your profile to get tailored recommendations instantly.')}</p>
<Link to={startJourneyUrl}>
<Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
{safeT('createYourProfile', 'Create Your Profile')}
</Button>
</Link>
</div>
</div>
</div>
{/* Trial capture dialog */}
<Dialog open={showDialog} onOpenChange={setShowDialog}>
<DialogContent>
<DialogHeader>
<DialogTitle>{safeT('startYourFreeMonth', 'Start your free month')}</DialogTitle>
<DialogDescription>{safeT('weWillActivateTrial', 'We’ll activate your trial and follow up to complete payment after 30 days.')}</DialogDescription>
</DialogHeader>
{submitted ? (
<div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 text-emerald-800">
<CheckCircle2 className="w-5 h-5" />
{safeT('requestReceived', 'Your request was received. We’ll email you shortly with activation details.')}
</div>
) : (
<div className="space-y-4">
<div className="grid sm:grid-cols-2 gap-4">
<div className="space-y-2">
<Label>Name (optional)</Label>
<Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
</div>
<div className="space-y-2">
<Label>Email</Label>
<Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
</div>
</div>
<div className="space-y-2">
<Label>Notes (optional)</Label>
<Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything we should know?" />
</div>
</div>
)}
<DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
{submitted ? (
<>
<Link to={startJourneyUrl} className="w-full sm:w-auto">
<Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700">
{safeT('createProfileNow', 'Create Profile Now')}
</Button>
</Link>
<Button onClick={() => setShowDialog(false)} variant="outline" className="w-full sm:w-auto">
{safeT('close', 'Close')}
</Button>
</>
) : (
<div className="w-full space-y-2">
{submitError && (
<p className="text-sm text-red-600">{submitError}</p>
)}
<Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-gradient-to-r from-teal-600 to-teal-700">
{isSubmitting ? safeT('submitting', 'Submitting…') : safeT('confirmFreeTrial', 'Confirm Free Trial')}
</Button>
</div>
)}
</DialogFooter>
</DialogContent>
</Dialog>


</div>
);
}
