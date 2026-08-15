
import { ArrowUpRight, Wallet, ArrowDownLeft, Plus, Zap } from 'lucide-react';

const TransactionHistory = () => {
  const activities = [
    { id: 1, name: "بيع كتاب: رحلة التغيير", amount: "+$85.00", time: "12:30 م", type: "in", status: "مكتمل" },
    { id: 2, name: "سحب أرباح - PayPal", amount: "-$500.00", time: "09:15 ص", type: "out", status: "معلق" },
    { id: 2, name: "سحب أرباح - PayPal", amount: "-$500.00", time: "09:15 ص", type: "out", status: "معلق" },
    { id: 2, name: "سحب أرباح - PayPal", amount: "-$500.00", time: "09:15 ص", type: "out", status: "معلق" },
    { id: 2, name: "سحب أرباح - PayPal", amount: "-$500.00", time: "09:15 ص", type: "out", status: "معلق" },
    { id: 2, name: "سحب أرباح - PayPal", amount: "-$500.00", time: "09:15 ص", type: "out", status: "معلق" },
    { id: 3, name: "بيع كتاب: لغة الجسد", amount: "+$42.00", time: "أمس", type: "in", status: "مكتمل" },
  ];

  return (
    <div className="mt-8 mr-20 bg-white/80 backdrop-blur-xl rounded-[1.5rem] border border-white shadow-2xl overflow-hidden" dir="rtl">
      <div className="p-10 flex justify-between items-center border-b border-gray-50">
        <h3 className="text-2xl font-black text-gray-800 tracking-tighter">أحدث النشاطات</h3>
        <button className="text-emerald-600 font-black text-xs hover:underline uppercase tracking-widest">مشاهدة الكل</button>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-right">
          <tbody className="divide-y divide-gray-50">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-emerald-50/30 transition-colors group">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${act.type === 'in' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                      {act.type === 'in' ? <ArrowDownLeft size={20}/> : <ArrowUpRight size={20}/>}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm">{act.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{act.time}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${
                    act.status === 'مكتمل' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {act.status}
                  </span>
                </td>
                <td className="px-10 py-6 text-left">
                  <span className={`text-lg font-black ${act.type === 'in' ? 'text-emerald-500' : 'text-gray-800'}`}>
                    {act.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory