import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategorySliderResponsive = () => {
  const cats = [
    { n: "ريادة الأعمال", i: "💼", c: "from-blue-600/20 to-blue-400/5", border: "border-blue-500/20" },
    { n: "الأدب العالمي", i: "🖋️", c: "from-purple-600/20 to-purple-400/5", border: "border-purple-500/20" },
    { n: "تطوير الذات", i: "🌱", c: "from-emerald-600/20 to-emerald-400/5", border: "border-emerald-500/20" },
    { n: "البرمجة والذكاء", i: "💻", c: "from-amber-600/20 to-amber-400/5", border: "border-amber-500/20" },
    { n: "علم النفس", i: "🧠", c: "from-pink-600/20 to-pink-400/5", border: "border-pink-500/20" },
    { n: "التاريخ", i: "📜", c: "from-red-600/20 to-red-400/5", border: "border-red-500/20" },
  ];

  return (
    <section className="py-[8vw] md:py-[6vw] px-[4vw] bg-[#020617]" dir="rtl">
      {/* العناوين - حجم خط واضح جداً في الموبايل */}
      <div className="flex justify-between items-end mb-[5vw] md:mb-[3vw]">
        <div className="text-right">
          <h3 className="text-[5.5vw] md:text-[3vw] font-black text-white leading-none">
            تصفح <span className="text-blue-500">الفئات</span>
          </h3>
          <p className="text-gray-500 text-[3.2vw] md:text-[1.4vw] mt-2 font-medium">
            اسحب لاستكشاف المزيد
          </p>
        </div>
      </div>

      {/* حاوية السلايدر */}
      <div className="relative overflow-visible">
        <Link to='/Categories' >  <div
          className="flex flex-row gap-[3vw] md:gap-[2.5vw] overflow-x-auto no-scrollbar scroll-smooth pb-[4vw] md:pb-[2vw]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' // لتنعيم التمرير في الآيفون
          }}
        >
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-none 
                /* العرض في الموبايل: 28vw لضمان ظهور 3 فئات وفراغات بينهم */
                w-[28vw] 
                /* العرض في الشاشات الكبيرة: 15vw */
                md:w-[15vw] 
                aspect-square rounded-[4vw] md:rounded-[3vw] 
                bg-gradient-to-br ${cat.c} border ${cat.border} 
                backdrop-blur-xl flex flex-col items-center justify-center 
                cursor-pointer group transition-all duration-500
              `}
            >
              {/* الأيقونة - حجم كبير وواضح */}
              <span className="text-[8vw] md:text-[5vw] mb-[1.5vw] group-hover:scale-110 transition-transform duration-300">
                {cat.i}
              </span>

              {/* اسم الفئة - خط عريض واضح */}
              <span className="text-[2.8vw] md:text-[1.6vw] font-black text-white/90 text-center px-1">
                {cat.n}
              </span>

              {/* خط التزيين - يختفي في الموبايل لتقليل التشتت ويظهر في الكمبيوتر */}
              <div className="hidden md:block mt-[1vw] w-0 h-[2px] bg-white/40 group-hover:w-[40%] transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
        </Link>

        {/* تلاشي الأطراف لجمالية التصميم (Amazon Style) */}
        <div className="absolute top-0 right-0 h-full w-[10vw] bg-gradient-to-l from-[#020617] via-[#020617]/50 to-transparent pointer-events-none z-10 md:block"></div>
        <div className="absolute top-0 left-0 h-full w-[10vw] bg-gradient-to-r from-[#020617] via-[#020617]/50 to-transparent pointer-events-none z-10 md:block"></div>
      </div>
    </section>
  );
};

export default CategorySliderResponsive;