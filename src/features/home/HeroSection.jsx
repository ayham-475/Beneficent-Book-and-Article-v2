import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, ArrowLeft, GraduationCap } from 'lucide-react';

const HeroSectionFixed = () => {
  return (
    <div className="relative h-auto pt-29 py-[10vw] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a] px-[4vw] text-white font-sans" dir="rtl">
      
      {/* 1. الخلفية والنجوم */}
     <div className="absolute inset-0 opacity-40 pointer-events-none" 
     style={{ 
       backgroundImage: 'url("https://cdnjs.cloudflare.com/ajax/libs/subtlepatterns/4.1.2/stardust.png")',
       backgroundRepeat: 'repeat'
     }}></div>
      
      {/* توهجات النيون الخلفية */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/20 blur-[10vw] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-600/10 blur-[10vw] rounded-full animate-pulse delay-500"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-row items-center justify-between gap-[5vw]">
          
          {/* المكون الأيمن: المحتوى النصي (55% من العرض) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[55%] text-right space-y-[2.5vw]"
          >
            {/* شارة الترحيب - خط عريض وواضح */}
            <div className="inline-flex items-center gap-[1.5vw] px-[2vw] py-[0.8vw] rounded-full bg-blue-500/10   border border-blue-500/20 text-blue-400 text-[1.2vw] lg:text-sm font-black tracking-wide">
              <Sparkles size={"1.5vw"} className="text-blue-400" />
              <span>محتوى شيق وموثوق للمتخصصين</span>
            </div>

            {/* العنوان الرئيسي - حجم كبير جداً وواضح */}
            <h1 className="text-[3.8vw] lg:text-7xl font-extrabold text-white leading-[1.1]">
              منصة اليعري <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-500">
                للتعليم والتطوير
              </span>
            </h1>

            {/* الوصف - وزن متوسط لزيادة الوضوح */}
            <p className="text-gray-300 text-[2vw] lg:text-xl leading-relaxed max-w-[90%] font-medium">
              منصتك الرائدة لتطوير مهاراتك الفكرية والمهنية. انضم إلينا اليوم لتبدأ رحلة المعرفة التي لا تتوقف.
            </p>

            {/* الأزرار - أحجام ثابتة النسبة */}
            <div className="flex flex-row items-center gap-[2vw] justify-start pt-[2vw]">
              <button className="px-[2.5vw] py-[1vw] bg-blue-600 hover:bg-blue-500 text-white rounded-[1.2vw] font-black text-[1.8vw] lg:text-lg transition-all flex items-center gap-[1vw] whitespace-nowrap shadow-lg shadow-blue-600/20">
                <span>ابدأ رحلتك الآن</span>
                <ArrowLeft size={"2vw"} />
              </button>
              
              <button className="px-[3.5vw] py-[1vw] bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[1.2vw] font-black text-[1.8vw] lg:text-lg whitespace-nowrap">
                تصفح المزيد
              </button>
            </div>
          </motion.div>

          {/* المكون الأيسر: الشعار البرمجي المطور والمدارات (45% من العرض) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-[45%] relative flex justify-center items-center h-[40vw]"
          >
            {/* هالة الضوء المركزية */}
            <div className="absolute w-[35vw] h-[35vw] bg-blue-500/30 blur-[8vw] rounded-full animate-slow-glow"></div>
            
            {/* 🌟 هيكل الشعار البرمجي المحفز (المدمج كلياً بالصفحة) */}
            <motion.div 
              className="relative z-20 w-[24vw] h-[24vw] rounded-[4vw] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-500/40 shadow-2xl shadow-blue-500/50 flex flex-col items-center justify-center p-[2vw] overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* تأثير خطوط النيون المتقاطعة خلف الشعار */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2vw_2vw] opacity-30" />
              
              {/* أيقونة التخرج والتطوير الكبرى المشعة */}
              <div className="relative p-[1.5vw] bg-blue-500/10 border border-blue-400/30 rounded-3xl mb-[1vw] shadow-inner shadow-blue-400/20">
                <GraduationCap size={"7vw"} className="text-blue-400 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse" />
                {/* شرارة المعرفة الطافية */}
                <Sparkles size={"2.5vw"} className="text-blue-200 absolute -top-1 -right-1 animate-bounce" />
              </div>

              {/* الاسم المصغر والشعار اللفظي التحفيزي */}
              <span className="text-[2.2vw] font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                AL-YAARI
              </span>
              <p className="text-[1.1vw] text-blue-400/80 font-bold uppercase tracking-widest mt-[0.5vw]">
                ELEVATE YOUR MIND
              </p>
            </motion.div>

            {/* المدارات وأيقونات المستخدمين - مقاسات vw دقيقة */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* المدار الكبير */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[42vw] h-[42vw] rounded-full border border-blue-400/10"
              >
                <div className="absolute w-[3.5vw] h-[3.5vw] bg-[#1e293b] border border-blue-400/40 rounded-full flex items-center justify-center top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/30">
                  <User size={"2vw"} className="text-blue-300" />
                </div>
              </motion.div>

              {/* المدار الصغير */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[25vw] h-[25vw] rounded-full border border-purple-400/10"
              >
                <div className="absolute w-[2.8vw] h-[2.8vw] bg-[#1e293b] border border-purple-400/40 rounded-full flex items-center justify-center top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-purple-500/30">
                  <User size={"1.5vw"} className="text-purple-300" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSectionFixed;