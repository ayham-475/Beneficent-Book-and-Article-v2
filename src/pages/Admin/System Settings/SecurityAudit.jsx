export const SecurityAudit = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex items-center justify-between p-6 bg-[#121214] border border-white/5 rounded-3xl">
      <div>
        <h4 className="text-sm font-black text-white">تفعيل ميزة التقمص (Login As)</h4>
        <p className="text-[10px] text-gray-600 mt-1">السماح للمديرين بالدخول لحسابات المستخدمين للدعم الفني.</p>
      </div>
      <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-lg"></div>
      </div>
    </div>

    <div className="bg-[#121214] border border-white/5 rounded-[2rem] overflow-hidden">
      <table className="w-full text-right text-xs">
        <thead className="bg-black/40 text-gray-500 uppercase">
          <tr>
            <th className="p-4">المدير</th>
            <th className="p-4">الحدث</th>
            <th className="p-4">الوقت</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          <tr>
            <td className="p-4 font-bold">أحمد (Admin)</td>
            <td className="p-4 text-gray-400">تقمص حساب: الكاتب علي</td>
            <td className="p-4 text-gray-500">منذ 5 دقائق</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);