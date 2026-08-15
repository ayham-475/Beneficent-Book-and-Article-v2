import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCTA = () => {
  return (
    <section className="py-[8vw] px-[4vw]">
      <div className="relative bg-gradient-to-br from-indigo-700 via-blue-800 to-purple-800 rounded-[4vw] p-[7vw] overflow-hidden text-center">
        {/* تأثيرات خلفية نيون */}
        <div className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] bg-white/5 blur-[10vw] rounded-full -translate-x-1/2 -translate-y-1/2 animate-slow-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-500/5 blur-[8vw] rounded-full translate-x-1/2 translate-y-1/2 animate-slow-glow delay-1000"></div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-[8vw] h-[8vw] md:w-[6vw] md:h-[6vw] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-[3vw]"
          >
            <Feather size={"4vw"} className="md:w-[3vw] md:h-[3vw] text-white animate-pulse" />
          </motion.div>

          <h2 className="text-[5.5vw] md:text-[4.5vw] font-black text-white mb-[2vw] leading-none">
            هل لديك <span className="text-purple-200">فكرة تستحق النشر؟</span>
          </h2>
          <p className="text-blue-100 text-[2.5vw] md:text-[1.8vw] mb-[4vw] max-w-[80%] md:max-w-[70%] font-medium leading-relaxed">
            شارك مقالاتك مع آلاف القراء واجعل صوتك مسموعاً. نحن نؤمن بقوة الأفكار.
          </p>
          <Link to="/login">
          <button className="px-[5vw] py-[2vw] md:px-[4vw] md:py-[1.8vw] bg-white text-purple-800 rounded-[1.5vw] font-black text-[3.5vw] md:text-[2vw] shadow-2xl hover:bg-purple-50 transition-all">
            ابدأ بكتابة مقال
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleCTA;