import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Users, DollarSign, LogOut,
  Settings, BarChart3, LayoutDashboard, Menu, X
} from 'lucide-react';
import { AuthContext } from '../../../features/auth/auther';

import { Link } from 'react-router-dom';
import LogoutModal from '../../../features/auth/LogoutModal';

const Sidebar = () => {

  const [ActiveTab, setActiveTab] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [Showlogout, setShowLogout] = useState(false)
  const [profile,SetProfile]=useState([]);
  const [loading,setloading]=useState(false)
    const API_URL = "http://127.0.0.1:8080/rest/Profile/";
   const GetProfiles=async()=>{
    const profiles=await fetch(API_URL);
    const DataProfile= await profiles.json();
    
     const userCurrent =DataProfile.filter((profile)=>{
       return profile.user==user.id;
          
     })
     console.log("profile  : ",userCurrent)
     SetProfile(userCurrent)
     setloading(true);

   }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    GetProfiles();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'لوحة التحكم', path: '/dashboard' },
    { id: 'content', icon: <FileText size={22} />, label: 'مراجعة المحتوى', path: '/content' },
    { id: 'users', icon: <Users size={22} />, label: 'إدارة المستخدمين', path: '/users' },
    { id: 'finance', icon: <DollarSign size={22} />, label: 'الطلبات المالية', path: '/FinanceManager' },
    { id: 'settings', icon: <Settings size={22} />, label: 'إعدادات المنصة', path: '/SettingsManager' },
  ];
console.log("Profile  : ",profile)
  return (
    <>
      {/* زر الهاتف - ثابت فوق كل شيء */}
      <div className="md:hidden fixed top-4 right-4 z-[120]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-emerald-500 text-black rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-transform"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop: يعطي عمق ويفصل القائمة عن المحتوى عند الفتح */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* الحاوية الرئيسية للقائمة - Fixed Position */}
      <motion.aside
        // هنا السر: x: 0 تجعلها دائماً فوق المحتوى ولا تحجز مكان
        initial={isMobile ? { x: '100%' } : { width: '85px' }}
        animate={isMobile
          ? { x: isMobileOpen ? 0 : '100%', width: '280px' }
          : { width: '85px' }
        }
        whileHover={!isMobile ? { width: '280px' } : {}}
        transition={{ type: 'spring', stiffness: 180, damping: 25 }}
        // bg-[#0d0d0d]/95 مع backdrop-blur لتصميم شفاف فخم
        className="fixed right-0 top-0 h-full bg-[#0d0d0d]/95 backdrop-blur-xl border-l border-white/5 flex flex-col z-[110] group shadow-[ -20px_0_50px_rgba(0,0,0,0.5)]"
      >
        {/* منطقة الشعار */}
        <div className="h-24 flex items-center px-6 overflow-hidden flex-shrink-0">
          <div className="min-w-[50px] h-[50px] rounded-2xl flex items-center justify-center border border-emerald-500/30 bg-emerald-500/5 relative">
            <BarChart3 className="text-emerald-500" size={24} />
            <div className="absolute inset-0 bg-emerald-500/10 blur-lg rounded-full" />
          </div>
          <motion.div className={`mr-4 flex flex-col ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
            <span className="text-white font-black text-lg leading-none italic">إدارة</span>
            <span className="text-emerald-500 text-[9px] font-bold tracking-[0.2em]">THE ELITE</span>
          </motion.div>
        </div>

        {/* الروابط النيونية */}
        <nav className="flex-1 px-3 space-y-3 mt-4 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = ActiveTab === item.id;
            return (
              <Link to={item.path} key={item.id} className="block">
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setIsMobileOpen(false);
                  }}
                  className={`w-full h-14 flex items-center rounded-2xl transition-all duration-300 relative group/btn ${isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                      : 'border border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeGlowSidebar"
                        className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(16,185,129,0.2)] pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <div className={`min-w-[58px] flex justify-center items-center z-10 transition-transform duration-300 ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`}>
                    {item.icon}
                  </div>

                  <motion.span
                    className={`font-black text-sm whitespace-nowrap z-10 pr-2 transition-all duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      } ${isActive ? 'text-emerald-400' : ''}`}
                  >
                    {item.label}
                  </motion.span>

                  {isActive && (
                    <motion.div layoutId="pulse-side" className="absolute left-3 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                  )}
                </button>
              </Link>
            );
          })}
        </nav>
        {/* البروفايل السفلي */}
        <div className="p-5 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="relative min-w-[45px]">
              <img
                src={loading?profile[0].avatar_url:''}
                className="w-[45px] h-[45px] rounded-xl object-cover border border-white/10"
                alt="Admin"
              />
              <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0d0d0d] rounded-full shadow-[0_0_5px_#10b981]" />
            </div>
            <div className={`flex flex-col transition-all duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <span className="text-xs font-black text-white whitespace-nowrap">م :  {loading?profile[0].display_name:''}</span>
              <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-tighter italic">Main Developer</span>
            </div>
            <div className='mr-10'> <button onClick={() => { setShowLogout(true) }} className={`mr-auto ml-1 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} text-gray-300 hover:text-red-500 transition-all`}>
              <LogOut size={18} />
            </button></div>
            <LogoutModal
              isOpen={Showlogout}
              onClose={() => setShowLogout(false)} // إذا ضغط "إلغاء" يعيدها لـ false
              onConfirm={logout}       // إذا ضغط "تأكيد" ينفذ الدالة
            />

          </div>

        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;