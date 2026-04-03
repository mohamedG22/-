/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, XCircle, Loader2, Briefcase, AlertCircle, X, FileUp } from 'lucide-react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setSelectedFile(file);
        setFileData(base64);
        setResumeText(''); // Clear text if PDF is uploaded
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target?.result as string);
        setSelectedFile(null);
        setFileData(null);
      };
      reader.readAsText(file);
    } else {
      setError('عذراً، ندعم فقط ملفات PDF والنصوص (TXT).');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileData(null);
  };

  const analyzeResume = async () => {
    if (!resumeText.trim() && !selectedFile) {
      setError('الرجاء إدخال نص السيرة الذاتية أو رفع ملف أولاً.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      let contents: any;
      
      if (selectedFile && fileData) {
        contents = {
          parts: [
            { text: `قم بتحليل السيرة الذاتية المرفقة بدقة. 
            المهمة: تحديد ما إذا كان المرشح يمتلك خبرة عمل تبلغ 3 سنوات أو أكثر تحديداً في مجال "التسويق" (Marketing).` },
            { inlineData: { mimeType: selectedFile.type, data: fileData } }
          ]
        };
      } else {
        contents = `قم بتحليل السيرة الذاتية التالية بدقة. 
        المهمة: تحديد ما إذا كان المرشح يمتلك خبرة عمل تبلغ 3 سنوات أو أكثر تحديداً في مجال "التسويق" (Marketing).
        
        السيرة الذاتية:
        ${resumeText}`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
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
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-2xl mb-2 text-blue-600 shadow-sm">
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
          <div className="p-6 space-y-6">
            
            {/* Drag & Drop Zone */}
            {!selectedFile ? (
              <div 
                onDragOver={onDragOver} 
                onDragLeave={onDragLeave} 
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <FileUp className={`w-12 h-12 mx-auto mb-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
                <h3 className="text-lg font-medium text-slate-700 mb-1">اضغط هنا لرفع ملف أو اسحب وأفلت السيرة الذاتية</h3>
                <p className="text-slate-500 text-sm mb-6">ندعم ملفات PDF و TXT</p>
                
                <div className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm font-medium transition-all hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200">
                  <Upload className="w-4 h-4" />
                  تصفح الملفات
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.txt" 
                  onChange={handleFileUpload} 
                  ref={fileInputRef}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800" dir="ltr">{selectedFile.name}</p>
                    <p className="text-sm text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={clearFile} 
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="إزالة الملف"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Text Area Alternative */}
            {!selectedFile && (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-sm font-medium text-slate-400">أو</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <p className="text-sm font-medium text-slate-700">قم بلصق النص مباشرة:</p>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="الصق نص السيرة الذاتية هنا (الخبرات السابقة، التواريخ، المسميات الوظيفية...)"
                  className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-slate-700 leading-relaxed"
                  dir="auto"
                />
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={isAnalyzing || (!resumeText.trim() && !selectedFile)}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  جاري التحليل بالذكاء الاصطناعي...
                </>
              ) : (
                <>
                  <Briefcase className="w-6 h-6" />
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
