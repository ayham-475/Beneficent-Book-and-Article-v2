import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, BookOpen, Star, ArrowLeft, Flame, Compass, BookmarkCheck, TrendingUp } from 'lucide-react';

const BookHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // أنيميشن ظهور العناصر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white pt-10 pb-16">
      
      {/* 1. خلفية جذابة وواضحة (Aesthetic & Clear Background) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* صورة مكتبة دافئة مع حركة زوم خفيفة جداً */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-45 brightness-90 contrast-110"
          alt="Warm Aesthetic Library"
        />

        {/* تدرج متوازن: يضمن وضوح الصورة في المنتصف مع حماية قراءة النصوص */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/30 to-[#020617] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-[#020617]/80 z-10" />

        {/* إضاءة ذهبية وبنفسجية دافئة تعزز جمال الصورة */}
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] max-w-[400px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-[15%] left-[15%] w-[35vw] h-[35vw] max-w-[450px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none z-10" />
      </div>

      {/* 2. بطاقات عائمة محفزة للقراءة (Desktop Floating Cards) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-[22%] right-[5%] z-20 items-center gap-3 bg-[#020617]/60 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-xl shadow-amber-950/20"
      >
        <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400">
          <BookmarkCheck size={22} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-300 font-medium">الأكثر قراءة اليوم</p>
          <p className="text-sm font-bold text-white">رواية "قواعد العشق الأربع"</p>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:flex absolute bottom-[22%] left-[5%] z-20 items-center gap-3 bg-[#020617]/60 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl shadow-xl shadow-indigo-950/20"
      >
        <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400">
          <TrendingUp size={22} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-300 font-medium">مجتمع القرّاء</p>
          <p className="text-sm font-bold text-white">+12,000 مناقشة كتاب</p>
        </div>
      </motion.div>

      {/* 3. المحتوى الرئيسي (Main Content) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center max-w-5xl"
      >
        
        {/* شارة ترحيبية ملفتة */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 shadow-lg shadow-black/20">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-gray-100 text-xs sm:text-sm font-semibold">
            وجهتك الأولى لاكتشاف ملاذ القراءة
          </span>
        </motion.div>

        {/* العنوان الرئيسي بألوان دافئة ومحفزة */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15] mb-6 drop-shadow-md"
        >
          اختر كتابك القادم، وابدأ <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400">
            رحلة بين الصفحات
          </span>
        </motion.h1>

        {/* النص الوصفي */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mb-8 font-medium leading-relaxed drop-shadow-sm"
        >
          آلاف الكتب والأعمال الأدبية بانتظارك. ابحث في أكبر مكتبة عربية رقمية واستمتع بتجربة قراءة لا تُنسى.
        </motion.p>

        {/* 4. حقل بحث بارز وعالي التباين (High Visibility Search Bar) */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-xl md:max-w-2xl mb-8"
        >
          <div className="relative group p-1.5 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 focus-within:border-amber-400/60 focus-within:shadow-[0_0_35px_rgba(245,158,11,0.25)]">
            <div className="flex items-center gap-2 bg-[#020617]/85 rounded-xl p-2 border border-white/5">
              
              <div className="pr-3 pl-1 text-amber-400">
                <Search size={24} />
              </div>

              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم الكتاب، اسم الكاتب، أو الموضوع..."
                className="w-full bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-gray-400 py-2.5 font-medium"
              />

              <button 
                type="button"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 shrink-0"
              >
                <span>ابحث الآن</span>
                <ArrowLeft size={18} className="rotate-180 hidden sm:block" />
              </button>

            </div>
          </div>

          {/* اقتراحات بحث سريعة */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs sm:text-sm text-gray-300">
            <span className="flex items-center gap-1 text-amber-400/90 font-medium ml-1">
              <Flame size={14} /> الأكثر طلباً:
            </span>
            {[
              'روايات تشويق', 
              'تنمية بشرية', 
              'كتب تاريخية', 
              'علم النفس'
            ].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(tag)}
                className="hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg px-3 py-1.5 transition-all duration-200 backdrop-blur-md active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 5. شريط إحصائيات الجوال السريع */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 w-full max-w-lg border-t border-white/15 pt-6 mt-2 text-center lg:hidden"
        >
          <div>
            <h4 className="text-xl font-black text-white">+50K</h4>
            <p className="text-xs text-gray-300 mt-0.5">كتاب متوفر</p>
          </div>
          <div className="border-x border-white/15">
            <h4 className="text-xl font-black text-white">+100K</h4>
            <p className="text-xs text-gray-300 mt-0.5">قارئ شغوف</p>
          </div>
          <div>
            <h4 className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
              4.9 <Star size={14} fill="currentColor" />
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">تقييم الكتب</p>
          </div>
        </motion.div>

      </motion.div>

      {/* تدرج سفلي لدمج الهيرو بسلاسة مع الأجزاء التالية */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#020617] to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default BookHero;