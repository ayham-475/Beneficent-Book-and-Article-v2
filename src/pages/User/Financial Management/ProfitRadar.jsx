import { TrendingUp, Book, FileText, Share2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../features/auth/auther';
const ProfitRadar = ({label ,value ,percent ,icon ,color}) => {
  return (
    <div className="grid grid-cols-1 mr-20 mt-10 md:grid-cols-3 gap-6 py-8">

        <motion.div 
       
          whileHover={{ y: -10 }}
className="w-full bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-xl shadow-gray-200"
        >
          <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
              <icon size={24} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-green-500 font-black text-xs flex items-center gap-1">
                <TrendingUp size={12} /> +12%
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">هذا الشهر</span>
            </div>
          </div>
          <h4 className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-1">{label}</h4>
          <p className="text-3xl font-black text-gray-800">{value}</p>
          
          <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${percent}%` }} 
              className={`h-full ${color}`}
            />
          </div>
        </motion.div>
      
    </div>
  );
};

export default ProfitRadar