import React, { useEffect, useState } from 'react';
import TrendingArticles from './TrendingArticle';
import ArticleCategories from './ArticleCategories';
import EliteAuthors from './EliteAuthors';
import ArticleHero from './ArticleHero';
import ArticleCTA from './ArticleCTA';// قسم إضافي للدعوة للنشر
import Header from '../../App/Public/Layout/Hedder';
import Footer from '../../App/Public/Layout/Fotter';
import { article } from 'framer-motion/client';
const Articles = () => {
  const [Articles,SetArticles]=useState([])
    const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";
  useEffect(()=>{

const GetContent=async()=>{
    const rescontentsArricles= await fetch(urlContents);
    const ContentArticles = await rescontentsArricles.json();
    const articles=ContentArticles.filter((item)=>{
     return  item.content_type=="ARTICLE";

    })
    SetArticles(articles)    
  }

GetContent()

},[])
  return (
    <div className="bg-[#020617] min-h-screen text-white font-sans overflow-x-hidden" dir="rtl">
      <Header />
      {/* <ArticleHero /> المقالة الرئيسية في الأعلى */}
      <ArticleHero />   
      <ArticleCategories />
      <TrendingArticles Articles={Articles} title={"مقالات تشكل مستقبلك "}  /> {/* مقالات شائعة بسلايدر */}
      <TrendingArticles Articles={Articles} title={"المقالات الاكثر شهرة هذا الاسبوع"} /> {/* مقالات شائعة بسلايدر */}
      <TrendingArticles Articles={Articles}  title={"المقالات الحديثة"}  /> {/* مقالات شائعة بسلايدر */}
      <TrendingArticles Articles={Articles}  title={"المقالات الاكثر تقييما هذا الاسبوع"}   /> {/* مقالات شائعة بسلايدر */}
      <EliteAuthors contentType="ARTICLE"  /> {/* نخبة الكتاب */}
      <ArticleCTA /> {/* زر لنشر مقالات جديدة */}
      <Footer />
    </div>
  );
};

export default Articles;