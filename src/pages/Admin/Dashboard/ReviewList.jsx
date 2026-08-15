import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, RefreshCcw } from 'lucide-react';

const ReviewList = ({ ChangeContentPreviewData }) => {
  // 1. حالة تخزين البيانات وحالة التحميل
  const [dbUsers, setDbUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8080/rest/Content-articles/";

  // 2. دالة جلب البيانات من السيرفر
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      
      // جلب من سجلوا في آخر 24 ساعة فقط
      const filtered = filterRecent(data, 24); 
      setDbUsers(filtered);
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. دالة الفلترة الزمنية (مهمة جداً للفلترة في المتصفح)
  const filterRecent = (usersList, hours) => {
    const now = new Date();
    const startTime = now.getTime() - (hours * 60 * 60 * 1000);
    
    return usersList.filter(user => {
      const isNotActive=user.status!="PUBLISHED";
      // نستخدم createdAt أو الحقل الزمني القادم من السيرفر
      const userDate = new Date(user.created_at).getTime();
      const isRecent= userDate >= startTime;
      return isNotActive&&isRecent;
    });
  };

  // 4. تشغيل الجلب عند فتح المكون لأول مرة
  useEffect(() => {
    fetchUsers();   
  
     }, []);


  return (
    <div className="bg-[#161616] mt-10 rounded-[2.5rem] border border-white/5 h-[calc(100vh-100px)] flex flex-col overflow-hidden shadow-2xl sticky top-8">
      
      {/* رأس القائمة الثابت */}
      <div className="p-7 border-b border-white/5 bg-[#1a1a1a]/50 backdrop-blur-xl z-20">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-black text-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,1)]" />
            طلبات الانتظار
          </h3>
          <div className="flex items-center gap-3">
            {/* زر التحديث اليدوي */}
            <button 
              onClick={fetchUsers}
              className="text-gray-500 hover:text-white transition-colors p-1"
            >
              <RefreshCcw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {dbUsers.length} جديد
            </span>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 font-bold">قم باختيار محتوى للمراجعة والتدقيق</p>
      </div>

      {/* منطقة المحتوى */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scroll-smooth hide-scrollbar relative">
        
        {loading ? (
          /* حالة التحميل - Spinner احترافي */
          <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
             <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">تحديث البيانات...</p>
          </div>
        ) : dbUsers.length === 0 ? (
          /* حالة عدم وجود بيانات */
          <div className="flex flex-col items-center justify-center h-full text-center p-10">
             <p className="text-gray-600 text-xs font-bold leading-relaxed">
               لا توجد طلبات جديدة <br/> سجلت في الـ 24 ساعة الماضية
             </p>
          </div>
        ) : (
          /* عرض القائمة بنجاح */
          dbUsers.map((item) => (
        
           
            <motion.button
              key={item.id || item._id}
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => ChangeContentPreviewData(item)}
              className="w-full text-right p-4 rounded-[1.8rem] bg-[#0f0f0f] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden shadow-lg"
            >
              <div className="flex gap-4 items-center relative z-10">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-emerald-500/50 transition-all">
                  <img src={item.img_path || "https://via.placeholder.com/100"} className="w-full h-full object-cover" alt="" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-[13px] truncate mb-1 text-gray-300 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[9px] font-bold">
                     <span className="text-gray-600">{item.author_id}</span>
                     <span className="w-1 h-1 bg-gray-800 rounded-full" />
                     <span className="text-emerald-500/70 uppercase tracking-tighter">{item.TextContent}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">
                  {/* عرض الوقت بشكل بسيط */}
                  {new Date(item.created_at).toLocaleTimeString('ar-SA', {hour:'2-digit', minute:'2-digit'})}
                </span>
                <ChevronLeft size={14} className="text-gray-700 group-hover:text-emerald-400" />
              </div>
            </motion.button>
          ))
        )}
      </div>

      {/* تأثير التلاشي السفلي */}
      <div className="p-4 bg-gradient-to-t from-[#161616] to-transparent pointer-events-none absolute bottom-0 left-0 right-0 h-12" />
    </div>
  );
};

export default ReviewList;



