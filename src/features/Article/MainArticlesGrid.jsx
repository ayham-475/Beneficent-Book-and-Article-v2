import React from 'react';
import { motion } from 'framer-motion';
import { User, Clock, MessageSquare, Heart } from 'lucide-react';

const MainArticlesGrid = () => {
  const mainArticles = [
    { id: 1, type: 'large', title: "فن الخطاب والإقناع: دروس من عظماء التاريخ", author: "د. نجوى الياسري", time: "18 د.", img: "https://images.unsplash.com/photo-1549298492-c4161a029b9f?q=80&w=1000", comments: 25, likes: 150 },
    { id: 2, type: 'small', title: "أهمية الفضول في التعلم المستمر", author: "يوسف العبادي", time: "7 د.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600", comments: 8, likes: 45 },
    { id: 3, type: 'small', title: "كيف تنظم وقتك كمثقف عصري؟", author: "لمياء منصور", time: "9 د.", img: "https://images.unsplash.com/photo-1497215728102-afc2b090a1f5?q=80&w=600", comments: 12, likes: 70 },
    { id: 4, type: 'small', title: "تحديات الأدب العربي الحديث", author: "محمد السقاف", time: "11 د.", img: "https://images.unsplash.com/photo-1520104278479-df1e54c60195?q=80&w=600", comments: 10, likes: 60 },
    { id: 5, type: 'large', title: "الذكاء العاطفي: مفتاح النجاح في العلاقات", author: "هدى علي", time: "14 د.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000", comments: 30, likes: 200 },
  ];

  return (
    <section className="py-[6vw] px-[4vw]">
      <h2 className="text-[3.5vw] md:text-[2.5vw] font-black text-white mb-[4vw] border-b-4 border-blue-600/50 pb-[2vw] pl-4">
        استكشاف <span className="text-blue-500">متعمق</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[4vw] md:gap-[3vw]">
        {mainArticles.map((art) => (
          <motion.div 
            key={art.id}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            className={`
              ${art.type === 'large' ? 'md:col-span-2 lg:col-span-2' : ''} /* يجعل المقالة الكبيرة تأخذ عرض 2 عمود في الشاشات الكبيرة */
              bg-[#1e293b]/50 border border-white/10 rounded-[3vw] p-[2.5vw] cursor-pointer group relative overflow-hidden
            `}
          >
            {/* صورة المقال */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2vw] mb-[2vw] bg-black">
              <img 
                src={art.img} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
              />
            </div>

            {/* تفاصيل المقال */}
            <h3 className="text-white font-black text-[4vw] md:text-[2.2vw] leading-tight mb-[1.5vw] group-hover:text-blue-400 transition-colors">
              {art.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-[2vw] gap-y-[1vw] text-gray-400 text-[2.8vw] md:text-[1.1vw]">
              <div className="flex items-center gap-[0.5vw]"><User size={"2.5vw"} className="md:w-[1vw] md:h-[1vw]"/> {art.author}</div>
              <div className="flex items-center gap-[0.5vw]"><Clock size={"2.5vw"} className="md:w-[1vw] md:h-[1vw]"/> {art.time}</div>
              <div className="flex items-center gap-[0.5vw]"><MessageSquare size={"2.5vw"} className="md:w-[1vw] md:h-[1vw]"/> {art.comments}</div>
              <div className="flex items-center gap-[0.5vw]"><Heart size={"2.5vw"} className="md:w-[1vw] md:h-[1vw]"/> {art.likes}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MainArticlesGrid;