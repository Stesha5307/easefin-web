import React from 'react';
import { LanguageProvider } from '@/components/LanguageContext';
export default function Layout({ children }) {
return (
<LanguageProvider>
<style>{`
.rtl {
direction: rtl;
}
.ltr {
direction: ltr;
}
/* Ensure proper font rendering for Arabic and Urdu */
.rtl * {
font-family: 'Segoe UI', 'Tahoma', 'Arial', 'Helvetica Neue', sans-serif;
}
/* Fix button spacing for RTL */
.rtl .flex-row-reverse > * + * {
margin-right: 0.5rem;
margin-left: 0;
}
/* Fix text alignment in cards */
.rtl .text-left {
text-align: right;
}
.rtl .text-right {
text-align: left;
}
/* Make EaseFin AI logo bigger everywhere it appears */
img[alt="EaseFin AI Logo"] {
width: 64px !important;
height: 64px !important;
object-fit: contain;
display: inline-block;
}
@media (min-width: 640px) {
img[alt="EaseFin AI Logo"] {
width: 72px !important;
height: 72px !important;
}
}
/* Spacing next to logo depending on direction */
.ltr img[alt="EaseFin AI Logo"] { margin-right: 12px; }
.rtl img[alt="EaseFin AI Logo"] { margin-left: 12px; }
`}</style>
{children}
</LanguageProvider>
);
}
