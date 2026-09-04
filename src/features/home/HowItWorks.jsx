// src/components/LandingPage/HowItWorks.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, PenTool, Users } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'اكتشف المعرفة',
    desc: 'ابحث عن الكتب والمقالات من بين الآلاف من العناوين الحصرية المتميزة.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10'
  },
  {
    icon: BookOpen,
    title: 'اقرأ بذكاء',
    desc: 'استمتع بتجربة قراءة مريحة مع أدوات متطورة لحفظ العلامات والملاحظات.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: PenTool,
    title: 'شارك إبداعك',
    desc: 'انشر مقالاتك الخاصة، أو كتبك كملفات PDF وشاركها مع مجتمع واسع.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Users,
    title: 'تفاعل وناقش',
    desc: 'انضم لمناقشات حول الكتب، وقيم الأعمال، وتابع كتابك المفضلين.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10'
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#030712]">
      
      {/* خلفية جمالية */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        
        {/* العناوين (متجاوبة الحجم) */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-200 to-white"
          >
            طريقك نحو عالم المعرفة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            delay={0.2}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium"
          >
            منصة "Beneficent" مصممة لتكون رفيقك الأفضل في رحلة البحث، القراءة، والنشر الرقمي.
          </motion.p>
        </div>

        {/* شبكة البطاقات المتجاوبة (Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/30 hover:bg-white/[0.05] shadow-xl"
            >
              {/* أيقونة مميزة */}
              <div className={`inline-flex p-4 rounded-2xl mb-8 ${step.bgColor}`}>
                <step.icon size={30} className={step.color} />
              </div>

              {/* المحتوى */}
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {step.desc}
              </p>

              {/* تأثير إضاءة خلفي */}
              <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-amber-400/10 to-transparent z-[-1]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;