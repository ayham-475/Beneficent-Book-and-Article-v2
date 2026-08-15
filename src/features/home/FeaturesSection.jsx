import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Search, FileText, Book, Mic, Settings } from 'lucide-react';

const FeaturesSectionFixed = () => {
  const features = [
    { icon: <Layout />, title: "واجهة ذكية", desc: "تنسيق مريح للعين" },
    { icon: <Search />, title: "بحث متقدم", desc: "تصل لما تريد بسرعة" },
    { icon: <FileText />, title: "ملفات PDF", desc: "تحميل وقراءة مباشرة" },
    { icon: <Book />, title: "مكتبة شاملة", desc: "آلاف الكتب الحصرية" },
    // { icon: <Mic />, title: "كتب صوتية", desc: "استمع في أي وقت" },
    { icon: <Settings />, title: "تخصيص كامل", desc: "تحكم في تجربتك" },
  ];

  return (
    <section className="relative bg-[#020617] py-[6vw] px-[4vw] overflow-hidden h-auto min-h-fit" dir="rtl">
      
      {/* عنوان القسم - خطوط vw كبيرة وواضحة */}
      <div className="text-center mb-[6vw]">
        <h2 className="text-[5vw] lg:text-5xl font-black text-white mb-[1.5vw]">
          ما الذي يميز منصة اليعري؟
        </h2>
        <div className="w-[10vw] lg:w-24 h-[0.5vw] lg:h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]"></div>
      </div>

      {/* الحاوية: استخدام flex-wrap مع basis-[30%] لضمان 3 عناصر في الصف بالهاتف */}
      <div className="container mx-auto flex flex-wrap justify-center gap-[2vw] relative z-10">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex flex-col items-center p-[2.5vw] rounded-[2vw] bg-white/5 border border-white/10 backdrop-blur-md transition-all basis-[31%] lg:basis-[15%]"
          >
            {/* الدائرة المضيئة والأيقونة - مقاسات تناسب الهاتف */}
            <div className="relative w-[10vw] h-[10vw] lg:w-20 lg:h-20 flex items-center justify-center rounded-full border-[0.3vw] border-blue-500/30 mb-[1.5vw] transition-all group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[1vw]"></div>
              <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                {React.cloneElement(item.icon, { 
                    className: "w-[5vw] h-[5vw] lg:w-8 lg:h-8",
                    strokeWidth: 1.5 
                })}
              </div>
            </div>

            {/* نصوص واضحة جداً */}
            <h3 className="text-white font-bold text-[1.8vw] lg:text-lg mb-[0.5vw] text-center whitespace-nowrap">
                {item.title}
            </h3>
            
            {/* الوصف يظهر بوضوح عند الحوم، وبخط مقروء */}
            <p className="text-gray-500 text-[1.1vw] lg:text-xs text-center leading-tight opacity-80 group-hover:opacity-100 transition-opacity px-[0.5vw]">
              {item.desc}
            </p>

            {/* خط التوهج السفلي */}
            <div className="absolute bottom-[1vw] w-[30%] h-[0.2vw] bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
          </motion.div>
        ))}
      </div>

      {/* توهج فني سفلي */}
      <div className="absolute -bottom-[10vw] left-1/2 -translate-x-1/2 w-[80%] h-[20vw] bg-blue-600/10 blur-[8vw] rounded-full"></div>
    </section>
  );
};

export default FeaturesSectionFixed;