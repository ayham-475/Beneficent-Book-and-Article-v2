import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav dir='rtl' className="fixed top-0 left-0 right-0 z-[100] px-[3vw] py-[4vw] md:py-[1.5vw]">
      {/* الحاوية الزجاجية - زيادة الشفافية والبروز */}
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/10 backdrop-blur-3xl border border-white/20 px-[3vw] md:px-[2vw] py-[2vw] md:py-[0.7vw] rounded-[2vw] sm:rounded-full shadow-2xl">

        {/* 1. الشعار - الحرف A */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-[9vw] h-[9vw] md:w-[2.8vw] md:h-[2.8vw] bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/50">
            <span className="text-white font-black text-[5vw] md:text-[1.4vw]">A</span>
          </div>
        </div>

        {/* 2. الروابط المركزية - بدون أيقونات لضمان المساحة في الهاتف */}
        <div className="flex items-center gap-[3vw] md:gap-[2.5vw]">
          <Link to="/" className="text-white font-black text-[3.2vw] md:text-[1vw] hover:text-blue-400 transition-colors">
            الرئيسية
          </Link>


          <Link to="/homeBook" className="text-white/80 font-black text-[3.2vw] md:text-[1vw] hover:text-blue-400 transition-colors">
            الكُتّاب
          </Link>

          <Link to="/articlenew" className="text-white/80 font-black text-[3.2vw] md:text-[1vw] hover:text-blue-400 transition-colors">
            المقالات
          </Link>
        </div>

        {/* 3. زر تسجيل الدخول - واضح ومباشر */}
        <Link to='/login'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-[3.5vw] md:px-[1.8vw] py-[1.8vw] md:py-[0.7vw] rounded-[2.5vw] md:rounded-full shadow-lg transition-all"
          >
            <LogIn size={14} className="md:w-[1.1vw]" />
            <span className="text-[3vw] md:text-[0.95vw] font-black whitespace-nowrap">دخول</span>
          </motion.button>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;