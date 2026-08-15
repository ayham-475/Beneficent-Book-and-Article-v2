export const ModerationStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 blur-3xl"></div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">في انتظار المراجعة</p>
      <h3 className="text-3xl font-black text-white">24 <span className="text-xs text-gray-600 font-medium">طلب</span></h3>
    </div>
    <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">تمت مراجعتها اليوم</p>
      <h3 className="text-3xl font-black text-white">142</h3>
    </div>
    <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl border-emerald-500/20">
      <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">متوسط وقت الرد</p>
      <h3 className="text-3xl font-black text-emerald-500">1.2 <span className="text-xs text-emerald-500/50 font-medium">ساعة</span></h3>
    </div>
  </div>
);