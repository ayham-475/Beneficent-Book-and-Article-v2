import React from 'react';
// import Sidebar from "../../pages/Admin/Dashboard/Sidebar";
import { PremiumHero } from "./PremiumHero";
import { TrustSignals } from "./TrustSignals";
import BookCard from "./ProductGrid";
import Hedder from'../../App/Public/Layout/Hedder'
import Footer from "../../App/Public/Layout/Fotter";

const ReaderCategoryView = () => {
  const books = [
    { title: "سيكولوجية المال", author: "مورجان هاوسل", price: "19.99", oldPrice: "25.00", cover: "https://images.unsplash.com/photo-1592492159418-39f319320569?w=400", badge: "الأكثر مبيعاً" },
    { title: "الأب الغني والأب الفقير", author: "روبرت كيوساكي", price: "15.00", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", badge: "كتاب الأسبوع" },
    { title: "فكر وازدد ثراءً", author: "نابليون هيل", price: "12.50", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400", badge: "كلاسيك" },
    { title: "نموذج العمل الشخصي", author: "تيم كلارك", price: "22.00", cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400", badge: "مميز" },
    { title: "مبدأ 80/20", author: "ريتشارد كوخ", price: "18.00", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400", badge: "تطوير" },
    { title: "عادات ذرية", author: "جيمس كلير", price: "20.00", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400", badge: "الأكثر طلباً" },
  ];

  return (
    <>
      <Hedder />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .snap-x-mandatory { scroll-snap-type: x mandatory; }
        .snap-item { scroll-snap-align: start; }

        @media (max-width: 768px) {
          /* سر الجمال: جعل الصورة تحافظ على تناسبها مع تقليل الارتفاع */
          .mobile-card-compact img {
            height: 180px !important; /* ارتفاع معتدل لرؤية الغلاف بوضوح */
            aspect-ratio: 3/4 !important; 
            object-fit: cover !important;
            border-radius: 12px !important;
          }
          
          /* إزالة أي مسافات زائدة في البطاقة لجعلها "Compact" */
          .mobile-card-compact > div {
            height: auto !important;
            min-height: unset !important;
            padding: 10px !important;
            background: #111112 !important; /* تعميق لون البطاقة لتبرز الصورة */
            border-radius: 20px !important;
          }

          /* تنسيق النصوص لتكون أنيقة تحت الصورة مباشرة */
          .mobile-card-compact h3, .mobile-card-compact h2 {
            font-size: 0.9rem !important;
            font-weight: 800 !important;
            margin-top: 8px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .mobile-card-compact p {
            font-size: 0.75rem !important;
            color: #718096 !important;
            margin-top: 2px !important;
          }
        }
      `}} />

      <div className="min-h-screen  bg-[#080809] text-white flex overflow-hidden" dir="rtl">
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          
          <PremiumHero category={{ name: "المال والأعمال", subscribers: "50,000+", bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200" }} />

          <div className="max-w-7xl mx-auto px-5 md:px-12">
            
            <TrustSignals />

            <div className="flex justify-between items-end mb-6 md:mb-10 pt-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">إصدارات النخبة</h2>
                <div className="h-1 w-10 bg-emerald-500 mt-2 rounded-full"></div>
              </div>
            </div>

            {/* السلايدر - بطاقتين واضحتين جداً في الهاتف */}
            <div className="relative mb-20 md:mb-32">
              <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar snap-x-mandatory pb-6">
                {books.map((book, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 snap-item mobile-card-compact
                               w-[46%] md:w-[calc(25%-1.5rem)]"
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mb-20 md:mb-32">
              <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar snap-x-mandatory pb-6">
                {books.map((book, idx) => (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 snap-item mobile-card-compact
                               w-[46%] md:w-[calc(25%-1.5rem)]"
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            </div>

            {/* قسم العرض الحصري */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-950 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 mb-20 relative overflow-hidden group border border-white/5 shadow-2xl">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-right">
                    <span className="bg-emerald-400/20 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black mb-4 inline-block uppercase tracking-widest">عرض خاص</span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">باقة الرواد <br className="hidden md:block"/> بخصم 40%</h2>
                  </div>
                  <button className="w-full md:w-auto bg-emerald-500 text-black px-12 py-4 rounded-2xl font-black text-lg hover:bg-emerald-400 transition-all shadow-xl">
                    اغتنم العرض
                  </button>
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ReaderCategoryView;