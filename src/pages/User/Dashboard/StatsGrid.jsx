import React from 'react';
import { DollarSign, Users, BookOpen, TrendingUp, ArrowUpRight, Award } from 'lucide-react';

const StatsCard = ({ title, value, subValue, icon: Icon, colorClass, trend }) => (
  /* التعديلات لتقليل الطول:
     - تقليل p-4 إلى p-3 (الحشوة الداخلية)
     - تقليل mt-10 إلى mt-6 (المسافة العلوية)
     - تقليل الحواف rounded إلى 1.8rem لتناسب الطول الجديد
  */
  <div className="relative group  bg-white flex-shrink-0 w-[46%] md:w-[260px] mt-17  md:mt-20 rounded-[1.8rem] p-4 border border-white shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(49,151,149,0.1)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden">
    
    {/* الخلفية المضيئة - صغرنا حجمها أيضاً */}
    <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#E6FFFA]/40 rounded-full blur-2xl group-hover:bg-[#E6FFFA]/70 transition-all duration-700" />

    <div className="relative z-10">
      <div className="flex justify-between items-start gap-1">
        {/* تصغير حجم حاوية الأيقونة */}
        <div className={`p-2.5 md:p-3 rounded-xl ${colorClass} shadow-sm border border-white/50 transition-transform duration-500 group-hover:scale-105`}>
          <Icon size={20} />
        </div>
        
        {/* التوجه (Trend) - جعلناه أصغر */}
        <div className="flex items-center gap-1 bg-[#F0FDF4] text-[#16A34A] px-2 py-1 rounded-full border border-[#DCFCE7]">
          <TrendingUp size={10} />
          <span className="text-[9px] font-black whitespace-nowrap">{trend}</span>
        </div>
      </div>

      {/* تقليل المسافات mt-4 إلى mt-3 */}
      <div className="space-y-0.5 mt-3">
        <p className="text-[#718096] text-[9px] md:text-[10px] font-black uppercase tracking-wider opacity-80 italic">
          {title}
        </p>
        <div className="flex items-baseline gap-1.5">
          <h3 className="text-xl md:text-2xl font-black text-[#1A202C] tracking-tighter italic">
            {value}
          </h3>
          {subValue && <span className="text-[9px] font-bold text-gray-400">{subValue}</span>}
        </div>
      </div>

      {/* تقليل مسافة الجزء السفلي mt-6 إلى mt-4 */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <span className="text-[9px] font-black text-[#319795] uppercase tracking-widest cursor-pointer">التفاصيل</span>
        <ArrowUpRight size={12} className="text-[#319795]" />
      </div>
    </div>
  </div>
);

const StatsGrid = () => {
  const stats = [
    { title: "إجمالي الأرباح", value: "1,240.50", subValue: "SAR", trend: "+12%", icon: DollarSign, colorClass: "bg-[#E6FFFA] text-[#319795]" },
    { title: "جمهورك (القراء)", value: "3.5K", subValue: "قارئ", trend: "+8.4%", icon: Users, colorClass: "bg-[#EBF8FF] text-[#3182CE]" },
    { title: "المحتوى المباع", value: "84", subValue: "مبيعة", trend: "+5.2%", icon: BookOpen, colorClass: "bg-[#F0FDF4] text-[#16A34A]" },
    { title: "المركز الحالي", value: "#12", subValue: "عالمياً", trend: "Top 5%", icon: Award, colorClass: "bg-[#FFFBEB] text-[#D97706]" },
    { title: "التقييم العام", value: "4.9", subValue: "نجمة", trend: "Stable", icon: Award, colorClass: "bg-[#F7FAFC] text-[#2D3748]" },
  ];

  return (
    <div className="w-full mb-8 md:mx-10 overflow-hidden" dir="rtl">
      {/* ستايل إخفاء السكرول بار مع ميزة الـ Snap */}
      <style dangerouslySetInnerHTML={{__html: `
          .custom-slider {
            display: flex !important;
            overflow-x: auto !important;
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-snap-type: x mandatory;
            padding-bottom: 10px; /* مساحة بسيطة للظل */
          }
          .custom-slider::-webkit-scrollbar { display: none; }
          .custom-slider > div { scroll-snap-align: start; }
      `}} />

      <div className="custom-slider flex gap-3 md:gap-6 px-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;