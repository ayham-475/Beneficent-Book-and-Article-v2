// src/components/LandingPage/FinalCTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Star } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#030712] overflow-hidden">
      
      {/* خلفية سينمائية قوية */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1920&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-15 filter brightness-50 contrast-125"
          alt="Magical Books Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/70 to-[#020617] z-10" />
        {/* بقع ضوء متوهجة دافئة */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none z-10 animate-pulse" />
      </div>

      <div className="relative z-20 container mx-auto max-w-4xl text-center">
        
        {/* أيقونة شارة علوية */}
        <motion.div 
          initial={{ rotate: -15, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-400/20 mb-8 shadow-lg shadow-amber-950/30"
        >
          <Star size={36} className="text-amber-400" fill="currentColor" />
        </motion.div>

        {/* العنوان */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-md"
        >
          ملاذك القادم للقراءة <br /> بانتظارك <span className="text-amber-400">اليوم!</span>
        </motion.h2>

        {/* النص الوصفي */}
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            delay={0.2}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium mb-12 opacity-90 leading-relaxed"
        >
            انضم الآن إلى آلاف القراء والمؤلفين الشغوفين، وابدأ رحلتك في أكبر مكتبة عربية رقمية تفاعلية. التسجيل سريع ومجاني بالكامل.
        </motion.p>

        {/* زر التسجيل البارز (الرهيب) */}
        <motion.button 
          whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-12 py-5 rounded-2xl font-black text-lg md:text-xl transition-all shadow-[0_15px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.6)] active:scale-95 group"
        >
          <span>سجل الآن مجاناً</span>
          <UserPlus size={24} />
          {/* تأثير توهج عند التحويم */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 blur-[20px] opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-[-1]" />
        </motion.button>
      </div>
    </section>
  );
};

export default FinalCTA;