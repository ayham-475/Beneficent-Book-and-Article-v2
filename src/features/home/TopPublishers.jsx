// src/components/LandingPage/TopPublishers.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, UserPlus } from 'lucide-react';

// بيانات تجريبية - سيتم جلبها من الـ Backend لاحقاً
const publishers = [
  { id: 1, name: 'دار المعرفة الرقمية', books: 125, rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=a1' },
  { id: 2, name: 'أحمد صالح صالح', books: 45, rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=a2' },
  { id: 3, name: 'مؤسسة اقرأ للنشر', books: 88, rating: 4.7, avatar: 'https://i.pravatar.cc/150?u=a3' },
  { id: 4, name: 'سارة العلي', books: 32, rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=a4' },
];

const TopPublishers = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="relative z-10 container mx-auto max-w-7xl">
        
        {/* العنوان */}
        <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            نخبة <span className="text-amber-400">الناشرين</span>
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-amber-400 text-sm md:text-base font-bold flex items-center gap-2 hover:text-amber-300 transition-colors"
          >
            عرض الكل <UserPlus size={18} />
          </motion.button>
        </div>

        {/* شبكة الناشرين المتجاوبة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {publishers.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-center hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group shadow-lg shadow-black/10"
            >
              {/* الصورة الرمزية مع تأثير دائري متوهج */}
              <div className="relative inline-block mb-6">
                <img 
                  src={pub.avatar} 
                  alt={pub.name} 
                  className="w-24 h-24 rounded-full border-4 border-white/10 object-cover group-hover:border-amber-400/50 transition-all duration-300"
                />
                <div className="absolute -inset-2 bg-amber-400/20 blur-[15px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* الاسم والمعلومات */}
              <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-amber-300">
                {pub.name}
              </h3>
              <p className="text-sm text-gray-400 mb-4 font-medium">
                {pub.books} كتاب ومقال
              </p>

              {/* التقييم */}
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-full">
                <Star size={16} className="text-amber-400" fill="currentColor" />
                <span className="text-amber-300 font-bold text-sm">{pub.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPublishers;