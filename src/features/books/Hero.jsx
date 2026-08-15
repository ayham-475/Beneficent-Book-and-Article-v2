import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

const StoreHeader = () => {
  return (
    
   <>
        {/* حقل البحث المتطور */}
        <div className="w-full md:flex-1 relative group ">
          <div className="absolute inset-0 bg-blue-600/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl"></div>
          <input 
            type="text" 
            placeholder="ابحث عن كتابك المفضل، اسم الكاتب..." 
            className="w-full   bg-[#1e293b]/50 border border-white/10 py-[3vw] md:py-[1vw] px-[12vw] md:px-[4vw] rounded-2xl text-[4vw] md:text-[1.2vw] text-white placeholder:text-gray-500 outline-none focus:border-blue-500/50 focus:bg-[#1e293b] transition-all relative z-10"
          />
          <Search 
            className="absolute top-40 right-[4vw] md:right-[1.5vw] top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors z-20" 
            size={"5vw"} // حجم للموبايل
            style={{ width: '1.5vw', height: '1.5vw' }} // حجم للكمبيوتر (سيتجاوب تلقائياً)
          />
          <div className="absolute left-[4vw] md:left-[1.5vw] top-1/2 -translate-y-1/2 z-20 md:hidden">
            <SlidersHorizontal size={"5vw"} className="text-gray-500" />
          </div>
          
          </div>
          
        </>
  
  );
};

export default StoreHeader;