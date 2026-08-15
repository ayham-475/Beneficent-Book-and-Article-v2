export const GeneralSettings = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">اسم المنصة</label>
        <input type="text" placeholder="Elite Platform" className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-sm focus:border-emerald-500/50 outline-none transition-all" />
      </div>
      <div className="space-y-4">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest">بريد الدفع الرسمي</label>
        <input type="email" placeholder="finance@elite.com" className="w-full bg-[#121214] border border-white/5 rounded-2xl py-4 px-6 text-sm focus:border-emerald-500/50 outline-none transition-all" />
      </div>
    </div>
    
    <div className="space-y-4">
      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">شعار المنصة (Logo)</label>
      <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center group hover:border-emerald-500/30 transition-all cursor-pointer">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
          <i className="lucide-upload"></i>
        </div>
        <p className="text-xs text-gray-500">اسحب الشعار هنا أو اضغط للرفع</p>
      </div>
    </div>
  </div>
);