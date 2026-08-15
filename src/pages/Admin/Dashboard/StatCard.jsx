import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      // استخدام البروب delay ليتم ظهور البطاقات بالتتابع
      transition={{ duration: 0.5, delay: delay }} 
      className={`relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
    >
      {/* جسم البطاقة الداخلي */}
      <div className="bg-[#111111] rounded-[2.5rem] p-8 h-full relative overflow-hidden">
        
        {/* 1. التوهج الخلفي (استخدام color.glow) */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-20 rounded-full ${color?.glow}`} />
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            {/* 2. العنوان (title) */}
            <p className="text-gray-400 text-xs font-bold mb-2 tracking-tight opacity-80">{title}</p>
            {/* 3. القيمة الرقمية (value) */}
            <h3 className="text-4xl font-black text-white tracking-tighter drop-shadow-md">
              {value}
            </h3>
          </div>
          
          {/* 4. الأيقونة والخلفية الملونة (color.bg و color.text) */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/10 shadow-inner ${color?.bg}`}>
             <div className="absolute inset-0 opacity-20 bg-white" />
             <div className={`${color?.text} relative z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}>
                {icon}
             </div>
          </div>
        </div>

        {/* القسم السفلي (الحالة والتفاعل) */}
        <div className="mt-8 relative z-10 flex items-center justify-between">
           {/* 5. النقطة النابضة ونص الحالة (color.dot و change) */}
           <div className={`px-4 py-1.5 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2 transition-all`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${color?.dot}`} />
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{change}</span>
           </div>

           {/* سهم أيقوني ثابت الجمالية */}
           <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-gray-600 group-hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.02] pointer-events-none" />
      </div>

      {/* 6. الشادو النيوني الخارجي عند الـ Hover (color.shadow) */}
      <div className={`absolute -inset-1 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10 ${color?.shadow}`} />
    </motion.div>
  );
};

export default StatCard;