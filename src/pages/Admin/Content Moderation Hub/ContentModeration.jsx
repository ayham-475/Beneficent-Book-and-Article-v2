import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import { 
  Activity, Zap, Search, RefreshCcw, ArrowUpRight,
  Star, Shield, Flame, TrendingUp,
  Users, Trash2, Mail, CreditCard, X, 
  FileText, BookOpen, Heart, Ban, Crown, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewCard } from './ReviewCard'; 
import { useLocation } from 'react-router-dom';
const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
 const location=useLocation();
  const userData=location.state.user;
  
  const usersList = [
    {
      id: "bf54",
      author:userData? userData.display_name:'',
      cover: userData? userData.avatar_url:'',
      type: "Premium",
      time: "نشط الآن",
      summary: userData? userData.bio:'',
      price: "12,500", 
      tags: ["خبير", "صانع محتوى"],
      last_actions: ["نشر كتاب رقمي", "رد على 15 تعليق", "سحب أرباح ناجح"],
      achievement: "Top 1% لهذا الشهر",
      user_details: {
        email: "Awad@gmail.com",
        role: "Content Creator",
        joined: "2026-01-29",
        payout_method: userData? userData.payout_method:'',
        payout_details: userData? userData.payout_details:'',
        stats: {
          articles: 45,
          books: 3,
          followers: "12.5k",
          likes: "85k"
        }
      }
    }
  ];

  return (
    <div className="h-screen bg-[#050505] flex overflow-hidden text-white font-sans selection:bg-blue-500/30" dir="rtl">
      <Sidebar />
      
      <main className="flex-1 md:pr-[110px] flex flex-col h-full overflow-hidden relative">
        
        {/* الهيدر السينمائي */}
        <header className="px-6 md:px-12 pt-10 pb-6 shrink-0 z-20 relative text-right">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
                  <div className="p-4 bg-[#0a0a0a] border border-white/10 text-blue-500 rounded-[2rem] relative z-10 shadow-2xl">
                    <Shield size={28} />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">تحليل الكيانات</h1>
                  <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-[0.5em]">User Identity & Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Search className="text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث عن البصمة الرقمية..."
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] py-4 pr-12 pl-6 text-sm font-bold focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all text-right"
                />
              </div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <RefreshCcw size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* محتوى الصفحة الرئيسي */}
        <div className={`flex-1 overflow-y-auto no-scrollbar px-6 md:px-12 pb-32 transition-all duration-700 ${selectedUser ? 'opacity-30 blur-md' : 'opacity-100'}`}>
          
          {/* قسم بطاقات الإحصائيات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
            <InsightCard label="مستوى الرضا العام" value="94.2%" trend="+2.1%" icon={<Star className="text-amber-400" />} color="amber" />
            <InsightCard label="المستخدمين الأكثر شغفاً" value="850" trend="Hot" icon={<Flame className="text-rose-500" />} color="rose" />
            <InsightCard label="معدل بقاء المستخدم" value="45m" trend="Stable" icon={<Activity className="text-blue-500" />} color="blue" />
            <InsightCard label="نمو القوة الشرائية" value="$42k" trend="+15%" icon={<TrendingUp className="text-emerald-500" />} color="emerald" />
          </div>

          {/* قائمة المستخدمين */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {usersList.map((user) => (
              <div key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
                <ReviewCard item={user} isSelected={selectedUser?.id === user.id} />
              </div>
            ))}
          </div>

          {/* --- الجزء المطلوب إضافته: خارطة التفاعل الحي --- */}
          <div className="mt-16 p-1 bg-[#0a0a0a] border border-white/5 rounded-[3rem] relative group overflow-hidden">
             <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4 text-right">
                   <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Global Activity</div>
                   <h2 className="text-3xl font-black italic text-white">خارطة التفاعل الحي</h2>
                   <p className="text-gray-500 text-sm max-w-md font-medium leading-relaxed">بإمكانك مراقبة كيفية توزيع المستخدمين ونوع المحتوى الذي يستهلكونه الآن في هذه اللحظة.</p>
                </div>
                <div className="flex -space-x-4 space-x-reverse">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="w-14 h-14 rounded-full border-4 border-[#0a0a0a] overflow-hidden bg-gray-800">
                        <img src={`https://i.pravatar.cc/150?u=${i+20}`} alt="User Avatar" />
                     </div>
                   ))}
                   <div className="w-14 h-14 rounded-full border-4 border-[#0a0a0a] bg-blue-500 flex items-center justify-center font-black text-xs text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">+12</div>
                </div>
             </div>
             {/* تأثير ألياف الكربون الخلفي */}
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
          </div>
          {/* ------------------------------------------- */}

        </div>

        {/* لوحة تعريف الكيان - تظهر من اليسار */}
        <AnimatePresence>
          {selectedUser && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedUser(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              />
              
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                className="fixed inset-y-0 left-0 w-full md:w-[500px] bg-[#0c0c0d] border-r border-white/5 z-[110] shadow-[20px_0_50px_rgba(0,0,0,0.8)] flex flex-col"
              >
                {/* Header Panel */}
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0f0f10]">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20"><TrendingUp size={14} /></div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ملف تعريف الكيان الإداري</span>
                  <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 group">
                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar text-right">
                  {/* Profile Section */}
                  <section className="flex flex-col items-center">
                    <div className="relative group mb-4">
                      <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-2 border-blue-500/20 p-1.5 bg-gradient-to-tr from-blue-500/50 to-transparent">
                         <img src={selectedUser.cover} className="w-full h-full object-cover rounded-[2.2rem]" alt="" />
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-blue-500 text-black p-1.5 rounded-xl border-4 border-[#0c0c0d]"><CheckCircle size={14} /></div>
                    </div>
                    <h3 className="font-black text-2xl text-white">{selectedUser.author}</h3>
                    <p className="text-gray-500 text-xs font-medium mb-6 uppercase tracking-widest">ID: {selectedUser.id} • {selectedUser.user_details.role}</p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 w-full">
                      {[
                        { icon: <FileText size={14}/>, label: 'مقالة', val: selectedUser.user_details.stats.articles },
                        { icon: <BookOpen size={14}/>, label: 'كتاب', val: selectedUser.user_details.stats.books },
                        { icon: <Users size={14}/>, label: 'متابع', val: selectedUser.user_details.stats.followers },
                        { icon: <Heart size={14}/>, label: 'إعجاب', val: selectedUser.user_details.stats.likes },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/5">
                          <div className="text-gray-500 flex justify-center mb-1">{stat.icon}</div>
                          <p className="text-[14px] font-black text-white text-center">{stat.val}</p>
                          <p className="text-[8px] font-bold text-gray-600 uppercase text-center">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Wallet Section */}
                  <section className="bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] p-6">
                    <div className="flex items-center gap-3 mb-6 justify-end">
                      <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">المحفظة والتحويلات</h4>
                      <div className="p-2 bg-blue-500 text-black rounded-xl shadow-lg shadow-blue-500/20"><CreditCard size={18} /></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-black text-white">${selectedUser.price}</span>
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-tighter">الرصيد الكلي</span>
                      </div>
                      <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                         <p className="text-[9px] text-gray-600 font-black uppercase mb-1">بيانات التحويل</p>
                         <div className="flex items-center justify-between gap-4">
                           <span className="text-[10px] font-mono text-gray-500 truncate">{selectedUser.user_details.payout_details}</span>
                           <span className="text-xs font-bold text-gray-300">{selectedUser.user_details.payout_method}</span>
                         </div>
                      </div>
                    </div>
                  </section>

                  {/* Admin Controls */}
                  <section className="space-y-4 pt-4">
                    <p className="text-[10px] text-center text-gray-600 font-black uppercase tracking-[0.2em]">إدارة الصلاحيات</p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-white text-black h-14 rounded-2xl font-black text-xs hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Crown size={18} /> ترقية الحساب
                      </button>
                      <button className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 h-14 rounded-2xl font-black text-xs transition-all hover:bg-emerald-500 hover:text-white">تنشيط</button>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-[0.7] bg-amber-500/10 border border-amber-500/20 text-amber-500 h-14 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2">
                        <Ban size={16} /> تجميد مؤقت
                      </button>
                      <button className="flex-[0.3] bg-red-500/10 border border-red-500/20 text-red-500 h-14 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </section>
                </div>

                {/* Panel Footer */}
                <div className="p-6 bg-[#0f0f10] border-t border-white/5 mt-auto flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">متصل بالنظام</span>
                   </div>
                   <p className="text-[9px] text-gray-600 font-bold italic">آخر تحديث: {selectedUser.time}</p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
      </main>
    </div>
  );
};

// مكون InsightCard المساعد
const InsightCard = ({ label, value, trend, icon, color }) => {
  const colorStyles = {
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    rose: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
  };
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500 text-right">
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-white/[0.03] rounded-2xl group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${colorStyles[color]}`}>
          {trend}
        </span>
      </div>
      <div>
        <h3 className="text-3xl font-black mb-1 text-white tracking-tighter">{value}</h3>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default UserManagement;