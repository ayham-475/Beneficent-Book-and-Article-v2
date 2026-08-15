// المكونات الصغيرة: بطاقة مالية
const StatCard = ({ title, amount, trend, color }) => (
  <div className="bg-[#121214] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-[50px] rounded-full`}></div>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">{title}</p>
    <h2 className="text-2xl font-black text-white mb-2">{amount}</h2>
    <div className={`text-[10px] font-bold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
      {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% <span className="text-gray-600 mr-1">منذ الشهر الماضي</span>
    </div>
  </div>
);

// المكون الرئيسي للملخص
export const FinancialSummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <StatCard title="إجمالي الأرباح" amount="$124,500" trend={12} color="emerald" />
    <StatCard title="صافي العمولة" amount="$18,200" trend={8} color="blue" />
    <StatCard title="النفقات التشغيلية" amount="$5,400" trend={-2} color="rose" />
    <StatCard title="طلبات سحب معلقة" amount="$3,100" trend={15} color="amber" />
  </div>
);


// export default StatCard

// export default FinancialSummaryCards