import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, Zap, BookOpen, PenTool, Globe, 
  BrainCircuit, Rocket, Palette, Landmark 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCategoriesElite = () => {
  const categories = [
    { n: "ما وراء الطبيعة", i: <Zap />, c: "from-purple-500", shadow: "shadow-purple-500/20", glow: "group-hover:shadow-purple-500/40" },
    { n: "فلسفة العقل", i: <BrainCircuit />, c: "from-blue-500", shadow: "shadow-blue-500/20", glow: "group-hover:shadow-blue-500/40" },
    { n: "أسرار التاريخ", i: <Landmark />, c: "from-amber-500", shadow: "shadow-amber-500/20", glow: "group-hover:shadow-amber-500/40" },
    { n: "تكنولوجيا المستقبل", i: <Rocket />, c: "from-cyan-500", shadow: "shadow-cyan-500/20", glow: "group-hover:shadow-cyan-500/40" },
    { n: "أدب وفنون", i: <Palette />, c: "from-pink-500", shadow: "shadow-pink-500/20", glow: "group-hover:shadow-pink-500/40" },
    { n: "أدب المهجر", i: <PenTool />, c: "from-emerald-500", shadow: "shadow-emerald-500/20", glow: "group-hover:shadow-emerald-500/40" },
    { n: "الجيوسياسة", i: <Globe />, c: "from-red-500", shadow: "shadow-red-500/20", glow: "group-hover:shadow-red-500/40" },
    { n: "علوم إنسانية", i: <BookOpen />, c: "from-indigo-500", shadow: "shadow-indigo-500/20", glow: "group-hover:shadow-indigo-500/40" },
  ];

  return (
    <section className="py-[0vw] md:py-[8vw] px-[4vw] bg-[#020617]" dir="rtl">
      {/* عنوان القسم */}
      <div className="flex flex-col mb-[10vw] md:mb-[5vw]">
        <h2 className="text-[8vw] md:text-[4vw] font-black text-white leading-none">
          استكشف <span className="text-blue-500">العوالم</span>
        </h2>
        <div className="h-[4px] w-[18vw] bg-blue-600 mt-4 rounded-full"></div>
      </div>

      {/* حاوية السلايدر */}
      <div className="relative">
     <Link to='/CategoriesArticle'>   <div 
          className="flex flex-row gap-[5vw] md:gap-[3vw] overflow-x-auto scroll-smooth pb-[10vw] md:pb-[4vw] px-[2vw]"
          style={{ 
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* إخفاء السكرول لمتصفحات Chrome/Safari */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 1.65 }}
              className={`
                flex-none 
                w-[45vw] md:w-[18vw] 
                aspect-[1.1/1] rounded-[6vw] md:rounded-[2.5vw] 
                bg-white/5 border border-white/20 
                backdrop-blur-4xl shadow-xl ${cat.shadow} ${cat.glow}
                relative overflow-hidden cursor-pointer group transition-all duration-500
                hover:bg-green/30
              `}
            >
              {/* توهج زاوية داخلي */}
              <div className={`absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br ${cat.c} to-transparent opacity-10 blur-2xl group-hover:opacity-30 transition-opacity`}></div>

              {/* المحتوى */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
                {/* الأيقونة الملونة */}
                <div className={`w-[13vw] h-[13vw] md:w-[4.5vw] md:h-[4.5vw] mb-4 p-3 rounded-2xl bg-gradient-to-br ${cat.c} to-black/20 text-white shadow-2xl transition-transform duration-500 group-hover:scale-110`}>
                   {React.cloneElement(cat.i, { size: "100%", strokeWidth: 2 })}
                </div>
                
                <h3 className="text-[4.2vw] md:text-[1.5vw] font-black text-white text-center leading-tight">
                  {cat.n}
                </h3>

                {/* خط سفلي مضيء يظهر عند الحوم */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileHover={{ width: "40%" }}
                  className={`h-[2px] mt-4 bg-gradient-to-r ${cat.c} to-transparent rounded-full`}
                />
              </div>

              {/* تأثير Typography في الخلفية */}
              <div className="absolute -bottom-2 -right-2 text-[10vw] md:text-[5vw] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-all">
                {cat.n.split(' ')[0]}
              </div>
            </motion.div>
          ))}
        </div>
        </Link>
        {/* تظليل الأطراف */}
        <div className="absolute top-0 right-[-2vw] h-full w-[15vw] bg-gradient-to-l from-[#020617] to-transparent pointer-events-none z-20"></div>
        <div className="absolute top-0 left-[-2vw] h-full w-[15vw] bg-gradient-to-r from-[#020617] to-transparent pointer-events-none z-20"></div>
      </div>
    </section>
  );
};

export default ArticleCategoriesElite;