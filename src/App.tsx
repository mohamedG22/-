/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, CheckCircle, Video, Mic, Scissors, Sparkles } from 'lucide-react';

export default function App() {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8 border-b border-slate-800">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">صانع الفيديوهات القصيرة (Faceless)</h1>
          <p className="text-slate-400 text-lg">خطة عمل كاملة لإنشاء فيديو "علم النفس المظلم" للسوق الغربي</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Script Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Mic className="w-5 h-5 text-indigo-400" />
                السكريبت (إنجليزي)
              </h2>
              <button
                onClick={() => copyToClipboard(script, setCopiedScript)}
                className="text-sm flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                dir="ltr"
              >
                {copiedScript ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copiedScript ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed" dir="ltr">
                {script}
              </pre>
            </div>
          </div>

          {/* Prompts & Keywords */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-400" />
                  برومبت الذكاء الاصطناعي
                </h2>
                <button
                  onClick={() => copyToClipboard(prompt, setCopiedPrompt)}
                  className="text-sm flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                  dir="ltr"
                >
                  {copiedPrompt ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copiedPrompt ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-sm text-slate-300 font-mono leading-relaxed" dir="ltr">
                  {prompt}
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Scissors className="w-5 h-5 text-pink-400" />
                كلمات بحث للقطات المجانية (Pexels)
              </h2>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {['Confident man walking', 'Clock ticking macro', 'Intense eye contact', 'Boss sitting', 'Abstract brain neon'].map((keyword, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6">الأدوات المجانية المقترحة</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <h3 className="font-bold text-indigo-400 mb-2">الصوت (TTS)</h3>
              <p className="text-sm text-slate-400">CapCut (Trickster voice) أو ElevenLabs (Free)</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <h3 className="font-bold text-purple-400 mb-2">الفيديو (Visuals)</h3>
              <p className="text-sm text-slate-400">Pexels, Pixabay, Mixkit</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <h3 className="font-bold text-pink-400 mb-2">المونتاج (Editing)</h3>
              <p className="text-sm text-slate-400">CapCut (Auto-captions & Effects)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
