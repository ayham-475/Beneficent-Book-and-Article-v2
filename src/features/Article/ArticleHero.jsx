import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Send } from 'lucide-react';

const ArticleHero = () => {
  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      
      {/* 1. الخلفية (Cinematic Background) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-[#020617] z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 scale-105"
          alt="Library background"
        />
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[80px] rounded-full"></div>
      </div>

      {/* 2. المحتوى (Main Content) */}
      <div className="relative z-20 container mx-auto px-[5vw] text-center flex flex-col items-center">
        
        {/* شارة علوية أصغر في الجوال */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full mb-4 md:mb-8"
        >
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-gray-300 text-[3vw] md:text-base font-medium">أكبر منصة للمقالات العربية</span>
        </motion.div>

        {/* العنوان - تقليل الحجم والتباعد في الجوال */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9vw] md:text-[5.5vw] font-black text-white leading-[1.1] mb-4 md:mb-6"
        >
          عالم من <span className=" bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">الأفكار</span> <br/> بانتظارك
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-[3.8vw] md:text-[1.4vw] max-w-[85vw] md:max-w-[50vw] mb-8 md:mb-12 font-medium leading-relaxed"
        >
          ابحث عن المعرفة في أعماق المقالات الأكثر إبداعاً.
        </motion.p>

        {/* 3. حقل البحث المطوّر (The Responsive Search) */}
        <motion.div 
          className="relative w-full max-w-[90vw] md:max-w-[45vw] group"
        >
          {/* شادو خفيف جداً عند الفوكس */}
          <div className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-1.5 focus-within:border-blue-500/40 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300">
            <div className="p-3 text-gray-400">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="عن ماذا تبحث؟"
              className="w-full bg-transparent border-none outline-none text-white text-[4vw] md:text-[1.1vw] placeholder:text-gray-500 py-2"
            />
            {/* زر البحث: أيقونة في الموبايل ونص في الكمبيوتر */}
            <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 md:px-8 md:py-3 rounded-xl font-bold transition-all flex items-center justify-center">
              <span className="hidden md:block">ابحث</span>
              <Send size={18} className="md:hidden" />
            </button>
          </div>
          
          {/* الكلمات الدلالية - موزعة بشكل أفضل */}
          <div className="flex flex-wrap justify-center gap-2 mt-5 md:mt-6">
            {['فلسفة', 'تقنية', 'أدب'].map((tag, i) => (
              <span key={i} className="text-[3vw] md:text-[0.9vw] text-gray-400 border border-white/10 rounded-lg px-3 py-1 bg-white/5 active:bg-blue-600/20 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* تدرج سفلي لدمج الهيرو مع ما بعده */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#020617] to-transparent z-30"></div>
    </section>
  );
};

export default ArticleHero;