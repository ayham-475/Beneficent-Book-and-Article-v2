import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Shield, Globe } from 'lucide-react';

const SocialAndTabletSectionFixed = () => {
  const authors = [
    { angle: 0 }, { angle: 45 }, { angle: 90 }, { angle: 135 }, 
    { angle: 180 }, { angle: 225 }, { angle: 270 }, { angle: 315 }
  ];

  return (
    <section className="relative min-h-[100vw] lg:min-h-screen bg-[#020617] text-white overflow-hidden flex items-center" dir="rtl">
      
      {/* التأثيرات الخلفية الفخمة */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-600/10 blur-[10vw] rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-emerald-500/10 blur-[10vw] rounded-full opacity-30"></div>

      {/* الحاوية التي تضمن ثبات التصميم */}
      <div className="container mx-auto px-[4vw] relative z-10">
        
        {/* نستخدم flex-row دائماً لضمان عدم نزول العناصر تحت بعضها */}
        <div className="flex flex-row items-center justify-between gap-[5vw]">
          
          {/* الجانب الأيمن: نصوص ومميزات */}
          <div className="w-1/2 space-y-[3vw]">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-right"
            >
              <h2 className="text-[6vw] lg:text-[4.5rem] font-black leading-tight">
                تجربة قراءة <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  تنبض بالحياة
                </span>
              </h2>
              <p className="text-[2.5vw] lg:text-xl text-gray-400 max-w-xl font-light">
                واجهة تلتقي فيها التكنولوجيا بمتعة القراءة التقليدية.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-[2vw] text-right">
              {[
                { text: 'مزامنة فورية', color: 'bg-emerald-500' },
                { text: 'وضع ليلي', color: 'bg-blue-500' },
                { text: 'تحليلات ذكية', color: 'bg-purple-500' },
                { text: 'حماية كاملة', color: 'bg-cyan-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-[1vw] border-b border-white/5 pb-[1vw]">
                  <div className={`w-[1vw] h-[1vw] max-w-[10px] max-h-[10px] rounded-full ${item.color} shadow-[0_0_10px_rgba(16,185,129,0.5)]`} />
                  <span className="text-[1.8vw] lg:text-lg text-gray-300 font-bold">{item.text}</span>
                </div>
              ))}
            </div>

            {/* التابلت الزجاجي (ثابت التناسب) */}
            <motion.div 
              whileHover={{ rotateY: -10 }}
              className="relative group w-[25vw] max-w-[300px] aspect-[3/4] mx-auto lg:mx-0"
            >
              <div className="absolute -inset-2 bg-emerald-500/20 rounded-[2vw] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full bg-[#0f172a] border-[0.5vw] border-gray-800 rounded-[2vw] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] flex flex-col items-center justify-center p-[2vw]">
                   <Smartphone className="text-emerald-400 mb-[1vw]" size={"4vw"} />
                   <h5 className="font-black text-[1.5vw] text-white italic">الواحة Mobile</h5>
                   <button className="mt-[2vw] bg-emerald-600 text-white px-[2vw] py-[0.5vw] rounded-full text-[1vw] font-black">
                     تحميل
                   </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* الجانب الأيسر: دائرة المجتمع (ثابتة القطر) */}
          <div className="w-1/2 relative flex justify-center items-center h-[50vw]">
            
            {/* الأشعة الخلفية */}
            <div className="absolute w-[100%] h-[1px] bg-emerald-500/30 rotate-[30deg] animate-pulse" />
            <div className="absolute w-[100%] h-[1px] bg-blue-500/30 -rotate-[30deg] animate-pulse delay-700" />

            {/* الدائرة الكبرى */}
            <div className="relative w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] border border-white/5 rounded-full flex justify-center items-center">
               
              <div className="absolute w-[70%] h-[70%] border border-white/5 rounded-full animate-spin-slow"></div>

              {/* المركز */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="z-20 text-center bg-[#0f172a]/80 backdrop-blur-xl p-[3vw] rounded-full border border-white/10"
              >
                <h4 className="text-[2vw] lg:text-2xl font-black text-white">مجتمع <span className="text-emerald-400 text-[2.5vw] lg:text-3xl">الواحة</span></h4>
              </motion.div>

              {/* الأفاتارز: توزيع ثابت بالـ % لضمان عدم خروجها عن الدائرة */}
              {authors.map((auth, i) => {
                const radius = 20; // نسبة مئوية من عرض الدائرة
                const x = Math.cos((auth.angle * Math.PI) / 180) * radius;
                const y = Math.sin((auth.angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={i}
                    className="absolute w-[5vw] h-[5vw] max-w-[65px] max-h-[65px] rounded-full border-[0.2vw] border-[#1e293b] p-[0.2vw] bg-[#0f172a] shadow-2xl"
                    style={{ 
                      left: `calc(50% + ${x}vw - 2.5vw)`, 
                      top: `calc(50% + ${y}vw - 2.5vw)` 
                    }}
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                  >
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 40}`} 
                      className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all" 
                      alt="Author" 
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialAndTabletSectionFixed;