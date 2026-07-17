import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, UploadCloud, Save, Play, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/components/LanguageContext";
// TODO-07 (see TODO.md): SiteSettings/UploadFile were Base44 entities.
// For launch, the video URL is hardcoded below. When the backend has a
// settings endpoint, wire fetchSettings/handleSave to api.client instead.
export default function ProductVideo() {



const { t, isRTL, getTextAlign } = useLanguage();
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [settings, setSettings] = useState(null);
const [editMode, setEditMode] = useState(false);
const [form, setForm] = useState({
product_video_title: "Product Video",
product_video_description: "",
product_video_url: "",
product_video_provider: "auto",
});
const fetchSettings = async () => {
// TODO-07: hardcoded until a real settings endpoint exists.
setForm({
product_video_title: "Product Video",
product_video_description: "",
product_video_url: "",
product_video_provider: "auto",
});
setEditMode(true);
setLoading(false);
};
useEffect(() => {
fetchSettings();
}, []);
const detectedProvider = useMemo(() => {
const p = form.product_video_provider || "auto";
const url = form.product_video_url || "";
if (p !== "auto") return p;
if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
if (/vimeo\.com/.test(url)) return "vimeo";
if (url) return "file";
return "auto";
}, [form.product_video_provider, form.product_video_url]);
const getYoutubeEmbedUrl = (url) => {
try {
if (url.includes("youtu.be/")) {
const id = url.split("youtu.be/")[1].split(/[?&#]/)[0];
return `https://www.youtube.com/embed/${id}`;
}
const u = new URL(url);
const v = u.searchParams.get("v");
if (v) return `https://www.youtube.com/embed/${v}`;
// Fallback for /embed/ already
if (url.includes("/embed/")) return url;
} catch {}
return "";
};
const getVimeoEmbedUrl = (url) => {
try {
const match = url.match(/vimeo\.com\/(\d+)/);
if (match && match[1]) {
return `https://player.vimeo.com/video/${match[1]}`;
}
// If already player URL, return as is
if (url.includes("player.vimeo.com")) return url;
} catch {}
return "";
};
const handleUpload = async (e) => {
const file = e.target.files?.[0];
if (!file) return;
// TODO-07: no file-storage backend yet. Wire this to a real upload
// endpoint when one exists; for now this is a no-op.
console.warn("File upload not wired yet — TODO-07", file.name);
};
const handleSave = async () => {
setSaving(true);
const payload = {
product_video_title: form.product_video_title,
product_video_description: form.product_video_description,
product_video_url: form.product_video_url,
product_video_provider: form.product_video_provider || "auto",
};
// TODO-07: no settings-save endpoint yet. This just updates local
// state so the editor is usable; persist via api.client once the
// backend has a settings endpoint.
console.warn("Settings save not wired to a backend yet — TODO-07", payload);
setSaving(false);
setEditMode(false);
};
const Player = () => {
const url = form.product_video_url;
const provider = detectedProvider;
if (!url) {
return (
<div className={`aspect-video w-full bg-gray-100 rounded-xl flex items-center justify-center ${getTextAlign('center')}`}>
<div className="text-gray-500 flex items-center gap-2">
<Play className="w-5 h-5" /> {t('watchDemo')}
</div>
</div>
);
}
if (provider === "youtube") {
return (
<div className="aspect-video w-full rounded-xl overflow-hidden">
<iframe
className="w-full h-full"
src={getYoutubeEmbedUrl(url)}
title="Product Video"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
/>
</div>
);
}
if (provider === "vimeo") {
return (
<div className="aspect-video w-full rounded-xl overflow-hidden">
<iframe
className="w-full h-full"
src={getVimeoEmbedUrl(url)}
title="Product Video"
frameBorder="0"
allow="autoplay; fullscreen; picture-in-picture"
allowFullScreen
/>
</div>
);
}
return (
<div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
<video className="w-full h-full" controls src={url} />
</div>
);
};
return (
<div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4 md:p-8">
<div className="max-w-5xl mx-auto">
<div className="flex items-center gap-4 mb-8">
<Link to={createPageUrl("Home")}>
<Button variant="outline" size="icon">
<ArrowLeft className={`w-4 h-4 ${isRTL ? 'transform scale-x-[-1]' : ''}`} />
</Button>
</Link>
<div>
<h1 className="text-2xl font-bold text-gray-900">{form.product_video_title || "Product Video"}</h1>
{form.product_video_description ? (
<p className="text-gray-600">{form.product_video_description}</p>
) : null}
</div>
</div>
{loading ? (
<Card>
<CardContent className="p-10 flex items-center justify-center text-gray-500">
<Loader2 className="w-5 h-5 mr-2 animate-spin" /> Loading...
</CardContent>
</Card>
) : (
<>
<Card className="shadow-xl">
<CardContent className="p-4 md:p-6">
<Player />
</CardContent>
</Card>
<Card className="mt-6">
<CardHeader>
<CardTitle className="text-lg">
{settings ? (editMode ? "Edit Video" : "Change Video") : "Add Product Video"}
</CardTitle>
</CardHeader>


<CardContent className="space-y-4">
<div className="grid md:grid-cols-2 gap-4">
<div className="space-y-2">
<Label className={getTextAlign()}>{isRTL ? "عنوان" : "Title"}</Label>
<Input
value={form.product_video_title}
onChange={(e) => setForm({ ...form, product_video_title: e.target.value })}
placeholder="Product Video"
/>
</div>
<div className="space-y-2">
<Label className={getTextAlign()}>{isRTL ? "موفر الفيديو" : "Provider"}</Label>
<Select
value={form.product_video_provider}
onValueChange={(v) => setForm({ ...form, product_video_provider: v })}
>
<SelectTrigger>
<SelectValue placeholder="auto" />
</SelectTrigger>
<SelectContent>
<SelectItem value="auto">Auto detect</SelectItem>
<SelectItem value="youtube">YouTube</SelectItem>
<SelectItem value="vimeo">Vimeo</SelectItem>
<SelectItem value="file">File</SelectItem>
</SelectContent>
</Select>
</div>
</div>
<div className="space-y-2">
<Label className={getTextAlign()}>{isRTL ? "رابط الفيديو" : "Video URL"}</Label>
<Input
value={form.product_video_url}
onChange={(e) => setForm({ ...form, product_video_url: e.target.value })}
placeholder="https://youtu.be/..., https://vimeo.com/..., or https://.../video.mp4"
/>
</div>
<div className="space-y-2">
<Label className={getTextAlign()}>{isRTL ? "الوصف" : "Description"}</Label>
<Textarea
value={form.product_video_description}
onChange={(e) => setForm({ ...form, product_video_description: e.target.value })}
placeholder={isRTL ? "وصف قصير للفيديو" : "Short video description"}
/>
</div>
<div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
<div>
<Input
id="video-upload"
type="file"
accept="video/*"
className="hidden"
onChange={handleUpload}
/>
<label htmlFor="video-upload">
<Button variant="outline" type="button">
<UploadCloud className="w-4 h-4 mr-2" />
{isRTL ? "رفع فيديو" : "Upload Video"}
</Button>
</label>
</div>
<Button onClick={handleSave} disabled={saving}>
{saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
{isRTL ? "حفظ" : "Save"}
</Button>
{settings && (
<Button
variant="outline"
type="button"
onClick={() => setEditMode((v) => !v)}
>
{editMode ? (isRTL ? "إلغاء" : "Cancel") : (isRTL ? "تعديل" : "Edit")}
</Button>
)}
</div>
</CardContent>
</Card>
</>
)}
</div>
</div>
);
}
