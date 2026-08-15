import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialsSectionFixed = () => {
  const reviews = [
    {
      id: 1,
      name: "أحمد العبسي",
      role: "باحث أكاديمي",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "منصة الشيحان غيرت مفهومي عن القراءة الرقمية. السهولة في الوصول والتصميم المريح جعلها تطبيقي المفضل.",
      stars: 5
    },
    {
      id: 2,
      name: "سارة المنصور",
      role: "مصممة جرافيك",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "أبهرني التناسق البصري. المحتوى قيم جداً والواجهة سلسة للغاية. تجربة مستخدم عالمية بأيدي يمنية.",
      stars: 5
    },
    {
      id: 3,
      name: "خالد اليفاعي",
      role: "مطور برمجيات",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      text: "أعجبني سرعة الاستجابة وتوفر المراجع النادرة. قسم الملفات المنظم ساعدني كثيراً في أبحاثي التقنية.",
      stars: 5
    }
  ];

  return (
    // استخدام h-auto و py تناسبي لمنع الفراغات العلوية والسفلية
    <section className="relative bg-[#020617] py-[6vw] px-[3vw] overflow-hidden h-auto min-h-fit" dir="rtl">
      
      {/* الخلفية الهندسية - تم ضبطها لتصغر مع الصفحة */}
      <div className="absolute inset-0 opacity-10 pointer-events-none scale-[1.5] lg:scale-100">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#3b82f6" />
              <path d="M 100 50 L 0 50 M 50 100 L 50 0" fill="none" stroke="#1e40af" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        {/* عنوان القسم - خطوط vw ثابتة */}
        <div className="text-center mb-[5vw]">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-[5vw] lg:text-6xl font-black text-white mb-[1.5vw]"
          >
            ماذا يقول <span className="text-blue-500">مبدعونا</span>؟
          </motion.h2>
          <p className="text-gray-400 text-[1.8vw] lg:text-lg max-w-2xl mx-auto">
            نعتز بشهادات مستخدمينا التي تدفعنا دائماً لتقديم الأفضل.
          </p>
        </div>

        {/* شبكة الآراء - استخدام flex-row لضمان بقاء البطاقات الثلاث بجانب بعضها */}
        <div className="flex flex-row gap-[2vw] justify-center items-stretch">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative w-1/3 p-[2vw] rounded-[2vw] bg-gradient-to-b from-white/10 to-transparent border border-white/5 backdrop-blur-xl group overflow-hidden flex flex-col justify-between"
            >
              {/* أيقونة الاقتباس - بحجم vw */}
              <div className="absolute -top-[1vw] -right-[1vw] opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={"5vw"} className="text-blue-500" />
              </div>

              <div>
                <div className="flex items-center gap-[1vw] mb-[1.5vw]">
                  {/* صورة الشخص مع التوهج */}
                  <div className="relative shrink-0">
                    <div className="absolute -inset-[0.3vw] bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-[0.5vw] opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <img 
                      src={rev.image} 
                      alt={rev.name} 
                      className="relative w-[5vw] h-[5vw] rounded-full border-[0.2vw] border-[#020617] object-cover"
                    />
                  </div>
                  <div className="text-right overflow-hidden">
                    <h4 className="text-white font-bold text-[1.6vw] lg:text-xl truncate">{rev.name}</h4>
                    <p className="text-blue-400 text-[1.1vw] lg:text-sm truncate">{rev.role}</p>
                  </div>
                </div>

                {/* النجوم - بحجم vw */}
                <div className="flex gap-[0.2vw] mb-[1vw] justify-end">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} size={"1.2vw"} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed text-[1.3vw] lg:text-base text-right italic font-light">
                  "{rev.text}"
                </p>
              </div>

              {/* خط توهج سفلي تفاعلي */}
              <div className="absolute bottom-0 left-0 right-0 h-[0.3vw] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionFixed;