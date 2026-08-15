import React from 'react';
import { ChevronLeft, Users, Zap, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const ReviewCard = ({ item, isSelected }) => {
  return (
    <div className={`
      relative group cursor-pointer transition-all duration-500
      bg-[#121214] border rounded-[2.5rem] p-5 overflow-hidden
      ${isSelected 
        ? 'border-blue-500/50 bg-[#161618] shadow-[0_25px_50px_rgba(0,0,0,0.5)] scale-[1.01]' 
        : 'border-white/5 hover:border-white/10 hover:bg-[#141416]'}
    `}>
      
      {/* مؤشر الحالة النشطة الجانبي (أزرق ليتناسب مع CRM) */}
      {isSelected && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-blue-500 rounded-l-full shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20" />
      )}

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        
        {/* قسم صورة المستخدم (Avatar) بتصميم فخم */}
        <div className="relative shrink-0 mx-auto md:mx-0">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] overflow-hidden border-2 border-white/5 p-1.5 group-hover:border-blue-500/30 transition-colors duration-500">
            <img 
              src={item.cover} 
              alt={item.author} 
              className="w-full h-full object-cover rounded-[2.2rem] group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          {/* شارة الحالة (Status) */}
          <div className="absolute -bottom-1 -right-1 bg-[#080809] p-1.5 rounded-2xl border border-white/10">
            <div className={`w-3 h-3 rounded-full ${item.time === 'نشط الآن' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-gray-600'}`} />
          </div>
        </div>

        {/* تفاصيل المستخدم والنمو */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-xl font-black transition-colors ${isSelected ? 'text-blue-400' : 'text-white'}`}>
                    {item.author}
                  </h3>
                  {item.type === 'Premium' && (
                    <span className="bg-blue-500/10 text-blue-500 text-[8px] px-2 py-0.5 rounded-lg border border-blue-500/20 font-black uppercase tracking-tighter">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-[11px] font-bold flex items-center gap-1.5">
                  <Mail size={12} className="text-blue-500/50" /> {item.id}@platform.com
                </p>
              </div>
              
              <div className="text-left hidden sm:block">
                <span className="text-[9px] text-gray-600 font-black block uppercase mb-1 tracking-widest">إجمالي الرصيد</span>
                <span className="text-2xl font-mono text-white font-black tracking-tighter">${item.price}</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-5 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {item.summary}
            </p>
          </div>

          {/* الإحصائيات السريعة والتاجز */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.03]">
            <div className="flex gap-4">
               <div className="flex flex-col">
                  <span className="text-white text-xs font-black flex items-center gap-1">
                    <Users size={12} className="text-blue-500" /> 12.5k
                  </span>
                  <span className="text-[8px] text-gray-600 font-bold uppercase">متابع</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-white text-xs font-black flex items-center gap-1">
                    <Zap size={12} className="text-amber-500" /> 85%
                  </span>
                  <span className="text-[8px] text-gray-600 font-bold uppercase">تفاعل</span>
               </div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="hidden md:flex gap-1.5">
                  {item.tags?.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-bold text-gray-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      {tag}
                    </span>
                  ))}
               </div>
               <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                  ${isSelected ? 'bg-blue-500 text-black rotate-0' : 'bg-white/5 text-gray-500 rotate-45 group-hover:rotate-0 group-hover:bg-blue-500/20 group-hover:text-blue-500'}
               `}>
                  <ArrowUpRight size={20} />
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* خلفية فنية خفيفة تظهر عند الـ Hover */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};