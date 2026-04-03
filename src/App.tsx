/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, CheckCircle, Video, Mic, Scissors, Sparkles, Youtube, AlignLeft, Hash } from 'lucide-react';

export default function App() {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  const [title, setTitle] = useState("3 Psychological Tricks To Command Respect INSTANTLY 🤫");
  const [description, setDescription] = useState("Want to be respected the second you walk into a room? Use these 3 dark psychology and body language tricks to command instant respect and dominance.\nSubscribe for more psychology facts and self-improvement tips! 🧠📈");
  const [hashtags, setHashtags] = useState("#psychology #darkpsychology #respect #bodylanguage #sigma #selfimprovement #shorts #psychologyfacts");

  const script = `Hook (0-5s): Want people to respect you the second you walk into a room? Stop doing this ONE thing.

Body (5-25s):
Trick number 1: The Power Pause. When someone asks you a question, don't answer immediately. Wait 3 seconds. It makes you look powerful and in control.
Trick number 2: The Eye Triangle. Look at their right eye, left eye, then their mouth. It creates deep subconscious attraction and dominance.
Trick number 3: Take up space. Never cross your arms. Spread out. Predators take up space, prey make themselves small.

Outro (25-30s): Subscribe if you want to master the human mind.`;

  const prompt = `Cinematic close-up of a mysterious man in a dark tailored suit, intense eye contact, dark moody lighting, neon reflections, hyper-realistic, 8k resolution, slow motion, shot on 35mm lens.`;

  const copyToClipboard = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-50 p-6 font-sans selection:bg-violet-500/30" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <header className="text-center space-y-4 py-10 border-b border-zinc-800/50">
          <div className="inline-flex items-center justify-center p-4 bg-violet-500/10 rounded-2xl mb-2 shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-violet-500/20">
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 drop-shadow-sm">
            صانع الفيديوهات القصيرة
          </h1>
          <p className="text-zinc-400 text-lg font-medium">خطة عمل كاملة لإنشاء فيديو "علم النفس المظلم" للسوق الغربي</p>
        </header>

        {/* SEO & Publishing Section */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-zinc-800/50 pb-4 text-zinc-100">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
              <Youtube className="w-5 h-5 text-red-400" />
            </div>
            بيانات النشر (العنوان والوصف)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
              {/* Title Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-zinc-500" /> عنوان الفيديو (Title)
                  </label>
                  <button
                    onClick={() => copyToClipboard(title, setCopiedTitle)}
                    className="text-xs flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700/50 px-3 py-1.5 rounded-md transition-all text-zinc-300 hover:text-white"
                    dir="ltr"
                  >
                    {copiedTitle ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTitle ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#09090b]/80 border border-zinc-800 rounded-xl p-3.5 text-zinc-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all shadow-inner"
                  dir="ltr"
                />
              </div>

              {/* Hashtags Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-zinc-500" /> الهاشتاجات (Tags)
                  </label>
                  <button
                    onClick={() => copyToClipboard(hashtags, setCopiedTags)}
                    className="text-xs flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700/50 px-3 py-1.5 rounded-md transition-all text-zinc-300 hover:text-white"
                    dir="ltr"
                  >
                    {copiedTags ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedTags ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <textarea
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  rows={2}
                  className="w-full bg-[#09090b]/80 border border-zinc-800 rounded-xl p-3.5 text-zinc-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none shadow-inner"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Description Input */}
            <div className="h-full flex flex-col group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-zinc-500" /> وصف الفيديو (Description)
                </label>
                <button
                  onClick={() => copyToClipboard(description, setCopiedDesc)}
                  className="text-xs flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700/50 px-3 py-1.5 rounded-md transition-all text-zinc-300 hover:text-white"
                  dir="ltr"
                >
                  {copiedDesc ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedDesc ? 'Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full min-h-[140px] bg-[#09090b]/80 border border-zinc-800 rounded-xl p-3.5 text-zinc-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none shadow-inner leading-relaxed"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Script Section */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold flex items-center gap-3 text-zinc-100">
                <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                  <Mic className="w-5 h-5 text-violet-400" />
                </div>
                السكريبت (إنجليزي)
              </h2>
              <button
                onClick={() => copyToClipboard(script, setCopiedScript)}
                className="text-xs flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700/50 px-3 py-1.5 rounded-md transition-all text-zinc-300 hover:text-white"
                dir="ltr"
              >
                {copiedScript ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="bg-[#09090b]/80 p-5 rounded-2xl border border-zinc-800/80 shadow-inner">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed" dir="ltr">
                {script}
              </pre>
            </div>
          </div>

          {/* Prompts & Keywords */}
          <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold flex items-center gap-3 text-zinc-100">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <Video className="w-5 h-5 text-cyan-400" />
                  </div>
                  برومبت الذكاء الاصطناعي
                </h2>
                <button
                  onClick={() => copyToClipboard(prompt, setCopiedPrompt)}
                  className="text-xs flex items-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700/80 border border-zinc-700/50 px-3 py-1.5 rounded-md transition-all text-zinc-300 hover:text-white"
                  dir="ltr"
                >
                  {copiedPrompt ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedPrompt ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="bg-[#09090b]/80 p-5 rounded-2xl border border-zinc-800/80 shadow-inner">
                <p className="text-sm text-zinc-300 font-mono leading-relaxed" dir="ltr">
                  {prompt}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
              <h2 className="text-xl font-bold flex items-center gap-3 mb-5 text-zinc-100">
                <div className="p-2 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
                  <Scissors className="w-5 h-5 text-fuchsia-400" />
                </div>
                كلمات بحث (Pexels)
              </h2>
              <div className="flex flex-wrap gap-2.5" dir="ltr">
                {['Confident man walking', 'Clock ticking macro', 'Intense eye contact', 'Boss sitting', 'Abstract brain neon'].map((keyword, i) => (
                  <span key={i} className="bg-fuchsia-500/10 text-fuchsia-200 px-3.5 py-1.5 rounded-lg text-sm border border-fuchsia-500/20 font-medium tracking-wide">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
          <h2 className="text-xl font-bold mb-6 text-zinc-100 text-center">الأدوات المجانية المقترحة</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-[#09090b]/60 p-5 rounded-2xl border border-zinc-800/50 text-center hover:border-violet-500/30 transition-colors group">
              <h3 className="font-bold text-violet-400 mb-2 group-hover:text-violet-300 transition-colors">الصوت (TTS)</h3>
              <p className="text-sm text-zinc-400">CapCut (Trickster voice)<br/>أو ElevenLabs (Free)</p>
            </div>
            <div className="bg-[#09090b]/60 p-5 rounded-2xl border border-zinc-800/50 text-center hover:border-cyan-500/30 transition-colors group">
              <h3 className="font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">الفيديو (Visuals)</h3>
              <p className="text-sm text-zinc-400">Pexels, Pixabay<br/>Mixkit</p>
            </div>
            <div className="bg-[#09090b]/60 p-5 rounded-2xl border border-zinc-800/50 text-center hover:border-fuchsia-500/30 transition-colors group">
              <h3 className="font-bold text-fuchsia-400 mb-2 group-hover:text-fuchsia-300 transition-colors">المونتاج (Editing)</h3>
              <p className="text-sm text-zinc-400">CapCut<br/>(Auto-captions & Effects)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
