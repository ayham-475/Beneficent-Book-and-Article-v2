export  const FinancialRules = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl">
      <h4 className="text-emerald-500 font-black text-sm mb-2">عمولة المنصة</h4>
      <p className="text-gray-500 text-[10px] leading-relaxed">النسبة التي يتم اقتطاعها تلقائياً من كل عملية بيع كتاب أو مقال داخل المنصة.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#121214] p-6 rounded-3xl border border-white/5">
        <label className="text-[10px] font-black text-gray-500 block mb-4 uppercase">نسبة العمولة (%)</label>
        <input type="number" defaultValue="15" className="bg-transparent text-2xl font-black text-white outline-none w-full" />
      </div>
      <div className="bg-[#121214] p-6 rounded-3xl border border-white/5">
        <label className="text-[10px] font-black text-gray-500 block mb-4 uppercase">أدنى حد للسحب ($)</label>
        <input type="number" defaultValue="50" className="bg-transparent text-2xl font-black text-white outline-none w-full" />
      </div>
      <div className="bg-[#121214] p-6 rounded-3xl border border-white/5">
        <label className="text-[10px] font-black text-gray-500 block mb-4 uppercase">العملة الافتراضية</label>
        <select className="bg-transparent text-xl font-black text-white outline-none w-full appearance-none">
          <option>USD ($)</option>
          <option>SAR (ر.س)</option>
        </select>
      </div>
    </div>
  </div>
);