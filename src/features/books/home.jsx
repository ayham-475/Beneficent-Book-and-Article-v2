import React from 'react';
import Hero from './Hero';
import StatsBar from './StatsBar';
import CategorySliderResponsive from './Features';
import BooksStore from './BooksGrid';
import EliteAuthors from '../Article/EliteAuthors';
// import FlashSales from './Earnings';
import PromoBanner from './CTA';
import { Link } from 'react-router-dom';
  import Header from '../../App/Public/Layout/Hedder';
import Footer from '../../App/Public/Layout/Fotter';
import {
  Plus, Search, Book, ShieldCheck, Globe,
  ArrowUpRight, Zap
} from 'lucide-react';
const HomeBook = () => {
  
  return (
    <div className="bg-[#020617] min-h-screen" dir="rtl">

      <Header />
      <Hero />
      <PromoBanner />
      <StatsBar />
      <CategorySliderResponsive />
      <BooksStore />
      <BooksStore />
      <EliteAuthors  contentType="BOOK"   />

      {/* 4. قسم "لماذا نحن؟" (Footer Features) */}
      <div className="bg-black rounded-[2rem] p-8 md:p-12 mx-15  text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-4xl font-black mb-4">أدوات احترافية بين يديك</h2>
            <p className="text-gray-400 font-bold max-w-md">نحن لا نوفر مجرد جدول، بل منظومة كاملة تدعم رحلتك من الكتابة إلى البيع العالمي.</p>
          </div>
            <Link to="/login" >
          <button className="px-10 py-5 bg-[#319795] rounded-3xl font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl shadow-[#319795]/40">
            ابدأ النشر الآن <ArrowUpRight />
          </button>
          </Link>
        </div>
        {/* Decorative Element */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#319795]/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <Footer />

    </div>
  );
};

export default HomeBook;