import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../features/auth/auther';
import { ContentDataContext } from './ArticlesHome/ArticlesContext';

const RecentContentCard = () => {
  const { user } = useContext(AuthContext);
  const [Contents, Setcontents] = useState([])
  const [LastTime, SetLastTime] = useState([])
  const API_URL = "http://127.0.0.1:8080/rest/Content-articles/";


  useEffect(() => {
    const GetContents = async () => {
      try {
        const res = await fetch(API_URL);
        const contents = await res.json();
        Setcontents(contents);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };
    GetContents()
  }, [])
  // console.log("content ",Contents   )


  function ChangeLastTime(time) {
    SetLastTime(time)
  }
  const navigate = useNavigate();
  // 1. تحديد النطاق الزمني (آخر 7 أيام)
  const today = new Date();
  const lastWeekDate = new Date();
  lastWeekDate.setDate(today.getDate() - LastTime);
  // console.log("tody ",today,"lastWeekDate  :",lastWeekDate,"user  :",user)

  // 2. تصفية جلب "كل" محتويات المستخدم المنشورة هذا الأسبوع فقط
  const myRecentContents = Contents.filter((item) => {
    const isMyContent = item.user === user.id;
    const contentDate = new Date(item.created_at);
    const isWithinLastWeek = contentDate >= lastWeekDate && contentDate <= today;

    return isMyContent && isWithinLastWeek;
  });

  // 3. ترتيبها من الأحدث للأقدم للعرض المنظم
  const sortedContents = [...myRecentContents].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const getContentTypeText = (type) => {
    return type === "BOOK" ? "كتاب" : "مقال";
  };

  const getStatusText = (status) => {
    if (status === "PUBLISHED") return "منشور";
    if (status === "DRAFT") return "مسودة";
    return status;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-[#319795] rounded-[3rem] p-8 text-white shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-between"
    >
      <div className="relative z-10 h-full flex flex-col justify-between gap-6">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-black/10 backdrop-blur-md rounded-3xl border border-white/20">
              <FileText size={32} />
            </div>
            <button
              onClick={() => navigate('/ArticlesManager')}
              className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all cursor-pointer"
            >
              <ArrowUpRight size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg max-w-xs mx-auto">
            <button   onClick={(e)=>{ChangeLastTime(1)}} className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-slate-800 bg-white/40 hover:bg-white/70 active:scale-95 transition-all duration-200 backdrop-blur-sm shadow-sm border border-white/30">
              يوم
            </button>

            <button  onClick={(e)=>{ChangeLastTime(7)}} className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-slate-800 bg-white/40 hover:bg-white/70 active:scale-95 transition-all duration-200 backdrop-blur-sm shadow-sm border border-white/30">
              أسبوع
            </button>

            <button  onClick={(e)=>{ChangeLastTime(30)}} className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-slate-800 bg-white/40 hover:bg-white/70 active:scale-95 transition-all duration-200 backdrop-blur-sm shadow-sm border border-white/30">
              شهر
            </button>
          </div>

          <h2 className="text-3xl font-black mb-3">منشورات الأسبوع الحالي</h2>
          <p className="text-teal-100 font-bold text-sm leading-relaxed mb-4">
            لقد قمت بنشر <span className="text-white">{myRecentContents.length} مواد رقمية</span> خلال السبعة أيام الماضية.
          </p>
        </div>

        {/* عرض قائمة كل المحتويات المنشورة هذا الأسبوع ديناميكياً */}
        <div className="space-y-3 max-h-[200px] overflow-y-auto no-scrollbar pr-1">
          {myRecentContents.length > 0 ? (
            myRecentContents.map((content) => (
              <div key={content.content_id || content.id} className="flex items-center gap-3 bg-black/15 p-3 rounded-2xl border border-white/5">
                <div className={`w-2 h-2 rounded-full animate-pulse ${content.status === 'PUBLISHED' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-xs font-bold truncate">
                  {getContentTypeText(content.content_type)}: {content.title} ({getStatusText(content.status)})
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3 bg-black/10 p-3 rounded-2xl">
              <div className="w-2 h-2 bg-yellow-500/50 rounded-full"></div>
              <span className="text-xs font-bold">لم تقم بنشر أي كتب أو مقالات هذا الأسبوع</span>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => navigate('/ArticleEditor')}
            className="w-full py-4 bg-white text-[#319795] hover:bg-teal-50 rounded-2xl font-black text-sm shadow-xl transition-colors cursor-pointer mt-2"
          >
            دخول المحرر
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentContentCard;