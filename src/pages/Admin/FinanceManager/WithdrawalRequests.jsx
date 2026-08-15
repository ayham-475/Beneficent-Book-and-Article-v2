export const WithdrawalRequests = () => (
  <div className="bg-[#121214] border border-white/5 rounded-[2.5rem] overflow-hidden mb-10">
    <div className="p-6 border-b border-white/5 flex justify-between items-center">
      <h3 className="text-lg font-black text-white">طلبات السحب الواردة</h3>
      <span className="bg-amber-500/10 text-amber-500 text-[10px] px-3 py-1 rounded-full font-black">4 طلبات تحتاج تدخل</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-right">
        <thead className="bg-black/20 text-gray-500 text-[10px] font-black uppercase">
          <tr>
            <th className="p-6">الكاتب</th>
            <th className="p-6">المبلغ المطلوب</th>
            <th className="p-6">طريقة الدفع</th>
            <th className="p-6">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[1, 2].map((i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20"></div>
                <div>
                  <p className="text-sm font-bold">الكاتب علي محمد</p>
                  <p className="text-[10px] text-gray-600">ID: #W-9920</p>
                </div>
              </td>
              <td className="p-6 font-mono text-emerald-500 font-bold">$1,200</td>
              <td className="p-6 text-xs text-gray-400">PayPal</td>
              <td className="p-6">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black rounded-xl">موافقة</button>
                  <button className="px-4 py-2 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-xl">رفض</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);