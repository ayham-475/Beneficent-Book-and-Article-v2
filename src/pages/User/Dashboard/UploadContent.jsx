import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, FileText, Book, Image as ImageIcon, 
  CheckCircle2, ArrowLeft, ArrowRight, Sparkles 
} from 'lucide-react';
import AddDataContent from './AddDataContent';

const UploadContent = () => {
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState(null); // 'BOOK' or 'ARTICLE'

  function changesetStep(step) {
    setStep(step);
  }

  return (
    // أضفت mx-4 لضمان وجود مسافة في الجوال وعدم التصاق الكرت بحواف الشاشة
    <div className="max-w-4xl mx-4 md:mx-auto bg-white/70 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] border border-white/80 shadow-[0_32px_64px_-12px_rgba(49,151,149,0.1)] overflow-hidden transition-all duration-500 mb-10">
      
      {/* مؤشر الخطوات العلوي - جعلته متجاوباً (تغيير الـ Padding والمسافات) */}
      <div className="flex flex-row items-center justify-between p-6 md:p-10 bg-gradient-to-r from-[#F0FDFA] to-white border-b border-[#E6FFFA]">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center gap-2 md:gap-3 flex-1 justify-center last:flex-none">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center text-sm md:text-base font-black transition-all ${
              step >= num ? 'bg-[#319795] text-white shadow-lg shadow-[#319795]/30 scale-105 md:scale-110' : 'bg-white text-gray-300 border border-gray-100'
            }`}>
              {step > num ? <CheckCircle2 size={18} /> : num}
            </div>
            {/* إخفاء النص في الجوال الصغير جداً للحفاظ على المساحة */}
            <span className={`hidden sm:block text-[10px] md:text-xs font-black uppercase tracking-widest ${step >= num ? 'text-[#319795]' : 'text-gray-300'}`}>
              {num === 1 ? 'النوع' : num === 2 ? 'التفاصيل' : 'الرفع'}
            </span>
            {/* جعل الخط الفاصل يتصاغر في الجوال */}
            {num < 3 && <div className={`flex-1 max-w-[50px] md:w-20 h-[2px] mx-1 md:mx-2 rounded-full ${step > num ? 'bg-[#319795]' : 'bg-gray-100'}`} />}
          </div>
        ))}
      </div>

      <div className="p-6 md:p-12">
        {/* الخطوة الأولى: اختيار النوع */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-xl md:text-3xl font-black text-gray-800 flex items-center justify-center gap-2 md:gap-3">
                ماذا تريد أن تنشر اليوم؟ <Sparkles className="text-[#319795]" size={24} />
              </h2>
              <p className="text-sm md:text-gray-400 font-bold mt-2">اختر نوع المحتوى لفتح الأدوات المخصصة له</p>
            </div>
            
            {/* جعل الشبكة (Grid) عمود واحد في الجوال وعمودين في الحاسوب */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <Link to='/AddDataContent' className="block">
                <div 
                  onClick={() => { setContentType('BOOK'); setStep(2); }}
                  className={`group p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all cursor-pointer text-center h-full ${
                    contentType === 'BOOK' ? 'border-[#319795] bg-[#F0FDFA]' : 'border-gray-50 bg-white hover:border-[#319795]/30'
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E6FFFA] rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <Book size={32} className="text-[#319795] md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-gray-800">كتاب رقمي</h3>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">PDF, EPUB, ZIP</p>
                </div>
              </Link>

              <Link to='/ArticleEditor' className="block">
                <div 
                  onClick={() => { setContentType('ARTICLE'); setStep(2); }}
                  className={`group p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all cursor-pointer text-center h-full ${
                    contentType === 'ARTICLE' ? 'border-[#319795] bg-[#F0FDFA]' : 'border-gray-50 bg-white hover:border-[#319795]/30'
                  }`}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E6FFFA] rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <FileText size={32} className="text-[#319795] md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-gray-800">مقالة احترافية</h3>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">HTML, Markdown, Text</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* الخطوة الثانية: إدخال البيانات (سيتم استدعاء AddDataContent هنا) */}
      </div>
    </div>
  );
};

export default UploadContent;