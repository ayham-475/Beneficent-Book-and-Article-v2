import React, { useEffect, useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
// ملاحظة: تأكد أن مكون UserIdentityCard لا يحتوي على هوامش ضخمة لتناسب التصميم الجديد
import { Search, Plus, Zap, ShieldCheck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsersManager = () => {
  const [UserBalance, SetUserBalance] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // حالة البحث الجديدة
  
  // const API_URL = "http://localhost:3000/users";
  const User_URL = "http://127.0.0.1:8080/rest/Users/";
  const API_URL_profile = "http://127.0.0.1:8080/rest/Profile/";

  const GetUsers = async () => {
    try {
      const users = await fetch(User_URL);
      const usersdata = await users.json();
      
      const usersProfile = await fetch(API_URL_profile);
      const usersdata_profile = await usersProfile.json();
      
      console.log(" users  : ", usersdata, "Profiles  d: ", usersdata_profile);
      
      // دمج البيانات لضمان وجود جميع المعلومات في مصفوفة واحدة للبحث والعرض الاحترافي
      const mergedData = usersdata_profile.map(profile => {
        const correspondingUser = usersdata.find(u => String(u.id) === String(profile.user_id));
        return {
          ...profile,
          email: correspondingUser ? correspondingUser.email : "", // إذا كنت تحتاج البحث بالإيميل أيضاً
        };
      });

      SetUserBalance(mergedData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  }

  useEffect(() => {
    GetUsers();
  }, [])

  // تصفية المستخدمين بناءً على النص المدخل في خانة البحث
  const filteredUsers = UserBalance.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.display_name && user.display_name.toLowerCase().includes(searchLower)) ||
      (user.user_id && String(user.id).toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });
  
  return (
    // h-screen + overflow-hidden تضمن ثبات الصفحة بالكامل مع ألوان Slate-950
    <div className="h-screen bg-slate-950 flex overflow-hidden font-sans text-slate-100" dir="rtl">
      {/* <Sidebar /> */}

      <main className="flex-1 md:pr-[110px] relative flex flex-col h-full overflow-hidden">
        {/* تأثير الإضاءة الخلفي الثابت بدرجات الـ Indigo والـ Violet */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* --- الهيدر (ثابت لا يتحرك) --- */}
        <header className="px-6 md:px-12 pt-10 pb-6 shrink-0 relative z-20 bg-slate-950/60 backdrop-blur-xl border-b border-slate-800/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-900/20">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">إدارة المجتمع</h1>
                <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-[0.2em] mt-1">
                  نظام إدارة المنظمين والمستخدمين
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group flex-1 md:ml-100 md:w-100">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="بحث سريع بالاسم أو المعرف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث النص فوراً عند الكتابة
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl py-3 pr-10 pl-4 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>
              <Link to={"/login"}>
                <button className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-500 shadow-lg shadow-indigo-900/20 transition-all active:scale-95 border border-indigo-500/30">
                  <Plus size={20} />
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* --- منطقة البطاقات (هذا الجزء الوحيد الذي يتحرك) --- */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pt-6 pb-20 no-scrollbar relative z-10">
          {/* إخفاء السكرول بار بذكاء */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div className="grid grid-cols-1 gap-4">
            {/* عرض مصفوفة filteredUsers المصفاة */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="
                    group relative bg-slate-900/50 border border-slate-800/80 
                    hover:bg-slate-900 hover:border-indigo-500/40 
                    rounded-3xl p-4 backdrop-blur-md transition-all duration-300
                    flex items-center justify-between gap-4 shadow-sm
                  "
                >
                  {/* المحتوى الأفقي داخل البطاقة */}
                  <div className="flex items-center gap-4 flex-1">
                    <img src={user.avatar_url} className="w-11 h-11 rounded-2xl object-cover border border-slate-800 group-hover:border-indigo-500/30 transition-all" alt="img" />
                    <div className="grid grid-cols-2 md:grid-cols-4 flex-1 items-center gap-4">
                      <div className="min-w-[120px]">
                        <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{user.display_name}</h3>
                        <p className="text-[10px] text-slate-400 truncate">{user.payout_details}</p>
                      </div>
                      <div className="hidden md:block">
                        <span className="bg-slate-800/60 text-[10px] px-3 py-1 rounded-xl text-slate-300 border border-slate-700/50">
                          {user.payout_details}
                        </span>
                      </div>
                      <div className="hidden md:block">
                        <span className="text-xs font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20">
                          #{user.user_id}
                        </span>
                      </div>
                      <div className="w-24">
                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div className="h-full bg-indigo-500" style={{ width: `${user.payout_method}%` }}></div>
                        </div>  
                      </div>
                    </div>
                  </div>

                  <Link to='/ContentModeration' state={{ user: user }}>
                    <button className="text-slate-400 hover:text-indigo-300 bg-slate-800/40 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/30 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-medium">
                      <Filter size={14} /> التفاصيل
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-500 text-sm bg-slate-900/30 border border-slate-800/50 rounded-3xl backdrop-blur-md">
                لا يوجد مستخدمين يطابقون بحثك الحالي.
              </div>
            )}
          </div>

          {/* قسم "النشاط المباشر" السفلي بتصميمه الفخم المحدث */}
          <section className="mt-12 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-md">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-4">
                <Zap className="animate-pulse" size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-white">رؤية كاملة لمجتمعك</h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed font-normal">
                أنت الآن تشرف على 5,230 مستخدم. تم رصد 12 مستخدم جديد خلال الساعة الماضية يحتاجون لمراجعة بياناتهم.
              </p>
              <button className="mt-6 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-semibold text-xs shadow-lg shadow-indigo-900/20 border border-indigo-500/30 transition-all active:scale-95">
                عرض تقرير الأداء السنوي
              </button>
            </div>
            {/* زينة خلفية */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          </section>
        </div>

        {/* تأثير تلاشي سفلي ثابت ليعطي عمق عند انتهاء السكرول */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20"></div>
      </main>
    </div>
  );
};

export default UsersManager;