import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Layout, Radio } from 'lucide-react';

const CosmicHeroLightFixed = () => {
  return (
    // الخلفية أصبحت bg-[#fcfcfc] مع الحفاظ على الحواف والحدود
    <section className="relative min-h-[750px] bg-[#fcfcfc] text-[#1a1c20] p-6 md:p-16 overflow-hidden rounded-[0.5rem] border border-gray-200  shadow-2xl" dir="rtl">
      
      {/* 1. الدوامة الكونية (تم الحفاظ عليها بالكامل مع تلطيف ألوانها للنمط الفاتح) */}
      <div className="absolute top-1/2 right-1/4 translate-y-[-50%] w-[900px] h-[900px] pointer-events-none select-none opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-400/10 blur-[80px] rounded-full" />
        
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#10b981_20%,#3b82f6_40%,#10b981_60%,transparent_100%)] opacity-10 blur-[80px] animate-spin-vortex" />
        <div className="absolute inset-20 bg-[conic-gradient(from_180deg,transparent_0%,#06b6d4_30%,#10b981_60%,transparent_100%)] opacity-10 blur-[60px] animate-spin-vortex-reverse" />
      </div>

      {/* 2. الكتب العائمة (نفس التوزيع والتأثير تماماً) */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-10">
        {[
          { top: '35%', right: '20%', rotate: '20deg', delay: 0 },
          { top: '40%', right: '10%', rotate: '-15deg', delay: 1 },
          { top: '65%', right: '25%', rotate: '10deg', delay: 0.5 },
          { top: '30%', right: '35%', rotate: '-25deg', delay: 1.5 },
          { top: '10%', right: '40%', rotate: '15deg', delay: 2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-36 bg-white/60 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            style={{ top: pos.top, right: pos.right }}
            initial={{ y: 0, rotate: pos.rotate }}
            animate={{ 
              y: [0, -30, 0], 
              rotate: [pos.rotate, (parseInt(pos.rotate) + 10) + 'deg', pos.rotate] 
            }}
            transition ={{ duration: 5, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
          >
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-2 border-b-4 border-gray-100">
                <div className="w-full h-1 bg-gray-300 rounded-full mb-2" />
                <div className="w-2/3 h-1 bg-gray-200 rounded-full" />
              </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 h-full items-center">
        
        {/* المحتوى النصي المعرب (نفس الكلمات والترتيب) */}
        <div className="lg:col-span-6 space-y-8 text-right">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[1.1] tracking-tight mb-4 text-gray-900">
              آفاق <br />
              <span className="text-emerald-500">لا نهائية:</span> <br />
              <span className="text-gray-400 text-4xl md:text-5xl font-bold">بوابة المعرفة الرقمية.</span>
            </h1>
            <p className="text-gray-500 text-xl max-w-lg leading-relaxed">
              استكشف عالمًا يجمع بين سحر الكتب الكلاسيكية وحيوية المقالات العصرية. منصتنا هي واحتك الفكرية للنمو والابتكار.
            </p>
            <div className="flex gap-4 mt-10 justify-start">
              <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                ابدأ القراءة
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all shadow-sm">
                حول المنصة
              </button>
            </div>
          </motion.div>
        </div>
        {/* مركز التحكم (نفس التصميم والأيقونات والوصف) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex justify-start items-center mb-4">
              <h3 className="text-gray-400 font-bold tracking-[0.4em] text-x uppercase">لوحة التحكم المركزية</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'المكتبة الذكية', icon: <Box className="text-blue-500" />, desc: 'إدارة متكاملة لجميع كتبك الرقمية المفضلة.' },
              { title: 'نظام النشر', icon: <Layers className="text-purple-500" />, desc: 'أدوات احترافية لتحويل أفكارك إلى مقالات.' },
              { title: 'واجهة مخصصة', icon: <Layout className="text-emerald-500" />, desc: 'تجربة قراءة تناسب ذوقك واحتياجاتك.' },
              { title: 'بث المعرفة', icon: <Radio className="text-cyan-500" />, desc: 'تحديثات مباشرة ومحتوى متجدد على مدار الساعة.' }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:border-emerald-500/50 hover:shadow-xl transition-all group cursor-pointer shadow-md">
                <div className="flex flex-col items-start gap-5">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2 tracking-tight text-gray-800 group-hover:text-emerald-600 transition-colors">{card.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الأنيميشن المخصص (تم الحفاظ عليه كما هو) */}
      <style jsx>{`
        @keyframes spin-vortex {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-vortex-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-spin-vortex {
          position: absolute; top: 50%; left: 50%;
          animation: spin-vortex 25s linear infinite;
        }
        .animate-spin-vortex-reverse {
          position: absolute; top: 50%; left: 50%;
          animation: spin-vortex-reverse 18s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CosmicHeroLightFixed;