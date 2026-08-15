import React, { useEffect, useState,useContext } from 'react';
import { motion } from 'framer-motion';
import {
    Book, FileText, Zap, BarChart3,
    ArrowUpRight, Users, Clock, Plus,
    ChevronLeft, Star
} from 'lucide-react';
import RecentContentCard from './RecentContentCard';
import { AuthContext } from '../../../features/auth/auther';

const CreativeHub = () => {

    const [Books,SetBooks]=useState([])
    const [Articles,SetArticle]=useState([])
 const API_URL = "http://127.0.0.1:8080/rest/Content-articles/";
  const { user } = useContext(AuthContext);

    useEffect(()=>{
        const GetContents=async()=>{
         try {
        const res = await fetch(API_URL);
        const contents = await res.json();

        const Books = contents.filter(
          (item) =>item.user === user.id && item.content_type === "BOOK"
        );
        
        const Articles = contents.filter(
          (item) =>  item.user === user.id &&item.content_type === "ARTICLE"
        );
        
        SetBooks(Books);
        SetArticle(Articles);

      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };
GetContents()
    },[])

    // بيانات وهمية للإحصائيات العامة
    const stats = [
        { label: 'إجمالي منشورات الكتب', value: Books.length, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50',isActive:"نشط",NonActive:"غير نشط" },
        { label: 'إجمالي منشورات المقالات  ', value: Articles.length, icon: BarChart3, color: 'text-[#319795]', bg: 'bg-teal-50',isActive:"نشط",NonActive:"غير نشط" },
        { label: 'عدد المعجبون', value: '1,208', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'المتابعون الجدد', value: '342', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];
    return (
        <div className="w-full max-w-7xl mx-auto mt-20 px-2 md:px-0" dir="rtl">

            {/* 1. الترحيب الذكي - Smart Greeting */}
            <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
                        مرحباً بصانع الأثر! 👋
                    </h1>
                    <p className="text-gray-500 font-bold">إليك ملخص سريع لإمبراطوريتك المعرفية اليوم.</p>
                </motion.div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border-2 border-gray-100 p-4 rounded-3xl font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Plus size={20} /> إضافة محتوى
                    </button>
                </div>
            </header>

            {/* 2. بطاقات الإحصائيات السريعة - Grid System */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40"
                    >
                        <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-gray-400 font-bold text-xs md:text-sm">{stat.label}</p>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-800 mt-1">{stat.value} </h3>
                       { (stat.isActive)?<span className="text-gray-400 font-bold text-xs md:text-sm">نشط</span> :   "" } 
                      { (stat.NonActive=="نشط")? <h3 className="text-2xl md:text-3xl font-black text-gray-800 mt-1">{stat.value} 
                        
                   { (stat.NonActive)?<span className="text-gray-400 font-bold text-xs md:text-sm">ليس نشط</span> :   ""}  </h3>:""}
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 3. قسم إدارة الكتب - Books Management Card */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl"
                >
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10">
                                <Book size={32} className="text-teal-400" />
                            </div>
                            <button className="text-xs font-black bg-teal-500 px-5 py-2 rounded-full hover:bg-teal-400 transition-colors flex items-center gap-2">
                                إدارة مكتبتي <ChevronLeft size={16} />
                            </button>
                        </div>

                        <h2 className="text-4xl font-black mb-4 leading-tight">مركز إدارة المحتوى</h2>
                        <p className="text-gray-400 font-bold mb-8 max-w-sm">
                            لديك <span className="text-teal-500  px-2 rounded-full">{Books.length+Articles.length} محتوى</span> نشطاً. يمكنك متابعة المبيعات، تحديث النسخ، أو إضافة غلاف جديد.
                        </p>

                        <div className="flex gap-4">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex-1">
                                <p className="text-[23px] text-gray-500 uppercase font-black tracking-widest mb-1">الكتب المباعة</p>
                                <p className="text-[16px] font-black bg-teal-500  px-2 rounded-full">450 نسخة</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex-1">
                                <p className="text-[23px] text-gray-500 uppercase font-black tracking-widest mb-1">المقالات المقروءة</p>
                                <p className="text-[16px] font-black bg-teal-500  px-2 rounded-full">4.9/5.0</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                </motion.div>

                <RecentContentCard />
                {/* 5. قسم النشاط الأخير - Recent Activity */}
                <div className="lg:col-span-3 bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-6 md:p-10 border border-white shadow-2xl shadow-gray-200/50">

                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-[#319795]/10 rounded-2xl">
                                <Clock className="text-[#319795]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-800">آخر النشاطات</h2>
                                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-tighter">متابعة فورية لكل التحديثات</p>
                            </div>
                        </div>
                        <button className="text-sm font-black text-[#319795] bg-white px-5 py-2 rounded-2xl border border-gray-100 shadow-sm hover:bg-[#319795] hover:text-white transition-all duration-300">
                            عرض السجل الكامل
                        </button>
                    </div>

                    {/* منطقة السكرول المخفي */}
                    <div className="max-h-[420px] overflow-y-auto no-scrollbar pr-1 pl-1 space-y-4">
                        {[
                            { id: 1, title: 'تم نشر مقال جديد: مستقبل الـ AI', type: 'article', time: 'منذ 5 دقائق', status: 'success' },
                            { id: 2, title: 'تعديل سعر كتاب "علم النفس الرقمي"', type: 'book', time: 'منذ ساعتين', status: 'warning' },
                            { id: 3, title: 'تعليق جديد من مريم على مقال التصميم', type: 'comment', time: 'منذ 4 ساعات', status: 'info' },
                            { id: 4, title: 'تم بيع 5 نسخ من كتاب "ريادة الأعمال"', type: 'sale', time: 'منذ 6 ساعات', status: 'success' },
                            { id: 5, title: 'مسودة مقال جديدة: تجربة المستخدم', type: 'article', time: 'منذ يوم', status: 'default' },
                        ].map((activity, index) => (
                            <div
                                key={activity.id}
                                className="group flex items-center gap-4 p-5 bg-white/50 rounded-[2rem] border border-transparent hover:border-[#319795]/20 hover:bg-white hover:shadow-xl hover:shadow-gray-200/30 transition-all duration-500 cursor-pointer"
                            >
                                {/* Icon / Avatar with Dynamic Color Status */}
                                <div className="relative">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl transition-transform group-hover:scale-110 duration-500 ${activity.type === 'book' ? 'bg-orange-50 text-orange-500' :
                                            activity.type === 'article' ? 'bg-teal-50 text-teal-500' :
                                                'bg-blue-50 text-blue-500'
                                        }`}>
                                        {activity.type === 'book' ? <Book size={24} /> : <FileText size={24} />}
                                    </div>
                                    {/* نقطة الحالة النابضة (Pulsing Status Dot) */}
                                    <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-white animate-pulse ${activity.status === 'success' ? 'bg-green-500' :
                                            activity.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                                        }`}></span>
                                </div>

                                {/* Info Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm md:text-base font-black text-gray-800 group-hover:text-[#319795] transition-colors">
                                            {activity.title}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-[10px] font-black text-[#319795]/70 uppercase tracking-widest">تحقق الآن</span>
                                    </div>
                                </div>

                                {/* Action Arrow */}
                                <div className="p-2 rounded-xl bg-gray-50 text-gray-300 group-hover:bg-[#319795] group-hover:text-white transition-all">
                                    <ChevronLeft size={18} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeHub;