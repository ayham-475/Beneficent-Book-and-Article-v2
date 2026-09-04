import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  ArrowLeft, 
  Search, 
  PenTool, 
  ShieldCheck, 
  TrendingUp, 
  Users,
  CheckCircle2
} from 'lucide-react';

const MainHomeHero = () => {
  const [searchType, setSearchType] = useState('all'); // 'all' | 'books' | 'articles'
  const [query, setQuery] = useState('');

  // أنيميشن الظهور المتتابع
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (

    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white pt-24 pb-16">
      
      {/* 1. الخلفية الإبداعية والشبكة الضوئية (Cinematic Grid Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* خلفية معتمة بنمط شبكة هندسية */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* بقع الإضاءة المتوهجة */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[70vw] h-[35vw] max-w-[800px] bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-amber-500/20 blur-[140px] rounded-full" />
        <div className="absolute top-[35%] right-[10%] w-[25vw] h-[25vw] max-w-[350px] bg-amber-500/15 blur-[100px] rounded-full animate-pulse" />
      </div>

      {/* 2. البطاقات الزجاجية العائمة (Floating Glass Status Cards) */}
      
      {/* بطاقة عائمة يمين: المقالات المتميزة */}
      <motion.div 
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute top-[28%] right-[4%] z-20 items-center gap-3.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl shadow-black/50 max-w-xs"
      >
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
          <FileText size={22} />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[11px] text-blue-400 font-bold mb-0.5">
            <TrendingUp size={12} /> مقال اليوم الأكثر قراءة
          </div>
          <h4 className="text-xs font-bold text-white line-clamp-1">مستقبل الذكاء الاصطناعي في التعليم</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">بقلم د. أيهم العتيبي • ٥ دقائق قراءة</p>
        </div>
      </motion.div>

      {/* بطاقة عائمة يسار: النشر الموثوق */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden xl:flex absolute bottom-[28%] left-[4%] z-20 items-center gap-3.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-4 rounded-2xl shadow-2xl shadow-black/50 max-w-xs"
      >
        <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
          <PenTool size={22} />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold mb-0.5">
            <ShieldCheck size={12} /> مجتمع المبدعين
          </div>
          <h4 className="text-xs font-bold text-white">+٥,٠٠٠ كاتب ومؤلف</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">ينشرون المعرفة يومياً عبر المنصة</p>
        </div>
      </motion.div>

      {/* 3. المحتوى الرئيسي المقسّم سردياً */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center max-w-5xl"
      >

        {/* الشارة العلوية (Top Pill Badge) */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/15 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Sparkles size={16} className="text-amber-400 animate-spin-slow" />
          <span className="text-gray-200 text-xs sm:text-sm font-semibold tracking-wide">
            منصة النشر الرقمي والمعرفة التفاعلية الأولى
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </motion.div>

        {/* العنوان الرئيسي الهادف والعميق */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.15] mb-6"
        >
          اصنع أثرك الفكري.. واكتشف <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500">
            عمق المعرفة
          </span> في مكان واحد
        </motion.h1>

        {/* النص الوصفي المحفز للقراءة والنشر */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mb-10 font-normal leading-relaxed opacity-90"
        >
          الوجهة العربية المتكاملة التي تجمع بين <strong className="text-white font-semibold">المكتبات الرقمية الشاملة</strong> و<strong className="text-white font-semibold">المقالات الفكرية المتميزة</strong>. ابحث، اقرأ، أو انشر نتاجك الأدبي والعلمي ليصل إلى الملايين.
        </motion.p>

        {/* 4. محرك البحث التفاعلي المزدوج (Unified Smart Search) */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-2xl mb-10"
        >
          {/* تبويب نوع البحث (كتب / مقالات / الكل) */}
          <div className="flex items-center justify-center gap-2 mb-3">
            {[
              { id: 'all', label: 'الكل', icon: Search },
              { id: 'books', label: 'الكتب', icon: BookOpen },
              { id: 'articles', label: 'المقالات', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchType(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  searchType === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                <tab.icon size={13} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* صندوق الإدخال */}
          <div className="relative group p-1.5 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-within:border-amber-400/60 focus-within:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300">
            <div className="flex items-center gap-2 bg-[#020617]/90 rounded-xl p-2">
              <div className="pr-3 pl-1 text-amber-400">
                <Search size={22} />
              </div>
              
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchType === 'books' 
                    ? 'ابحث عن اسم كتاب، مؤلف، أو دار نشر...' 
                    : searchType === 'articles'
                    ? 'ابحث عن عنوان مقال، فكرة، أو كاتب...'
                    : 'ابحث في الكتب والمقالات وأسماء الناشرين...'
                }
                className="w-full bg-transparent border-none outline-none text-white text-sm md:text-base placeholder:text-gray-500 py-2.5 font-medium"
              />

              <button 
                type="button"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 px-6 sm:px-8 py-3 rounded-xl font-black text-sm sm:text-base transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 shrink-0"
              >
                <span>بحث</span>
                <ArrowLeft size={18} className="rotate-180 hidden sm:block" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 5. أزرار الدعوة للإجراء المزدوجة (Dual Core CTAs) */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12"
        >
          <a
            href="#register"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <PenTool size={19} />
            <span>ابدأ النشر والتأليف</span>
          </a>

          <a
            href="#explore"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 backdrop-blur-md"
          >
            <BookOpen size={19} className="text-amber-400" />
            <span>استكشف المكتبة</span>
          </a>
        </motion.div>

        {/* 6. شريط ضمان الثقة والإحصائيات (Social Proof Stats) */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-white/10 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-white">+٥٠,٠٠٠</span>
            <span className="text-xs text-gray-400 font-medium mt-1">كتاب ومقال رقمي</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">+١٠٠,٠٠٠</span>
            <span className="text-xs text-gray-400 font-medium mt-1">قارئ وكاتب نشط</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-white">+٥,٠٠٠</span>
            <span className="text-xs text-gray-400 font-medium mt-1">ناشر ومؤلف موثق</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-center gap-1">
              ١٠٠٪ <CheckCircle2 size={18} />
            </span>
            <span className="text-xs text-gray-400 font-medium mt-1">وصول مجاني وسلس</span>
          </div>
        </motion.div>

      </motion.div>

      {/* التدرج السفلي */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020617] to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default MainHomeHero;