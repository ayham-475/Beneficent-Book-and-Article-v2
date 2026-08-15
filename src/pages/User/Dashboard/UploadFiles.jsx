import React, { useState } from 'react';
import { 
  UploadCloud, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './SlideBar';
import Footer from '../../../App/Public/Layout/Fotter';
import TopHeader from './TopHeader';
function UploadFiles() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // وظيفة التعامل مع السحب والإفلات لزيادة التفاعلية
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <>
    <Sidebar />
    <TopHeader />
    <div className="min-h-screen mt-10 bg-[#E0E5EC] flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="max-w-3xl w-full">
        
        {/* شريط التقدم العلوي المنحوت */}
        <div className="neumorphic-card p-6 mb-10 flex items-center justify-between shadow-neumorphic-soft">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <CheckCircle2 size={24} />
             </div>
             <div>
                <h4 className="font-black text-gray-700">بيانات المحتوى</h4>
                <p className="text-[10px] text-emerald-600 font-bold uppercase">مكتملة بنجاح</p>
             </div>
          </div>
          <div className="h-[2px] flex-1 bg-gray-300 mx-6 shadow-inner"></div>
          <div className="flex items-center gap-4 opacity-100">
             <div className="w-12 h-12 bg-[#319795] rounded-2xl flex items-center justify-center text-white shadow-[#319795]/40 shadow-xl animate-pulse">
                <UploadCloud size={24} />
             </div>
             <div>
                <h4 className="font-black text-[#319795]">رفع الملفات</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase">الخطوة النهائية</p>
             </div>
          </div>
        </div>

        <div className="neumorphic-card p-10 md:p-16 text-center shadow-neumorphic-soft">
          {/* منطقة الرفع الإبداعية */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            className={`
              relative border-4 border-dashed rounded-[3.5rem] p-16 transition-all duration-500 group
              ${dragActive ? 'border-[#319795] bg-[#319795]/5 scale-[0.98]' : 'border-gray-300 bg-transparent'}
            `}
          >
            <div className="relative z-10">
              <div className={`
                w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto mb-8 transition-all duration-700
                ${dragActive ? 'bg-[#319795] text-white rotate-180 scale-110' : 'bg-[#E0E5EC] text-[#319795] shadow-neumorphic-card'}
              `}>
                <UploadCloud size={56} strokeWidth={1.5} className={dragActive ? 'animate-bounce' : ''} />
              </div>
              
              <h3 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">
                {dragActive ? 'أفلت الملف الآن!' : 'اسحب عملك الإبداعي هنا'}
              </h3>
              <p className="text-gray-500 font-medium mb-6">
                يدعم الملفات من نوع <span className="text-[#319795] font-bold">PDF, ZIP, MP4</span>
              </p>
              
              <button className="neumorphic-button-primary bg-white text-[#319795] hover:text-white hover:bg-[#319795] px-10 py-4 max-w-xs mx-auto">
                اختيار ملف من الجهاز
              </button>
            </div>

            {/* زخرفة خلفية للمنطقة */}
            <div className="absolute top-4 left-4 opacity-10 text-gray-400"><ShieldCheck size={40}/></div>
            <div className="absolute bottom-4 right-4 opacity-10 text-gray-400"><Zap size={40}/></div>
          </div>

          {/* نصائح الأمان */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
               <CheckCircle2 size={14} className="text-emerald-500"/> تشفير عالي الخصوصية
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
               <CheckCircle2 size={14} className="text-emerald-500"/> فحص تلقائي من الفيروسات
            </div>
          </div>

          {/* أزرار التحكم السفلى */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-6">
            <Link to="/AddDataContent">
              <button className="neumorphic-button-ghost group flex items-center gap-3 text-gray-500">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                العودة للتعديل
              </button>
            </Link>

            <button className="neumorphic-button-primary bg-gradient-to-br from-[#319795] to-[#285E61] text-white py-5 px-14 text-lg shadow-xl shadow-[#319795]/30">
               اعتماد ونشر العمل الآن
            </button>
          </div>
        </div>

        {/* تذييل الصفحة - إشعار حقوق */}
        <p className="text-center mt-8 text-gray-400 text-xs font-medium uppercase tracking-[0.3em]">
          Secure Content Distribution System © 2026
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default UploadFiles;