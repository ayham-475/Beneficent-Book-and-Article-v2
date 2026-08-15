import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Sidebar from '../Dashboard/Sidebar';
// ملاحظة: تأكد أن مكون UserIdentityCard لا يحتوي على هوامش ضخمة لتناسب التصميم الجديد
import { Search, Plus, Zap, Crown, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentUsers = ({GetCountOrganizers}) => {
  // 1. تعريف الحالة (State) لتخزين المستخدمين القادمين من الـ API
  const [dbUsers, setDbUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8080/rest/Profile/";
  const API_URL_profile = "http://127.0.0.1:8080/rest/Users/";

  // 2. دالة جلب البيانات من السيرفر
 const fetchUsers = async () => {
  try {
    setLoading(true);

    // 1. جلب البيانات من السيرفر
    const res = await fetch(API_URL); // افترضنا أن هذه للبروفايلات Profile
    const profiles = await res.json();

    const resUser = await fetch(API_URL_profile); // افترضنا أن هذه لجدول المستخدمين User
    const usersData = await resUser.json();

    // 2. فلترة البروفايلات المسجلة حديثاً (آخر 24 ساعة)
    const recentProfiles = filterRecent(profiles, 24);

    // 3. الفلترة والدمج الصحيح
    const nonActiveUsers = recentProfiles
      .map((profile) => {
        // البحث عن المستخدم المطابق الذي تكون حالته is_active == false
        const matchingUser = usersData.find(
          (u) => u.id == profile.user && u.is_active === false
        );

        // إذا لم نجد مستخدم مطبق أو كان مفعل، نرجع null
        if (!matchingUser) return null;

        // إرجاع الكائن المدمج بنجاح
        return {
          display_name: profile.display_name,
          profile_id: profile.profile_id,
          email: matchingUser.email,
          created_at: profile.created_at,
          avatar_url: profile.avatar_url,
          is_active: matchingUser.is_active,
          user_id: matchingUser.id,
        };
      })
      // استبعاد أي عناصر null لم تطابق الشرط
      .filter((item) => item !== null);

    console.log("المستخدمون الجدد غير المكتملين/المفعلين: ", nonActiveUsers);

    // 4. تعيين القائمة المحدثة في الـ State
    setDbUsers(nonActiveUsers);

  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
  } finally {
    setLoading(false);
  }
};
  // 3. دالة الفلترة (تشتغل على المصفوفة الناتجة من الـ API)
const filterRecent = (usersList, hours) => {
  if (!Array.isArray(usersList)) return [];

  const now = new Date();
  const startTime = now.getTime() - (hours * 60 * 60 * 1000);

  return usersList.filter(user => {
      //  return (!user.is==)
    // 1. قراءة الحقل بالشكل الصحيح لـ Django (created_at) أو المسميات الأخرى
    const dateString = user.created_at ;

    // إذا لم يكن التاريخ موجوداً في بيانات الـ API المرجعة
    if (!dateString) {
      console.warn("هذا العنصر لا يحتوي على حقل تاريخ:", user);
      return false;
    }
    const userDate = new Date(dateString).getTime();
    // تجنب أخطاء NaN
    if (isNaN(userDate)) return false;
    return userDate >= startTime;
  });
};
  // 4. تشغيل الدالة فور تحميل المكون
  useEffect(() => {
    fetchUsers();
  }, []);
  GetCountOrganizers(dbUsers.length);
  return (
    <div className="bg-[#161616] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[520px] shadow-2xl relative overflow-hidden group">
      <h3 className="text-white font-black mb-6 flex items-center gap-3 flex-shrink-0 italic text-xl">
        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse" />
        أحدث المنضمين (من السيرفر)
      </h3>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar-neon scroll-smooth">
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar-neon::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar-neon::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar-neon::-webkit-scrollbar-thumb { 
            background: rgba(59, 130, 246, 0.1); 
            border-radius: 10px; 
          }
          .custom-scrollbar-neon:hover::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.4); }
        `}} />

        {loading ? (
          <p className="text-gray-500 text-center py-10">جاري جلب البيانات من السيرفر...</p>
        ) : dbUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-10">لا يوجد منضمين جدد في هذه الفترة</p>
        ) : (
          dbUsers.map((user, i) => (
            <motion.div 
              key={user._id || i} // استخدم ID قاعدة البيانات
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group/card cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-black text-white group-hover/card:text-blue-400 truncate">{user.display_name }</p>
                  <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                 {/* عرض الوقت بشكل مقروء */}
                 <span className="text-[9px] text-gray-600 font-bold">
                    {new Date(user.created_at).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'})}
                 </span>
                 {/* <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" /> */}

                  <div>
                  <Link  to='/UserVerificationDashboard' state={{ profile: user }}>
                  <button className="text-gray-600 bg-gradient-to-br hover:text-emerald-500 transition-colors flex items-center gap-1 text-xs">
                    <Filter size={14} />تفاصيل
                  </button>
                  </Link>

                  </div>

              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 bg-[#161616] z-10">
        <button onClick={fetchUsers} className="w-full py-3 bg-white/5 hover:bg-blue-500/10 rounded-xl text-[10px] font-black text-gray-400 hover:text-blue-400 transition-all uppercase tracking-[0.2em]">
          تحديث القائمة
        </button>
      </div>
    </div>
  );
};

export default RecentUsers;
