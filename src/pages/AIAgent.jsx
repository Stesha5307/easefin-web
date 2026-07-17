import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX, Bot, Building2, Award, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
import api from "@/api/client";
// TODO-02 (see TODO.md): profileData and sampleRecommendations below are
// still the Base44 mock data. Once the backend returns real profiles/
// recommendations, remove them and use the live data from api.chat().
export default function AIAgent() {
const { t, currentLanguage } = useLanguage();
const [isListening, setIsListening] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [userQuery, setUserQuery] = useState("");
const [conversation, setConversation] = useState([]);
const [recognition, setRecognition] = useState(null);
const [synthesis, setSynthesis] = useState(null);
// Mock profile data - wrapped in useMemo to prevent re-creation on every render
const profileData = useMemo(() => ({
fullName: "John Doe",
country: "india",
city: "Mumbai",
businessType: "retail",
businessCategory: "food-beverage",
monthlyRevenue: "50000-100000",
loanAmount: "1L-5L",
loanPurpose: "expansion",
creditScore: "good",
preferredLanguage: currentLanguage
}), [currentLanguage]);
// Regional sample recommendations for target countries
const sampleRecommendations = useMemo(() => ({
microfinance: [
{
name: "Bandhan Bank (India)",
description: "Leading microfinance institution serving small businesses across India",
eligibility: "Monthly revenue 25K-2L INR, 2+ years in business",
contact: "1800-123-4567"
},
{
name: "BRAC Microfinance (Bangladesh)",
description: "Largest microfinance organization in Bangladesh for SMEs",
eligibility: "Small businesses, women entrepreneurs",
contact: "contact@brac.net"
},
{
name: "Kashf Foundation (Pakistan)",
description: "Pakistan's leading microfinance institution",
eligibility: "Small businesses, especially women-led enterprises",
contact: "info@kashf.org"
},
{
name: "Al Yusr Leasing (Oman)",
description: "Sharia-compliant financing for small businesses in Oman",
eligibility: "Local businesses, good credit history",
contact: "info@alyusr.com"
}
],
banks: [
{
name: "Emirates NBD (UAE)",
description: "SME banking solutions across UAE",
eligibility: "Established businesses with good credit",
contact: "sme@emiratesnbd.com"
},
{
name: "Al Rajhi Bank (Saudi Arabia)",
description: "Islamic banking solutions for small businesses",
eligibility: "Sharia-compliant businesses",



contact: "sme@alrajhibank.com.sa"
},
{
name: "Gulf Bank (Kuwait)",
description: "SME financing and business banking in Kuwait",
eligibility: "Local businesses with 2+ years operation",
contact: "business@gulfbank.com.kw"
},
{
name: "Ahli United Bank (Bahrain)",
description: "Business banking and SME loans in Bahrain",
eligibility: "Established SMEs with good financial standing",
contact: "sme@ahliunited.com"
}
],
government_programs: [
{
name: "PM SVANidhi Scheme (India)",
description: "₹10,000 working capital loan for street vendors and small retailers",
eligibility: "Street vendors, hawkers, small retailers in India",
contact: "pmsvannidhi.mohua.gov.in"
},
{
name: "SME Foundation (Bangladesh)",
description: "Government SME support and financing programs",
eligibility: "Small and medium enterprises in Bangladesh",
contact: "info@smef.gov.bd"
},
{
name: "SMEDA (Pakistan)",
description: "Small and Medium Enterprise Development Authority programs",
eligibility: "Pakistani SMEs seeking development support",
contact: "info@smeda.org.pk"
},
{
name: "Mohammed bin Rashid Innovation Fund (UAE)",
description: "Government-backed innovation and startup funding",
eligibility: "Innovative startups and SMEs in UAE",
contact: "innovation@mbrf.ae"
}
]
}), []);
const getLanguageCode = useCallback((language) => {
const langCodes = {
'English': 'en-US',
'हि ंदी (Hindi)': 'hi-IN',
// TODO: PDF extraction corrupted the Urdu/Arabic keys here (bidi text
// reversed). Restore from the actual Base44-synced repo — the keys must
// exactly match the Urdu/Arabic entries in LanguageContext.jsx's language
// list (also flagged there). Locale codes are correct: Urdu 'ur-PK', Arabic 'ar-SA'.
'தமிழ் (Tamil)': 'ta-IN',
'తెలుగు (Telugu)': 'te-IN',
'ਪੰਜਾਬੀ (Punjabi)': 'pa-IN',
'বাংলা (Bengali)': 'bn-IN'
};
return langCodes[language] || 'en-US';
}, []);
const speak = useCallback((text) => {
if (synthesis && text) {
// Stop any currently speaking utterance
synthesis.cancel();
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = getLanguageCode(currentLanguage);
utterance.rate = 0.8;
utterance.pitch = 1;
utterance.volume = 1;
// Try to find the best voice for the language
const voices = synthesis.getVoices();
const targetLang = getLanguageCode(currentLanguage);
const preferredVoice = voices.find(voice =>
voice.lang.startsWith(targetLang.split('-')[0])
);
if (preferredVoice) {
utterance.voice = preferredVoice;
}
utterance.onstart = () => setIsSpeaking(true);
utterance.onend = () => setIsSpeaking(false);
utterance.onerror = () => setIsSpeaking(false);
synthesis.speak(utterance);
}
}, [synthesis, getLanguageCode, currentLanguage]);
const handleUserQuery = useCallback(async (query) => {
setIsLoading(true);
try {
const countryContext = {
'india': 'India - Focus on RBI regulations, MUDRA loans, PM SVANidhi, Bandhan Bank, microfinance institutions',
'bangladesh': 'Bangladesh - Focus on BRAC, Grameen Bank, SME Foundation programs, Bangladesh Bank regulations',


'pakistan': 'Pakistan - Focus on Kashf Foundation, Akhuwat, SMEDA programs, State Bank of Pakistan regulations',
'oman': 'Oman - Focus on Al Yusr Leasing, Bank Muscat SME, Oman Development Bank, Sharia-compliant financing',
'uae': 'UAE - Focus on Emirates NBD, ADCB SME, Mohammed bin Rashid Innovation Fund, Dubai SME support',
'kuwait': 'Kuwait - Focus on Gulf Bank, Kuwait Finance House SME, Industrial Bank of Kuwait, government SME programs',
'bahrain': 'Bahrain - Focus on Ahli United Bank, BBK SME, Bahrain Development Bank, SME support initiatives',
'saudi-arabia': 'Saudi Arabia - Focus on Al Rajhi Bank, SABB SME, Saudi Industrial Development Fund, Vision 2030 SME programs'
};
const prompt = `
You are EaseFin AI, a multilingual financial advisor assistant specializing in South Asia and the Gulf region.
User Profile:
- Name: ${profileData.fullName}
- Location: ${profileData.city}, ${profileData.country}
- Business Type: ${profileData.businessType}
- Business Category: ${profileData.businessCategory}
- Monthly Revenue: ${profileData.monthlyRevenue}
- Loan Amount Needed: ${profileData.loanAmount}
- Loan Purpose: ${profileData.loanPurpose}
- Credit Score: ${profileData.creditScore}
Regional Context: ${countryContext[profileData.country] || countryContext['india']}
User Query: "${query}"
Please respond ONLY in ${currentLanguage} and provide:
1. A helpful response to their query
2. Specific financial institutions available in ${profileData.country}
3. Government programs they might qualify for in their region
4. Practical next steps they can take
Focus specifically on: India, Bangladesh, Pakistan, Oman, UAE, Kuwait, Bahrain, and Saudi Arabia.
Keep your response conversational, helpful, culturally appropriate, and under 150 words.
`;
// TODO-02: this still sends the full hardcoded prompt built above from
// mock profileData. Once /chat exists for real, simplify this to just
// send the user's message + userId + language, and let the backend build
// the prompt server-side using the real stored profile.
const { reply } = await api.chat({
userId: profileData.fullName, // placeholder until real auth/user IDs exist
message: query,
language: currentLanguage
});
const response = reply;
const newMessage = {
type: 'ai',
content: response,
timestamp: new Date()
};
setConversation(prev => [...prev,
{ type: 'user', content: query, timestamp: new Date() },
newMessage
]);
// Speak the response in the user's preferred language
speak(response);
} catch (error) {
console.error('Error getting AI response:', error);
let errorMsg;
if (error.message.includes('429')) {
errorMsg = currentLanguage === 'English' ?
'I apologize, but I am currently experiencing high demand. Please try again in a moment.' :
currentLanguage === 'हि ंदी (Hindi)' ?
'मुझे खुशी है कि आप रुचि रखते हैं। कृपया थोड़ी देर बाद पुनः प्रयास करें।' :
// TODO: PDF extraction corrupted the Arabic message here (bidi text
// reversed/reordered). Restore the correct Arabic string from the
// actual Base44-synced repo before launch (currently falls back to English).
'I apologize, but I am currently experiencing high demand. Please try again in a moment.';
} else {
errorMsg = currentLanguage === 'English' ?
'Sorry, I encountered an error. Please try again.' :
currentLanguage === 'हि ंदी (Hindi)' ?
'खुशी है, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।' :
// TODO: PDF extraction corrupted the Arabic message here (bidi text
// reversed/reordered). Restore the correct Arabic string from the
// actual Base44-synced repo before launch (currently falls back to English).
'Sorry, I encountered an error. Please try again.';
}
setConversation(prev => [...prev,
{ type: 'user', content: query, timestamp: new Date() },
{ type: 'ai', content: errorMsg, timestamp: new Date() }
]);
speak(errorMsg);
} finally {
setIsLoading(false);
setUserQuery("");
}
}, [profileData, currentLanguage, speak]);
useEffect(() => {
// Initialize speech recognition and synthesis
if ('webkitSpeechRecognition' in window) {
const speechRecognition = new window.webkitSpeechRecognition();
speechRecognition.continuous = false;
speechRecognition.interimResults = false;


speechRecognition.lang = getLanguageCode(currentLanguage);
speechRecognition.onresult = (event) => {
const transcript = event.results[0][0].transcript;
setUserQuery(transcript);
handleUserQuery(transcript);
};
speechRecognition.onend = () => {
setIsListening(false);
};
speechRecognition.onerror = (event) => {
console.error('Speech recognition error:', event.error);
setIsListening(false);
};
setRecognition(speechRecognition);
}
if ('speechSynthesis' in window) {
setSynthesis(window.speechSynthesis);
}
}, [currentLanguage, getLanguageCode, handleUserQuery]);
const startListening = () => {
if (recognition) {
setIsListening(true);
recognition.start();
}
};
const stopListening = () => {
if (recognition) {
recognition.stop();
setIsListening(false);
}
};
const stopSpeaking = () => {
if (synthesis) {
synthesis.cancel();
setIsSpeaking(false);
}
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-6xl mx-auto">
{/* Header */}
<div className="flex items-center gap-4 mb-8">
<Link to={createPageUrl("StartJourney")}>
<Button variant="outline" size="icon">
<ArrowLeft className="w-4 h-4" />
</Button>
</Link>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
<Bot className="w-6 h-6 text-white" />
</div>
<div>
<h1 className="text-2xl font-bold text-gray-900">{t('aiFinancialAdvisor')}</h1>
<p className="text-gray-600">{t('aiAdvisorSubtitle')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
{/* AI Chat Interface */}
<div className="lg:col-span-2">
<Card className="shadow-xl">
<CardHeader>
<CardTitle className="flex items-center gap-3">
<Bot className="w-6 h-6 text-teal-600" />
{t('talkToAI')}
</CardTitle>
<p className="text-gray-600">{t('aiChatDesc')}</p>
</CardHeader>
<CardContent>
{/* Language Indicator */}
<div className="mb-4 p-2 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
<p className="text-sm text-teal-700 text-center">
{t('speakingIn')} <span className="font-semibold">{currentLanguage}</span> ️
</p>
</div>
{/* Conversation History */}
<div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
{conversation.length === 0 ? (
<div className="text-center text-gray-500 mt-20">
<Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
<p>{t('startConversation')}</p>
<p className="text-sm mt-2">{t('askAboutLoans')}</p>
</div>


) : (
<div className="space-y-4">
{conversation.map((message, index) => (
<div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
<div className={`max-w-md p-3 rounded-lg ${
message.type === 'user'
? 'bg-teal-600 text-white'
: 'bg-white border shadow-sm'
}`}>
<p className="whitespace-pre-wrap">{message.content}</p>
</div>
</div>
))}
{isLoading && (
<div className="flex justify-start">
<div className="bg-white border shadow-sm p-3 rounded-lg">
<Loader2 className="w-5 h-5 animate-spin" />
</div>
</div>
)}
</div>
)}
</div>
{/* Voice Controls */}
<div className="flex gap-3 justify-center">
<Button
onClick={isListening ? stopListening : startListening}
disabled={isLoading}
className={`${
isListening
? 'bg-red-600 hover:bg-red-700'
: 'bg-gradient-to-r from-teal-600 to-teal-700'
}`}
>
{isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
{isListening ? t('stopListening') : t('startTalking')}
</Button>
<Button
variant="outline"
onClick={isSpeaking ? stopSpeaking : () => {}}
disabled={!isSpeaking}
>
{isSpeaking ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
{isSpeaking ? t('stopSpeaking') : t('speakResponse')}
</Button>
</div>
{userQuery && (
<div className="mt-4 p-3 bg-teal-50 rounded-lg">
<p className="text-sm text-teal-700">{t('youSaid')}: "{userQuery}"</p>
</div>
)}
</CardContent>
</Card>
</div>
{/* Recommendations Panel */}
<div className="lg:col-span-1 space-y-6">
{/* Profile Summary */}
<Card>
<CardHeader>
<CardTitle className="text-lg">{t('yourProfile')}</CardTitle>
</CardHeader>
<CardContent className="space-y-3">
<div className="flex justify-between text-sm">
<span className="text-gray-600">{t('location')}:</span>
<span className="font-medium">{profileData.city}</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-600">{t('business')}:</span>
<span className="font-medium">{profileData.businessCategory}</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-gray-600">{t('loanAmount')}:</span>
<span className="font-medium">{profileData.loanAmount}</span>
</div>
</CardContent>
</Card>
{/* Sample Recommendations */}
<Card>
<CardHeader>
<CardTitle className="text-lg flex items-center gap-2">
<Building2 className="w-5 h-5 text-teal-600" />
{t('microfinanceInstitutions')}
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
{sampleRecommendations.microfinance.slice(0, 2).map((institution, index) => (
<div key={index} className="p-3 bg-teal-50 rounded-lg">
<h4 className="font-semibold text-teal-900">{institution.name}</h4>
<p className="text-sm text-teal-700 mt-1">{institution.description}</p>


<Badge variant="outline" className="mt-2 text-xs">{institution.eligibility}</Badge>
</div>
))}
</CardContent>
</Card>
<Card>
<CardHeader>
<CardTitle className="text-lg flex items-center gap-2">
<Building2 className="w-5 h-5 text-blue-600" />
{t('banks')}
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
{sampleRecommendations.banks.slice(0, 2).map((bank, index) => (
<div key={index} className="p-3 bg-blue-50 rounded-lg">
<h4 className="font-semibold text-blue-900">{bank.name}</h4>
<p className="text-sm text-blue-700 mt-1">{bank.description}</p>
<Badge variant="outline" className="mt-2 text-xs">{bank.eligibility}</Badge>
</div>
))}
</CardContent>
</Card>
<Card>
<CardHeader>
<CardTitle className="text-lg flex items-center gap-2">
<Award className="w-5 h-5 text-orange-600" />
{t('governmentPrograms')}
</CardTitle>
</CardHeader>
<CardContent className="space-y-4">
{sampleRecommendations.government_programs.slice(0, 2).map((program, index) => (
<div key={index} className="p-3 bg-orange-50 rounded-lg">
<h4 className="font-semibold text-orange-900">{program.name}</h4>
<p className="text-sm text-orange-700 mt-1">{program.description}</p>
<Badge variant="outline" className="mt-2 text-xs">{program.eligibility}</Badge>
</div>
))}
</CardContent>
</Card>
</div>
</div>
</div>
</div>
);
}
