import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Activity, BarChart3, Bell } from 'lucide-react';
import StatCard from './Dashboard/StatCard';
import RecentUsers from './Dashboard/RecentUsers'

const Dashboard = () => {

  const [CountUser, SetCountUser] = useState(0);
  const [CountConent, SetCountContent] = useState(0);
  const [CountOrganizers,SetCountOrganizers]=useState(0)
  const  GetCountUser=async()=>{
   const Users=await fetch("http://127.0.0.1:8080/rest/Users/");
   const DataUser=await Users.json();
   SetCountUser(DataUser)
  
  }

  const GetCountContent=async()=>{
   const content=await fetch("http://127.0.0.1:8080/rest/Content-articles/");
   const DataContent=await content.json();
   SetCountContent(DataContent)
  }
 

  function GetCountOrganizers(UsersOrganizerd){
    SetCountOrganizers(UsersOrganizerd)

  }
  const statsData = [
    {
      title: " المستخدمين",
      value: CountUser.length,
      change: "Live Now",
      icon: <Users size={24} />,
      color: { text: "text-blue-400", bg: "bg-blue-500/20", glow: "bg-blue-500", shadow: "bg-blue-500/20", dot: "bg-blue-400", brand: "blue-500" }
    },
    {
      title: "المحتوى المعتمد",
      value: CountConent.length,
      change: "Updated",
      icon: <FileText size={24} />,
      color: { text: "text-emerald-400", bg: "bg-emerald-500/20", glow: "bg-emerald-400", shadow: "bg-emerald-500/20", dot: "bg-emerald-400", brand: "emerald-500" }
    },
    {
      title: "معدل النشاط",
      value: "78%",
      change: "Optimal",
      icon: <Activity size={24} />,
      color: { text: "text-rose-400", bg: "bg-rose-500/20", glow: "bg-rose-400", shadow: "bg-rose-500/20", dot: "bg-rose-400", brand: "rose-500" }
    },
    {
      title: "طلبات الانضمام",
      value: CountOrganizers,
      change: "Pending",
      icon: <Users size={24} />,
      color: { text: "text-amber-400", bg: "bg-amber-500/20", glow: "bg-amber-400", shadow: "bg-amber-500/20", dot: "bg-amber-400", brand: "amber-500" }
    }
  ];

  useEffect(()=>{
  GetCountUser();
  GetCountContent();

  },[])
  
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200 font-sans flex overflow-hidden" dir="rtl">
      {/* 1. السايدبار العائم - لا يقطع مساحة الشاشة */}


      {/* 2. المحتوى الرئيسي - استعدنا العرض الكامل pr-[90px] فقط للأيقونات */}
      <main className="flex-1 pr-0 md:pr-[85px] pl-4 md:pl-10 py-6 md:py-1 0 h-screen overflow-y-auto no-scrollbar">

        {/* Topbar - استعادة التصميم الأصلي */}



        {/* Banner - استعادة الارتفاع والفخامة (3rem) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10 relative h-64 rounded-[3rem] overflow-hidden border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.05)]"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/30 via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000"
            className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125"
            alt="Banner"
          />
          <div className="relative z-20 h-full flex flex-col justify-center px-12">
            <h1 className="text-5xl font-black text-white mb-4 italic drop-shadow-2xl">أهلاً بك يا قائد 👋</h1>
            <p className="text-emerald-400/90 font-bold max-w-md leading-relaxed text-sm">
              إليك نظرة شاملة على ما حدث في "النخبة" خلال الـ 24 ساعة الماضية. الأمور تسير بشكل ممتاز!
            </p>
          </div>
        </motion.div>

        {/* Stats Grid - مع ميزة الـ 2 بطايق بالضبط في الموبايل */}
        <div className="w-full mb-12">
          <style dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 767px) {
              .mobile-neon-slider {
                display: flex !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                gap: 12px !important;
                padding-bottom: 25px !important;
                -ms-overflow-style: none;
                scrollbar-width: none;
                scroll-snap-type: x mandatory;
              }
              .mobile-neon-slider::-webkit-scrollbar { display: none; }
              .mobile-neon-slider > div {
                flex: 0 0 calc(50% - 6px) !important;
                scroll-snap-align: start;
              }
            }
          `}} />
          <div className="mobile-neon-slider grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((item, index) => (
              <div key={index}>
                <StatCard {...item} delay={0.1 * (index + 1)} />
              </div>
            ))}
          </div>
        </div>

        {/* Charts & Recent Users Section */}


        {/*Recent Users - إضافة سكرول داخلي احترافي */}
        {/* Charts & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-[#161616] p-6 md:p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <h3 className="text-white font-black text-xl mb-10">منحنى نمو المنصة</h3>
            <div className="h-[300px] w-full border-b border-l border-white/5 flex items-end justify-around px-4">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.1 }}
                  key={i} className="w-8 md:w-12 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-lg shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                />
              ))}
            </div>
          </div>
          <RecentUsers GetCountOrganizers={GetCountOrganizers}/>
        </div>


      </main>
    </div>
  );
};

export default Dashboard;