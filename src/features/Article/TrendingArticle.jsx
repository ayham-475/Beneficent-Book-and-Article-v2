import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ChevronLeft } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { ContentDataContext } from '../../pages/User/Content Adminstorition/ArticlesHome/ArticlesContext';

const TrendingArticles = ({ title,Articles }) => {
 
  return (
    <section className="py-[10vw] md:py-[6vw] px-[4vw] bg-[#020617]" dir="rtl">
      {/* رأس القسم */}
      <div className="flex justify-between items-end mb-[6vw] md:mb-[3vw]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 animate-pulse">
            <Flame size={"4vw"} className="md:w-[2vw] md:h-[2vw] fill-amber-500" />
            <span className="text-[3.2vw] md:text-[1.2vw] font-black uppercase tracking-tighter">تريند اليوم</span>
          </div>
          <h2 className="text-[6.5vw] md:text-[3.5vw] font-black text-white leading-tight">
            {title}
          </h2>
        </div>
        <button className="flex items-center gap-1 text-[3.5vw] md:text-[1.2vw] text-gray-400 hover:text-blue-500 transition-all group">
          مشاهدة الكل <ChevronLeft size={"4vw"} className="md:w-[1.4vw] group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      {/* حاوية السلايدر */}
      <div className="relative overflow-visible">
        <div 
          className="flex flex-row gap-[3vw] md:gap-[2.5vw] overflow-x-auto no-scrollbar scroll-smooth pb-[5vw] md:pb-[2vw] md:justify-center"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {/* كود إخفاء السكرول بار لمتصفحات Chrome/Safari */}
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

          {/* عرض المقالات المصفاة فقط */}
          {Articles.length > 0 ? (
            Articles.map((article) => (
              <Link 
                to={`/ArticleDetail/${article.content_id}`} 
                key={article.id} 
                className="flex-none w-[29.3vw] md:w-[21vw]"
              >
                <motion.div 
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-[#1e293b]/30 border border-white/5 rounded-[4vw] md:rounded-[2.5vw] p-[1.5vw] cursor-pointer group/card transition-all duration-500 hover:bg-[#1e293b]/60 hover:border-blue-500/30 shadow-xl"
                >
                  {/* صورة المقالة */}
                  <div className="relative aspect-[4/5] md:aspect-[16/10] rounded-[3vw] md:rounded-[1.5vw] overflow-hidden mb-[2.5vw] md:mb-[1.5vw] bg-[#0f172a]">
                    <img 
                      src={article.img_path} 
                      loading="lazy"
                      alt={article.title}
                      className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-1000 ease-in-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* تفاصيل المقالة */}
                  <div className="space-y-[1.5vw] md:space-y-[0.8vw]">
                    <h3 className="text-white font-black text-[3.2vw] md:text-[1.5vw] leading-[1.3] h-[8.5vw] md:h-auto overflow-hidden line-clamp-2 group-hover/card:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <div className="flex flex-col gap-[1vw] md:flex-row md:items-center md:justify-between text-gray-500 font-bold">
                      <div className="flex items-center gap-[0.8vw] text-[2.6vw] md:text-[1vw]">
                        <span className="text-blue-400">@</span>
                        <span className="truncate max-w-[15vw] text-gray-400">الكاتب {article.author_id}</span>
                      </div>
                      <div className="flex items-center gap-[0.5vw] text-[2.4vw] md:text-[0.9vw] text-gray-600">
                        <Clock size={"2.5vw"} className="md:w-[1vw]" /> <span>{article.created_at?.split('T')[0] || article.created_at}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center py-10 w-full">
              <p className="text-gray-500 font-bold text-sm animate-pulse">لا توجد مقالات متوفرة حالياً...</p>
            </div>
          )}
        </div>

        {/* التظليل الجانبي */}
        <div className="absolute top-0 right-0 h-full w-[10vw] bg-gradient-to-l from-[#020617] to-transparent pointer-events-none z-10 hidden md:block"></div>
        <div className="absolute top-0 left-0 h-full w-[10vw] bg-gradient-to-r from-[#020617] to-transparent pointer-events-none z-10 hidden md:block"></div>
      </div>
    </section>
  );
};

export default TrendingArticles;