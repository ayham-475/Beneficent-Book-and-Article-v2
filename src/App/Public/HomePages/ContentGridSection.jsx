import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Database, PieChart, Users, BookOpen, ChevronLeft } from 'lucide-react';

const MegaSectionDarkFixed = () => {
  return (
    <section className="relative min-h-[100vw] lg:min-h-screen bg-[#020617] text-white overflow-hidden flex items-center py-[5vw]" dir="rtl">
      
      {/* الخلفيات الضوئية المنسجمة مع الهوية */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[10vw] rounded-full -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-emerald-500/10 blur-[10vw] rounded-full translate-y-1/2 opacity-40" />

      {/* الحاوية الرئيسية بنسبة عرض ثابتة لضمان عدم الانكسار في الهاتف */}
      <div className="container mx-auto px-[3vw] relative z-10">
        
        {/* نستخدم flex-row دائماً لمنع تكدس العناصر فوق بعضها في الموبايل */}
        <div className="flex flex-row items-stretch gap-[2.5vw]">

          {/* الجانب الأيسر: المكتبة (عرض 58% ثابت) */}
          <div className="w-[58%] bg-white/[0.03] border border-white/10 rounded-[3vw] p-[3vw] relative shadow-2xl overflow-hidden">
            
            <div className="flex justify-between items-center mb-[2.5vw]">
              <div className="text-right">
                <h2 className="text-[3.5vw] lg:text-3xl font-black text-white">مكتبة <span className="text-emerald-400 font-outline-2">الواحة</span></h2>
                <p className="text-gray-400 text-[1.5vw] lg:text-sm font-medium mt-[0.2vw]">تصفح عالمك المعرفي الخاص</p>
              </div>
              <button className="flex items-center gap-[0.5vw] text-[1.2vw] lg:text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-[1.5vw] py-[0.8vw] rounded-full hover:bg-emerald-400/20 transition-colors">
                عرض الكل <ChevronLeft size={"1.5vw"} />
              </button>
            </div>

            {/* شبكة الكتب المحمية من الكسر */}
            <div className="grid grid-cols-4 gap-[1vw] mb-[2.5vw]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className={`relative rounded-[1.2vw] overflow-hidden group shadow-lg ${i % 2 === 0 ? 'h-[16vw] mt-[2vw]' : 'h-[18vw]'}`}>
                  <img 
                    src={`https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop&i=${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Book"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-[1vw] flex flex-col justify-end">
                    <span className="text-[1vw] font-bold text-white uppercase tracking-widest text-center">إصدار {i}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* قسم المؤلفين */}
            <div className="pt-[2vw] border-t border-white/5">
              <h3 className="text-gray-500 font-bold tracking-[0.2em] text-[1.2vw] mb-[1.5vw] uppercase text-right">المؤلفون الأكثر تفاعلاً</h3>
              <div className="flex flex-row items-center gap-[1.2vw] overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-[0.8vw] bg-white/5 p-[0.6vw] pr-[1.2vw] rounded-full border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                    <div className="relative">
                      <img src={`https://i.pravatar.cc/100?u=user${i}`} className="w-[3.5vw] h-[3.5vw] rounded-full object-cover border border-emerald-500/30" alt="Author" />
                      <div className="absolute -bottom-[0.2vw] -right-[0.2vw] w-[1vw] h-[1vw] bg-emerald-500 border-[0.2vw] border-[#020617] rounded-full" />
                    </div>
                    <div className="text-right">
                      <h5 className="text-[1.4vw] lg:text-xs font-bold text-white">د. أحمد فؤاد</h5>
                      <span className="text-[1vw] text-gray-500 leading-none">12 كتاب</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
};

export default MegaSectionDarkFixed;