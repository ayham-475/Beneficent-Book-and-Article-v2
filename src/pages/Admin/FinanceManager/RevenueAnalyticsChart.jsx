export  const RevenueAnalyticsChart = () => (
  <div className="bg-[#121214] border border-white/5 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h3 className="text-xl font-black text-white">تحليلات التدفق المالي</h3>
        <p className="text-gray-500 text-xs">مقارنة بين الأرباح والنفقات لعام 2026</p>
      </div>
      <select className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 outline-none">
        <option>آخر 6 أشهر</option>
        <option>السنة الحالية</option>
      </select>
    </div>
    <div className="h-[300px] w-full bg-gradient-to-t from-emerald-500/5 to-transparent rounded-3xl border border-dashed border-white/5 flex items-center justify-center">
      <p className="text-gray-700 font-black italic">مكان الرسم البياني (Chart.js / Recharts)</p>
    </div>
  </div>
);