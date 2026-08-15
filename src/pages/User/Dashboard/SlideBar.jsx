import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, BookOpen, DollarSign,
  ChevronLeft, Layout, PieChart, LogOut, Menu, X
} from 'lucide-react';
import LogoutModal from '../../../features/auth/LogoutModal';
import { AuthContext } from '../../../features/auth/auther';

const Sidebar = () => {

  const [activeItem, setActiveItem] = useState('الرئيسية');
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // حالة الهاتف
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setloading] = useState(false)

  const [profile, SetProfile] = useState([]);

  // const API_URL = "htt/p://localhost:3000/profiles";
    const API_URL = "http://127.0.0.1:8080/rest/Profile/";

  const GetProfiles = async () => {
    try {
      const profiles = await fetch(API_URL);
      const DataProfile = await profiles.json();
      const userCurrent = DataProfile.filter((profile) => {
        return profile.user == user?.id;
      });
      SetProfile(userCurrent);
      setloading(true);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setloading(true); // لإنهاء حالة الانتظار حتى لو فشل الاتصال
    }
  }



  useEffect(() => {
    if (user?.id) {
      GetProfiles();
    }
  }, [user]);

  const menuItems = [
    { id: 'main', title: 'الرئيسية', icon: <Layout size={22} />, path: '/dashboardUser' },
    {
      id: 'content',
      title: 'إدارة المحتوى',
      icon: <BookOpen size={22} />,
      subItems: [
        { title: 'المحتوى', path: '/content_user' },
        { title: 'كتبي الرقمية', path: '/BookContentHome' },
        { title: 'مقالاتي', path: '/ArticlesManager' },
      ]
    },
    {
      id: 'finance',
      title: 'المالية',
      icon: <DollarSign size={22} />,
      subItems: [
        { title: 'اموالي', path: '/FinancialHome' },
        { title: 'الأرباح', path: '/earnings' },
        { title: 'طلبات السحب', path: '/withdraw' }
      ]
    },
    { id: 'stats', title: 'التحليلات', icon: <PieChart size={22} />, path: '/analytics' },
  ];

  return (
    <>
      {/* 1. زر المنيو للهاتف فقط */}
      <div className="md:hidden fixed top-4 right-4 z-[110]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 bg-[#319795] text-white rounded-2xl shadow-xl shadow-[#319795]/30 cursor-pointer"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 2. غطاء خلفي عند فتح المنيو في الهاتف */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 3. السايدبار الرئيسي */}
      <motion.aside
        initial={isMobile ? { x: '100%' } : { width: '90px' }}
        animate={
          isMobile
            ? { x: isMobileOpen ? 0 : '100%', width: '280px' }
            : { width: '90px' }
        }
        whileHover={!isMobile ? { width: '290px' } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={`fixed right-0 top-0 md:top-6 h-full md:h-[calc(100vh-3rem)] bg-white/95 backdrop-blur-2xl border-l border-white/50 shadow-[20px_0_50px_rgba(0,0,0,0.05)] md:rounded-l-[2.5rem] flex flex-col z-[100] group overflow-hidden`}
      >

        {/* ستايل السكرول */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .sidebar-scroll::-webkit-scrollbar { width: 4px; }
          .sidebar-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; }
          aside:hover .sidebar-scroll::-webkit-scrollbar-thumb { background: #319795; }
        `}} />

        {/* الشعار */}
        <div className="h-24 flex items-center px-6 shrink-0 overflow-hidden">
          <div className="min-w-[50px] h-[50px] bg-gradient-to-br from-[#319795] to-[#4FD1C5] rounded-2xl flex items-center justify-center text-white  shadow-lg shadow-[#319795]/20 shrink-0">
            <BarChart2 size={24} />
          </div>
          <motion.div className={`mr-4 flex flex-col ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500`}>
            <span className="font-black text-[#1A202C] text-lg tracking-tighter leading-none whitespace-nowrap">مرصد الإبداع</span>
            <span className="text-[10px] text-[#319795] font-bold uppercase tracking-widest mt-1 whitespace-nowrap">نسخة المؤلفين</span>
          </motion.div>
        </div>

        {/* الروابط */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto sidebar-scroll overflow-x-hidden">
          {menuItems.map((item) => {
            const isActive = activeItem === item.title;
            return (
              <div key={item.id} className="relative">
                <div
                  onClick={() => {
                    setActiveItem(item.title);
                    if (item.subItems) setOpenSubMenu(openSubMenu === item.id ? null : item.id);
                  }}
                  className={`flex items-center h-14 rounded-2xl cursor-pointer transition-all duration-300 relative ${isActive
                    ? 'bg-[#E6FFFA] text-[#319795] border border-[#B2F5EA]/30'
                    : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                  <div className="min-w-[60px] flex justify-center items-center">
                    {item.icon}
                  </div>

                  <motion.span className={`font-black text-sm whitespace-nowrap ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`}>
                    {item.title}
                  </motion.span>

                  {item.subItems && (
                    <ChevronLeft
                      size={16}
                      className={`mr-auto ml-4 transition-transform duration-300 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${openSubMenu === item.id ? '-rotate-90' : ''}`}
                    />
                  )}
                </div>

                <AnimatePresence>
                  {item.subItems && openSubMenu === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mr-12 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.subItems.map((sub, idx) => (
                        <a
                          key={idx}
                          href={sub.path}
                          className="block py-2 text-xs font-bold text-gray-400 hover:text-[#319795] whitespace-nowrap"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* منطقة البروفايل السفلية */}
        <div className="p-4 border-t border-gray-50 shrink-0">
          <div className="flex items-center bg-[#F7FAFC] p-3 rounded-[2rem] border border-gray-100 overflow-hidden min-h-[68px]">
            
            {/* عرض الصورة والـ Skeleton الفاخر أثناء التحميل */}
            {loading && profile.length > 0 ? (
              <>
                <div className="min-w-[42px] h-[42px] bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden shrink-0 border border-gray-200">
                  <img 
                    src={profile[0].avatar_url}
                    className="w-full h-full object-cover"
                    alt="User Avatar"
                    onError={(e) => { 
                      e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"; 
                    }}
                  />
                </div>
                
                <div className={`mr-3 flex flex-col ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500 flex-1 overflow-hidden`}>
                  <span className="text-xs font-black text-gray-800 whitespace-nowrap truncate">
                    {profile[0].display_name || "مؤلف جديد"}
                  </span>
                  <span className="text-[9px] text-[#319795] font-bold mt-1 uppercase whitespace-nowrap">
                    مؤلف مميز
                  </span>
                </div>
              </>
            ) : (
              /* تصميم الـ Skeleton المتنقل الذكي المؤقت قبل وصول البيانات */
              <>
                <div className="min-w-[42px] h-[42px] bg-gray-200 rounded-xl animate-pulse shrink-0" />
                <div className={`mr-3 flex flex-col gap-2 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-500 flex-1`}>
                  <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="w-12 h-2 bg-teal-100 rounded animate-pulse" />
                </div>
              </>
            )}

            {/* زر تسجيل الخروج والمودال */}
            <button 
              onClick={() => setShowLogout(true)} 
              className={`mr-auto ml-1 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer`}
            >
              <LogOut size={18} />
            </button>
            
            <LogoutModal
              isOpen={showLogout}
              onClose={() => setShowLogout(false)} 
              onConfirm={logout}       
            />
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;