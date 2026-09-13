import React from 'react';
import { motion } from 'framer-motion';

import ArticleHero from '../Article/ArticleHero';
import HowItWorks from './HowItWorks';
import TopPublishers from './TopPublishers';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';
import Header from '../../App/Public/Layout/Hedder';
import Footer from './Footer';

const LandingMain = () => {
  return (
    <div className="relative bg-[#020617] min-h-screen w-full overflow-hidden text-white antialiased">
      {/* شريط التنقل العلوي المتجاوب */}
      <Header />

      {/* المحتوى الرئيسي */}
      <main className="pt-20 sm:pt-24">
        {/* 1. قسم الترحيب والبحث */}
        <ArticleHero /> 
        
        {/* 2. قسم كيف تعمل المنصة */}
        <HowItWorks />

        {/* 3. قسم أفضل الناشرين والكُتّاب */}
        <TopPublishers />

        {/* 4. آراء القرّاء والمجتمع */}
        <Testimonials />

        {/* 5. دعوة الانضمام والمشاركة */}
        <FinalCTA />
      </main>

      {/* تذييل الصفحة الفاخر */}
      <Footer />
    </div>
  );
};

export default LandingMain;
