import React, { useContext, useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Sparkles, Globe, Menu, X, Home, BookOpen, FileText } from 'lucide-react';
import { AuthContext } from '../../../features/auth/auther';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TopHeader = ({ authorName = "د. أحمد خالد" }) => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, SetProfile] = useState(null);

  const API_URL = "http://127.0.0.1:8080/rest/Profile/";

  const GetProfiles = async () => {
    if (!user || !user.id) {
      console.warn("بيانات المستخدم غير متوفرة بعد");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Token ${token}` : ""
        }
      });

      if (!res.ok) {
        throw new Error(`خطأ في السيرفر: ${res.status}`);
      }

      const responseData = await res.json();
      const profilesList = Array.isArray(responseData) ? responseData : (responseData.results || []);

      const userCurrent = profilesList.find((p) => String(p.user) === String(user.id));

      SetProfile(userCurrent || null);

    } catch (error) {
      console.error("خطأ أثناء جلب البروفايلات:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      GetProfiles();
    }
  }, [user]);

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <Home size={18} /> },
    { name: 'الكُتّاب', path: '/homeBook', icon: <BookOpen size={18} /> },
    { name: 'المقالات', path: '/articlenew', icon: <FileText size={18} /> },
  ];

  return (
    <div className="fixed mr-10 top-0 left-0 right-0 z-[100] px-3 py-2 md:top-2 md:px-8 md:right-14">
      <header className="mx-auto max-w-[1600px] w-full flex justify-between items-center py-2.5 md:py-4 px-4 md:px-8 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[1.2rem] md:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-500 relative">

        {/* الجزء الأيمن: الترحيب وزر القائمة */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100/50 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[10px] md:text-xl font-black text-[#1A202C] tracking-tight truncate max-w-[100px] md:max-w-none">
                أهلا بك م: {profile?.display_name || user?.username || "جاري التحميل..."}
              </h1>
              <Sparkles size={14} className="text-[#319795] animate-pulse shrink-0" />
            </div>
            <p className="hidden xs:block text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-0.5">
              لوحة التحكم • <span className="text-[#4FD1C5]">متصل</span>
            </p>
          </div>
        </div>

        {/* الجزء الأوسط: الروابط */}
        <nav className="hidden lg:flex items-center gap-8 bg-gray-50/50 px-6 py-2 rounded-2xl border border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[#2D3748] font-black text-sm hover:text-[#319795] transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#319795] transition-all group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </nav>

        {/* الجزء الأيسر: الإشعارات والبروفايل */}
        <div className="flex items-center gap-2 md:gap-5 shrink-0">

          <div className="flex items-center gap-1 md:gap-2 border-l border-gray-100 pl-2 md:pl-5">
            <button className="hidden sm:flex p-2 md:p-2.5 text-gray-400 hover:text-[#319795] hover:bg-[#E6FFFA] rounded-xl transition-all">
              <Globe size={18} />
            </button>
            <button className="p-2 md:p-2.5 text-gray-400 hover:text-[#319795] hover:bg-[#E6FFFA] rounded-xl transition-all relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-rose-500 border-2 border-white text-[7px] text-white flex items-center justify-center rounded-full font-black shadow-sm">
                3
              </span>
            </button>
          </div>

          {/* البروفايل */}
          <div className="flex items-center gap-2 md:gap-3 bg-white/50 sm:bg-gradient-to-r sm:from-[#F7FAFC] sm:to-white p-0.5 sm:p-1.5 sm:pr-4 rounded-xl md:rounded-2xl border border-transparent sm:border-white/60 shadow-none sm:shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="hidden sm:flex flex-col text-left items-end">
              <span className="text-[11px] font-black text-[#2D3748] group-hover:text-[#319795] transition-colors whitespace-nowrap">
                {profile?.display_name || user?.username || "مستخدم"}
              </span>
              <span className="text-[8px] text-[#38A169] font-black uppercase tracking-tighter">
                موثق ✓
              </span>
            </div>

            <div className="relative shrink-0">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl overflow-hidden border-2 border-white group-hover:border-[#E6FFFA] transition-all shadow-sm bg-gray-100 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold text-gray-500">
                    {profile?.display_name?.[0] || user?.username?.[0] || "U"}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#38A169] border-2 border-white rounded-full"></div>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* القائمة الجانبية للهاتف */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[110%] left-0 right-0 bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-2xl lg:hidden z-[110] flex flex-col gap-4"
            >
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2 border-b border-gray-50 pb-2">التنقل السريع</p>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-[#E6FFFA] text-[#2D3748] hover:text-[#319795] transition-all font-black"
                >
                  <span className="p-2 bg-white rounded-xl shadow-sm">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 p-4 bg-gradient-to-br from-[#319795] to-[#4FD1C5] rounded-2xl text-white">
                <p className="text-xs opacity-80">تحتاج مساعدة؟</p>
                <p className="font-black">مركز الدعم الفني</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default TopHeader;