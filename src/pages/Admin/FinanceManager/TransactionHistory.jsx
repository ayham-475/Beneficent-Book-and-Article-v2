export const TransactionHistory = () => (
  <div className="bg-[#121214] border border-white/5 rounded-[2.5rem] overflow-hidden">
    <div className="p-6 border-b border-white/5">
        <h3 className="text-lg font-black text-white">سجل العمليات الأخير</h3>
    </div>
    <div className="space-y-1 p-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.02] transition-all">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {i % 2 === 0 ? '↙' : '↗'}
            </div>
            <div>
              <p className="text-sm font-bold">{i % 2 === 0 ? 'عمولة بيع كتاب' : 'دفع رسوم سيرفر'}</p>
              <p className="text-[10px] text-gray-600">15 فبراير 2026 - 10:30 م</p>
            </div>
          </div>
          <span className={`text-sm font-mono font-bold ${i % 2 === 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {i % 2 === 0 ? '+' : '-'} ${i * 150}
          </span>
        </div>
      ))}
    </div>
  </div>
);