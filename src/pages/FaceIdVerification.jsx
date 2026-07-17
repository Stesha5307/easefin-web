import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
export default function FaceIdVerification() {
const { t } = useLanguage();
const [cameraStarted, setCameraStarted] = useState(false);
const [capturedPhoto, setCapturedPhoto] = useState(null);
const [isVerifying, setIsVerifying] = useState(false);
const [isVerified, setIsVerified] = useState(false);
const [cameraError, setCameraError] = useState("");
const [stream, setStream] = useState(null);
const videoRef = useRef(null);
const canvasRef = useRef(null);
const stopCamera = useCallback(() => {
if (stream) {
stream.getTracks().forEach(track => track.stop());
setStream(null);
}
setCameraStarted(false);
}, [stream]);
const startCamera = async () => {
try {
setCameraError("");
const mediaStream = await navigator.mediaDevices.getUserMedia({
video: {
width: { ideal: 640 },
height: { ideal: 480 },
facingMode: 'user'
}
});
setStream(mediaStream);
if (videoRef.current) {
videoRef.current.srcObject = mediaStream;
await videoRef.current.play();
setCameraStarted(true);
}
} catch (error) {
console.error("Camera access error:", error);
setCameraError(`${t('cameraAccessFailed')}: ${t('allowCameraAndTryAgain')}`);
}
};
const capturePhoto = () => {
if (videoRef.current && canvasRef.current && cameraStarted) {
const canvas = canvasRef.current;
const video = videoRef.current;
const ctx = canvas.getContext('2d');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
ctx.save();
ctx.scale(-1, 1);
ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
ctx.restore();
const imageData = canvas.toDataURL('image/jpeg', 0.8);
setCapturedPhoto(imageData);
stopCamera();
}
};
const retakePhoto = () => {
setCapturedPhoto(null);
startCamera();
};
const verifyFace = () => {
setIsVerifying(true);
setTimeout(() => {
setIsVerifying(false);
setIsVerified(true);
}, 3000);
};
useEffect(() => {
return () => stopCamera();
}, [stopCamera]);
return (



<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-4xl mx-auto">
<div className="flex items-center gap-4 mb-8">
<Link to={createPageUrl("GovIdVerification")}>
<Button variant="outline" size="icon">
<ArrowLeft className="w-4 h-4" />
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
<h1 className="text-2xl font-bold text-gray-900">{t('faceIdVerification')}</h1>
<p className="text-gray-600">{t('faceIdSubtitle')}</p>
</div>
</div>
</div>
<div className="grid lg:grid-cols-3 gap-8">
<div className="lg:col-span-2">
{!isVerified ? (
<Card className="shadow-xl">
<CardHeader>
<CardTitle className="flex items-center gap-3">
<Camera className="w-6 h-6 text-teal-600" />
{t('scanFace')}
</CardTitle>
<p className="text-gray-600">{t('scanFaceDesc')}</p>
</CardHeader>
<CardContent className="space-y-6">
<div
className="relative bg-black rounded-xl overflow-hidden flex items-center justify-center"
style={{ height: '400px' }}
>
{cameraError ? (
<div className="text-center text-white p-6">
<AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
<p className="text-red-300 mb-4">{cameraError}</p>
<Button
onClick={startCamera}
variant="outline"
className="bg-white/10 border-white/20 text-white hover:bg-white/20"
>
{t('startCamera')}
</Button>
</div>
) : !cameraStarted && !capturedPhoto ? (
<div className="text-center text-white">
<Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
<p className="opacity-75 mb-4">{t('cameraPreviewHere')}</p>
<Button onClick={startCamera} className="bg-teal-600 hover:bg-teal-700">
<Camera className="w-4 h-4 mr-2" />
{t('startCamera')}
</Button>
</div>
) : capturedPhoto ? (
<img
src={capturedPhoto}
alt="Captured"
className="w-full h-full object-cover"
/>
) : (
<div className="relative w-full h-full">
<video
ref={videoRef}
autoPlay
playsInline
muted
className="w-full h-full object-cover"
style={{ transform: 'scaleX(-1)' }}
/>
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div className="w-48 h-60 border-4 border-teal-400 rounded-full opacity-75"></div>
</div>
</div>
)}
</div>
<canvas ref={canvasRef} style={{ display: 'none' }} />
<div className="flex justify-center gap-3">
{cameraStarted && !capturedPhoto ? (
<Button onClick={capturePhoto} className="bg-gradient-to-r from-teal-600 to-teal-700">
<Camera className="w-4 h-4 mr-2" />
{t('capturePhoto')}
</Button>
) : capturedPhoto ? (
<div className="flex gap-3">
<Button variant="outline" onClick={retakePhoto}>
<RefreshCw className="w-4 h-4 mr-2" />


{t('retake')}
</Button>
<Button
onClick={verifyFace}
disabled={isVerifying}
className="bg-gradient-to-r from-teal-600 to-teal-700"
>
{isVerifying ? t('verifying') : t('verifyFace')}
</Button>
</div>
) : null}
</div>
</CardContent>
</Card>
) : (
<Card className="shadow-xl border-green-200">
<CardContent className="text-center p-12">
<CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
<h2 className="text-2xl font-bold text-green-600 mb-4">{t('faceVerifiedSuccess')}</h2>
<p className="text-gray-600 mb-8">{t('faceVerifiedSuccessDesc')}</p>
<div className="flex gap-4 justify-center">
<Link to={createPageUrl("StartJourney")}>
<Button className="bg-gradient-to-r from-teal-600 to-teal-700">
{t('completeProfile')}
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
<div className="lg:col-span-1">
<Card>
<CardContent className="p-6">
<h3 className="font-semibold text-lg mb-4">{t('bestResultsTips')}</h3>
<ul className="space-y-2 text-sm text-gray-600">
<li>✓ {t('goodLighting')}</li>
<li>✓ {t('removeGlasses')}</li>
<li>✓ {t('lookAtCamera')}</li>
<li>✓ {t('centerFace')}</li>
<li>✓ {t('avoidShadows')}</li>
<li>✓ {t('stayStill')}</li>
</ul>
</CardContent>
</Card>
</div>
</div>
</div>
</div>
);
}
