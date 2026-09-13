import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, LayoutDashboard, Shield, Menu, X, BookOpen, Feather, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../features/auth/auther';
import { useToast } from '../Contexts/ToastContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { toast } = useToast();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.info('تم تسجيل الخروج بنجاح. نتمنى رؤيتك قريباً!');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الكُتّاب والكتب', path: '/homeBook' },
    { name: 'المقالات', path: '/articlenew' },
    { name: 'التصنيفات', path: '/Categories' },
  ];

  const isAdmin = user?.is_superuser || user?.type === 'Admin' || user?.role === 'Admin';
  const dashboardPath = isAdmin ? '/dashboard' : '/dashboardUser';
  const dashboardLabel = isAdmin ? 'لوحة الإدارة' : 'لوحة الكاتب';

  const isActive = (p) => location.pathname === p;

  return (
    <nav dir="rtl" className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 py-3 transition-all duration-300">
      {/* الحاوية الزجاجية */}
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-slate-900/80 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.37)]">

        {/* 1. الشعار والهوية */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white font-black text-base tracking-tight leading-none group-hover:text-blue-400 transition-colors">
              منصة <span className="text-blue-400">اليعري</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide">للأدب والمعرفة</span>
          </div>
        </Link>

        {/* 2. الروابط المركزية (شاشات متوسطة وكبيرة) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 px-3 py-1 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive(link.path)
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.5)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. إجراءات المستخدم والتسجيل */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 pl-2 pr-3 py-1.5 rounded-full">
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                title={dashboardLabel}
              >
                <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-xs font-bold text-blue-300">
                  {user.first_name ? user.first_name[0] : (user.name ? user.name[0] : <User className="w-3.5 h-3.5" />)}
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-white line-clamp-1 max-w-[90px]">
                    {user.first_name || user.name || user.username || 'حسابي'}
                  </span>
                  <span className="text-[9px] text-blue-400 flex items-center gap-0.5">
                    {isAdmin ? <Shield className="w-2.5 h-2.5" /> : <Feather className="w-2.5 h-2.5" />}
                    {dashboardLabel}
                  </span>
                </div>
              </Link>

              <div className="w-px h-4 bg-white/20 mx-1" />

              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-rose-400 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/30 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>دخول / تسجيل</span>
              </motion.button>
            </Link>
          )}
        </div>

        {/* 4. زر القائمة في الهواتف */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && user && (
            <Link
              to={dashboardPath}
              className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-xs font-bold text-blue-300"
            >
              {user.first_name ? user.first_name[0] : (user.name ? user.name[0] : <User className="w-3.5 h-3.5" />)}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 5. القائمة المنسدلة للهواتف (Mobile Drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-7xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-2" />

            {isAuthenticated && user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-600/20 text-blue-300 font-bold text-sm border border-blue-500/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{dashboardLabel}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold text-sm text-right"
                >
                  <LogOut className="w-4 h-4" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>دخول / تسجيل حساب جديد</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
