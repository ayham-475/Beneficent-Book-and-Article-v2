// src/components/LandingPage/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'د. محمد الشمري',
    role: 'باحث ومؤلف أثري',
    comment: 'منصة Beneficent غيّرت طريقة نشري للمقالات العلمية. سهولة الوصول إلى الجمهور والشغف الموجود في مجتمع المنصة لا يُقدّر بثمن.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=b1'
  },
  {
    id: 2,
    name: 'ريم العتيبي',
    role: 'قارئة شغوفة',
    comment: 'تصميم التجربة والواجهة مريح جداً للعين أثناء القراءة الطويلة. تجربة البحث عن كتب ومؤلفين جديدة أصبحت متعتي اليومية.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=b2'
  },
  {
    id: 3,
    name: 'مهند الزهراني',
    role: 'كاتب محتوى وتقني',
    comment: 'المزيج بين المقالات والكتب في مكان واحد مع تجربة مستخدم سريعة يجعل هذه المنصة في صدارة المبادرات الرقمية العربية.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=b3'
  }
];

const Testimonials = () => {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#020617] overflow-hidden">
      
      {/* خلفية جمالية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        
        {/* العناوين */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-white"
          >
            ماذا يقول <span className="text-amber-400">مبدعونا وقرّاؤنا؟</span>
          </motion.h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            آراء واقعية من أشخاص يعتمدون على المنصة يومياً في القراءة والنشر.
          </p>
        </div>

        {/* شبكة الآراء */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-amber-400/30 transition-all duration-300 group shadow-2xl"
            >
              <Quote size={40} className="text-amber-400/20 absolute top-6 left-6 group-hover:text-amber-400/40 transition-colors" />

              <div>
                {/* النجوم */}
                <div className="flex gap-1 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>

                {/* التعليق */}
                <p className="text-gray-300 leading-relaxed text-base mb-8 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* صاحب التعليق */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className="w-12 h-12 rounded-full object-cover border border-amber-400/30"
                />
                <div>
                  <h4 className="text-white font-bold text-base group-hover:text-amber-300">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;