import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, CheckCircle } from 'lucide-react';

const SuccessStories = () => {
  const topEarners = [
    { name: "أيهم اليعري", profit: "1,240", books: 12, color: "text-yellow-400" },
    { name: "عواد اليعري", profit: "890", books: 8, color: "text-gray-300" },
    { name: "سارة خالد", profit: "750", books: 15, color: "text-orange-400" },
  ];

  return (
    // التعديل هنا: h-auto بدلاً من h-screen وتقليل الـ py (المسافات الرأسية)
    <section className="relative bg-blue-500/10  py-[5vw] px-[4vw] overflow-hidden flex items-center h-auto min-h-fit" dir="rtl">
      
      {/* خلفية الإضاءة */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30vw] h-[30vw] bg-blue-600/10 blur-[8vw] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30vw] h-[30vw] bg-emerald-500/10 blur-[8vw] rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* الحفاظ على التوزيع الأفقي الثابت */}
        <div className="flex flex-row items-center gap-[4vw]">
          
          {/* الجانب الأيسر (55%) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-[55%] text-right"
          >
            <h2 className="text-[4vw] font-black text-white leading-[1.1] mb-[1.5vw]">
              لا تكن مجرد <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                مشاهد للنجاح
              </span>
            </h2>

            <p className="text-gray-400 text-[1.6vw] leading-relaxed mb-[2vw]">
              بينما تقرأ، هناك المئات يحولون أفكارهم إلى دولارات. انضم إلينا الآن.
            </p>

            <div className="grid grid-cols-2 gap-[1vw] mb-[2vw]">
              {[
                "لا حاجة لخبرة",
                "حماية ملكية",
                "سحب محلي",
                "دعم خاص"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-[0.6vw] text-gray-300">
                  <CheckCircle className="text-emerald-500 w-[1.2vw] h-[1.2vw]" />
                  <span className="font-bold text-[1.1vw] whitespace-nowrap">{feature}</span>
                </div>
              ))}
            </div>

            <button className="px-[3.5vw] py-[1.5vw] bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[1vw] font-black text-[1.8vw] text-white shadow-2xl hover:scale-105 transition-transform">
              ابدأ بناء ثروتك
            </button>
          </motion.div>

          
          {/* الجانب الأيمن (45%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-[45%]"
          >
            <div className="bg-white/5 border border-white/10 rounded-[2.5vw] p-[2.5vw] backdrop-blur-xl relative shadow-2xl">
              <div className="flex items-center justify-between mb-[1.5vw] border-b border-white/10 pb-[1vw]">
                <h3 className="text-[2vw] font-black text-white flex items-center gap-[0.8vw]">
                  <Trophy className="text-yellow-500 w-[2vw] h-[2vw]" />
                 أعلى الأرباح في هذا الاسبوع
                </h3>
                <span className="flex items-center gap-[0.4vw] text-emerald-400 text-[1vw] font-bold">
                  <div className="w-[0.6vw] h-[0.6vw] bg-emerald-400 rounded-full animate-pulse"></div>
                  حي
                </span>
              </div>

              <div className="space-y-[1.2vw]">
                {topEarners.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-[1.2vw] rounded-[1vw] border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-[1vw]">
                      <div className={`text-[1.8vw] font-black ${user.color}`}>#{index + 1}</div>
                      <div>
                        <p className="text-white font-bold text-[1.6vw] leading-none">{user.name}</p>
                        <p className="text-gray-500 text-[1vw] mt-[0.2vw]">{user.books} كتاب</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-emerald-400 font-black text-[1.8vw]">${user.profit}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* البطاقة العائمة الصغيرة */}
              <div className="absolute -bottom-[1.5vw] -right-[1.5vw] bg-emerald-600 p-[1.2vw] rounded-[1vw] shadow-xl flex items-center gap-[0.8vw] border-[0.2vw] border-[#020617]">
                <Zap size={"1.5vw"} className="text-white fill-white" />
                <p className="text-white font-black text-[1vw]">سحب 15د</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SuccessStories;