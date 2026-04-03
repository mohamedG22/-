/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, XCircle, Loader2, Briefcase, AlertCircle } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface AnalysisResult {
  hasRequiredExperience: boolean;
  yearsOfMarketingExperience: number;
  summary: string;
}

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError('الرجاء إدخال نص السيرة الذاتية أولاً.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `قم بتحليل السيرة الذاتية التالية بدقة. 
        المهمة: تحديد ما إذا كان المرشح يمتلك خبرة عمل تبلغ 3 سنوات أو أكثر تحديداً في مجال "التسويق" (Marketing).
        
        السيرة الذاتية:
        ${resumeText}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hasRequiredExperience: {
                type: Type.BOOLEAN,
                description: 'True if the candidate has 3 or more years of experience specifically in Marketing, otherwise False.',
              },
              yearsOfMarketingExperience: {
                type: Type.NUMBER,
                description: 'The total calculated years of experience in Marketing based on the resume.',
              },
              summary: {
                type: Type.STRING,
                description: 'A brief summary (in Arabic) explaining how the years of experience were calculated and the final decision.',
              },
            },
            required: ['hasRequiredExperience', 'yearsOfMarketingExperience', 'summary'],
          },
        },
      });

      if (response.text) {
        const data = JSON.parse(response.text) as AnalysisResult;
        setResult(data);
      } else {
        throw new Error('لم يتم استلام رد صالح من الخادم.');
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء تحليل السيرة الذاتية. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-2xl mb-2 text-blue-600">
            <Briefcase className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            نظام فحص السير الذاتية
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            أداة ذكية مدعومة بالذكاء الاصطناعي للتحقق من مطابقة المرشحين لشرط: <br/>
            <span className="font-semibold text-blue-600">"خبرة 3 سنوات على الأقل في مجال التسويق"</span>
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <FileText className="w-5 h-5 text-slate-500" />
            <h2 className="text-lg font-semibold text-slate-800">إدخال السيرة الذاتية</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-500">
              قم بنسخ ولصق محتوى السيرة الذاتية للمرشح هنا ليتم تحليلها فوراً.
            </p>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="الصق نص السيرة الذاتية هنا (الخبرات السابقة، التواريخ، المسميات الوظيفية...)"
              className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
              dir="auto"
            />
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري التحليل بالذكاء الاصطناعي...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  تحليل السيرة الذاتية
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className={`border-2 rounded-2xl p-6 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-4 ${
            result.hasRequiredExperience 
              ? 'bg-emerald-50 border-emerald-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full shrink-0 ${
                result.hasRequiredExperience ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
              }`}>
                {result.hasRequiredExperience ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className={`text-2xl font-bold ${
                  result.hasRequiredExperience ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {result.hasRequiredExperience ? 'مرشح مقبول' : 'مرشح غير مطابق'}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-700 bg-white/60 inline-flex px-3 py-1.5 rounded-lg border border-slate-200/50">
                  <span className="font-medium">سنوات الخبرة في التسويق:</span>
                  <span className="font-bold text-lg">{result.yearsOfMarketingExperience} سنوات</span>
                </div>
                
                <p className="text-slate-700 leading-relaxed mt-2">
                  {result.summary}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
