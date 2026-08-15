import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#020617] py-16 px-8 border-t border-white/5" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        
        {/* الجزء العلوي: شعار وكلمة مختصرة */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="text-right">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">
              منصة <span className="text-blue-500">اليعري</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-xs">
              مساحة رقمية تجمع بين متعة القراءة وفرص الاستثمار المعرفي.
            </p>
          </div>

          {/* روابط التواصل بلمسة ناعمة */}
          <div className="flex gap-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -3 }}
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Icon size={22} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* خط فاصل ناعم جداً */}
        <div className="h-px w-full bg-gradient-to-l from-transparent via-white/10 to-transparent mb-12"></div>

        {/* الجزء السفلي: روابط قليلة وحقوق */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <nav className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-all">
              المكتبة <ArrowUpRight size={14} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-all">
              انضم إلينا <ArrowUpRight size={14} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-all">
              تواصل معنا <ArrowUpRight size={14} />
            </a>
          </nav>

          <p className="text-gray-600 text-[12px] tracking-widest uppercase">
            &copy; 2026 ALYAARI PLATFORM. ALL RIGHTS RESERVED.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;