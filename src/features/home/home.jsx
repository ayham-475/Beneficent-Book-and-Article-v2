// src/components/LandingPage/LandingMain.jsx
import React from 'react';
import { motion } from 'framer-motion';

// استيراد المكونات المجزأة
// import Navbar from '../Global/Navbar'; // افترضنا وجوده في مجلد عام
import MainHomeHero from './Hero';
import ArticleHero from '../Article/ArticleHero';
import HowItWorks from './HowItWorks';
import TopPublishers from './TopPublishers';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';
import Header from '../../App/Public/Layout/Hedder'


const LandingMain = () => {
  return (
    <div className="relative bg-[#020617] min-h-screen w-full overflow-hidden text-white anti-aliased">
      
      {/* شريط التنقل العلوي */}
      <Header />

      {/* المحتوى الرئيسي مرتباً سردياً */}
      <main>
        {/* 1. قسم الترحيب والبحث */}
        {/* <MainHomeHero /> */}
        <ArticleHero /> 
        {/* 2. قسم كيف تعمل المنصة */}
        <HowItWorks />

        {/* 3. قسم أفضل الناشرين */}
        <TopPublishers />

        {/* 4. قسم آراء المستخدمين */}
        <Testimonials />

        {/* 5. قسم الحث النهائي للتسجيل */}
        <FinalCTA />
      </main>

      {/* تذييل الصفحة */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingMain;