import React from "react";
import { Link } from 'react-router-dom';
import { BarChart3, Bell} from 'lucide-react';

export default function TopHeaderAdmin(){
    return(
        <>
           {/* Topbar */}
        {/* الهيدر الثابت - تم استخدام sticky لضمان بقائه في الأعلى عند السكرول */}
        <header className=" sticky top-0 z-[50]     lg:mr-20 flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-[#020617]/80 p-4 rounded-3xl border border-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

          {/* قسم البحث أو العنوان الجانبي (إذا وجد) */}
          <div className="hidden md:block">
            <h2 className="text-white font-black italic tracking-wider">نظام النخبة الإداري</h2>
          </div>
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

          {/* الأزرار والبروفايل */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* زر التنبيهات */}
            <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-emerald-400 transition-all relative border border-white/5 group">
              <Bell size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#161616] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            </button>

            <div className="h-8 w-px bg-white/10 mx-2 hidden md:block" />

            {/* معلومات المسؤول */}
            <div className="flex items-center gap-3 bg-black/20 p-1 pr-4 rounded-2xl border border-white/5">
              <p className="text-[10px] md:text-xs font-black text-white uppercase tracking-tighter">لوحة الإدارة العليا</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <BarChart3 size={20} />
              </div>
            </div>
          </div>
        </header>
        
        </>
    );
}