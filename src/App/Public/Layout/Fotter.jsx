import React from 'react';
import { ShieldCheck, Globe, Mail, Anchor } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/5 relative overflow-hidden" dir="rtl">
      {/* حاوية الفوتر - تقليل py من 12 إلى 6 في الكمبيوتر و 8 في الموبايل */}
      <div className="container mx-auto py-8 md:py-6 px-[4vw] relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          {/* 1. الشعار - حجم أصغر وأكثر رشاقة */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              منصة اليعري <span className="text-blue-500">.</span>
            </span>
          </motion.div>

          {/* 2. الروابط - عرض أفقي حتى في الموبايل لتقليل الارتفاع */}
          <div className="flex items-center justify-center gap-x-6 md:gap-x-10 text-gray-400">
            <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition-all text-[3vw] md:text-[0.9vw] font-bold">
              <ShieldCheck size={14} className="text-blue-500/50" /> الخصوصية
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition-all text-[3vw] md:text-[0.9vw] font-bold">
              <Globe size={14} className="text-blue-500/50" /> الشروط
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition-all text-[3vw] md:text-[0.9vw] font-bold">
              <Mail size={14} className="text-blue-500/50" /> اتصل بنا
            </a>
          </div>

          {/* 3. الحقوق - حجم خط أصغر لتقليل التشتت */}
          <div className="text-gray-500 text-[2.8vw] md:text-[0.85vw] font-medium border-t border-white/5 md:border-none pt-4 md:pt-0 w-full md:w-auto text-center">
            &copy; {new Date().getFullYear()} 
            <span className="text-white mx-1 font-bold">مداد</span> 
            <span className="hidden md:inline">• جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </div>

      {/* لمسة الإضاءة الزرقاء المتناسقة */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-blue-600 blur-[20px] opacity-20"></div>
    </footer>
  );
}

export default Footer;