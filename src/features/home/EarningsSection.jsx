import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, PenTool, BookOpenCheck, ChevronLeft, DollarSign } from 'lucide-react';

const EarningsSectionFixed = () => {
  const earningModels = [
    {
      icon: <PenTool className="w-[3vw] h-[3vw] lg:w-8 lg:h-8" />,
      title: "صناع المحتوى",
      desc: "اكتب مقالاتك واحصل على عوائد مالية بناءً على التفاعل.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <BookOpenCheck className="w-[3vw] h-[3vw] lg:w-8 lg:h-8" />,
      title: "نشر الكتب",
      desc: "ارفع كتبك الرقمية، وحدد سعرك، واستلم أرباحك فوراً.",
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-[3vw] h-[3vw] lg:w-8 lg:h-8" />,
      title: "نظام النقاط",
      desc: "حول تفاعلك اليومي وقراءاتك إلى ميزات أو نقد.",
      color: "from-amber-500 to-orange-400"
    }
  ];

  return (
    <section className="relative bg-blue-500/10   py-[6vw] px-[4vw] overflow-hidden h-auto min-h-fit" dir="rtl">
      
      {/* خلفية الإضاءة */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-600/5 blur-[10vw] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-500/5 blur-[10vw] rounded-full"></div>

      <div className="container mx-auto relative z-10">
        
        {/* الحفاظ على التوزيع الأفقي الثابت */}
        <div className="flex flex-cloumn items-center gap-[4vw]">
          
          {/* الجانب الأيمن: النص التشويقي (45%) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-[45%] text-right"
          >
            <div className="inline-flex items-center gap-[1vw] text-amber-500 bg-amber-500/10 px-[1.5vw] py-[0.8vw] rounded-[1vw] mb-[2vw] border border-amber-500/20">
              <Wallet size={"1.8vw"} />
              <span className="font-bold  text-[1.2vw] lg:text-sm tracking-tighter">استثمر معرفتك</span>
            </div>
            
            {/* تكبير العنوان الرئيسي ليكون واضحاً جداً */}
            <h2 className="text-[4.2vw] lg:text-6xl font-black text-white mb-[2vw] leading-[1.1]">
              حول شغفك <br />
              إلى <span className="text-amber-500">مصدر دخل</span>
            </h2>
            
            {/* تحسين وضوح النص الوصفي */}
            <p className="text-gray-400 text-[1.8vw] lg:text-xl leading-relaxed mb-[3vw] font-medium">
              نمنحك الأدوات لتحويل إبداعك إلى أرباح حقيقية في منصة الشيحان.
            </p>

            <button className="group flex items-center gap-[1vw] bg-green-400/50 text-black px-[3vw] py-[1vw] rounded-[1.5vw] font-black text-[1.8vw] lg:text-xl hover:bg-amber-500 hover:text-white transition-all">
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform w-[2vw] h-[2vw]" />
              ابدأ الآن
            </button>
          </motion.div>

          {/* الجانب الأيسر: بطاقات النماذج (55%) */}
          <div className="w-[55%] flex flex-col gap-[1.5vw]">
            {earningModels.map((model, index) => (
              <motion.div
                key={index}
                className="group relative flex items-center gap-[2vw] p-[2vw] rounded-[2vw] bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                {/* الأيقونة بحجم ثابت النسبة */}
                <div className={`shrink-0 w-[6vw] h-[6vw] rounded-[1.5vw] bg-gradient-to-br ${model.color} flex items-center justify-center text-white shadow-lg`}>
                  {model.icon}
                </div>

                <div className="text-right">
                  <h3 className="text-[2.2vw] lg:text-2xl font-bold text-white mb-[0.5vw]">
                    {model.title}
                  </h3>
                  <p className="text-gray-400 text-[1.4vw] lg:text-base leading-snug font-light">
                    {model.desc}
                  </p>
                </div>

                <div className="absolute left-[1.5vw] bottom-[1.5vw] opacity-5 text-white">
                  <DollarSign size={"3vw"} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* الإحصائيات السفلية بشكل أفقي مصغر ومقروء */}
        <div className="mt-[5vw] flex flex-row justify-center gap-[6vw] border-t border-white/5 pt-[4vw]">
          {[
            { v: "+50,000$", t: "أرباح مدفوعة" },
            { v: "+1,200", t: "كاتب معتمد" },
            { v: "24/7", t: "دعم فني" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[2.5vw] lg:text-3xl font-black text-white leading-none">{stat.v}</p>
              <p className="text-gray-500 text-[1.2vw] lg:text-sm mt-[0.5vw]">{stat.t}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EarningsSectionFixed;