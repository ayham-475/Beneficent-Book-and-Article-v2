import React, { use, useContext, useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Book, ShieldCheck, Globe,
  ArrowUpRight, Zap
} from 'lucide-react';
import BooksTable from './BooksTable';
import { ContentDataContext } from '../ArticlesHome/ArticlesContext';
import { AuthContext } from '../../../../features/auth/auther';

import { Link } from 'react-router-dom';
const SuperBooksManager = () => {
  const [InputSearch, SetInputSerch] = useState("");
    const [Books, SetBook] = useState([]);
  const { user } = useContext(AuthContext);
      const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";

 useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(urlContents);
        const contents = await res.json();
        const userBooks = contents.filter(
          (item) => item.user === user.id && item.content_type === "BOOK"
        );
        
        SetBook(userBooks);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };

    if (user?.id) fetchArticles();
  }, [user?.id]);
  const BooKsSerched = Books.filter((book) => {
    const serchedname = InputSearch.toLowerCase();
    return (
      (book.title && book.title.toLowerCase().includes(serchedname)) ||
      (book.content_id && String(book.content_id).toLowerCase().includes(serchedname))
    );


  });
          console.log("userBookqqqs : ",BooKsSerched)


  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 mt-20" dir="rtl">

      {/* 1. قسم مميزات الإدارة (Platform Features) - الإبداع هنا */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "حماية الملكية", desc: "تشفير كامل لمحتوى كتبك لضمان عدم النسخ.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
          { title: "تحليلات عالمية", desc: "تتبع جغرافيا القراء ومصادر المبيعات فوراً.", icon: Globe, color: "text-[#319795]", bg: "bg-teal-50" },
          { title: "توزيع ذكي", desc: "تحويل تلقائي لصيغ الكتب (PDF, Epub).", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
        ].map((feat, i) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={i}
            className="bg-white/60 backdrop-blur-xl p-6 r ounded-[2.5rem] border border-white shadow-xl flex items-start gap-4"
          >
            <div className={`${feat.bg} ${feat.color} p-4 rounded-2xl`}>
              <feat.icon size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-800 mb-1">{feat.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-bold">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* 2. رأس الجدول (Table Header) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-black p-3 rounded-2xl text-white">
            <Book size={24} />
          </div>
          <h2 className="text-2xl font-black text-gray-800">إدارة المخطوطات</h2>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input value={InputSearch} onChange={(e) => { SetInputSerch(e.target.value) }}
              type="text" placeholder="بحث عن كتاب..." className="w-full bg-gray-50 border-none rounded-2xl py-3 pr-10 text-sm focus:ring-2 ring-[#319795]/20" />
          </div>
          <Link to="/AddDataContent" >
            <button className="bg-[#319795] text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2">
              <Plus size={18} /> جديد
            </button>
          </Link>
        </div>
      </div>

      <BooksTable BooKsSerched={ (BooKsSerched)?BooKsSerched:Books} />

      {/* 4. قسم "لماذا نحن؟" (Footer Features) */}
      <div className="bg-black rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <h2 className="text-2xl md:text-4xl font-black mb-4">أدوات احترافية بين يديك</h2>
            <p className="text-gray-400 font-bold max-w-md">نحن لا نوفر مجرد جدول، بل منظومة كاملة تدعم رحلتك من الكتابة إلى البيع العالمي.</p>
          </div>
          <button className="px-10 py-5 bg-[#319795] rounded-3xl font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl shadow-[#319795]/40">
            ابدأ النشر الآن <ArrowUpRight />
          </button>
        </div>
        {/* Decorative Element */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#319795]/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

    </div>
  );
};

export default SuperBooksManager;