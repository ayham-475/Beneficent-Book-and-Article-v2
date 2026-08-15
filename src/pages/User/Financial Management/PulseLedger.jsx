import { Calendar, CheckCircle, Clock } from 'lucide-react';

const PulseLedger = () => {
  const data = [
    { id: 1, title: "دفعة مبيعات 'أسرار النجاح'", type: "إيداع", amount: "+$240.00", date: "اليوم، 02:45 م", status: "success" },
    { id: 2, title: "سحب أرباح إلى حساب بنكي", type: "سحب", amount: "-$1,200.00", date: "أمس، 11:20 ص", status: "pending" },
    { id: 3, title: "مكافأة الكاتب المميز", type: "إيداع", amount: "+$50.00", date: "08 فبراير، 09:00 م", status: "success" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-2xl rounded-[4rem] border border-white shadow-2xl overflow-hidden mt-8">
      <div className="p-10 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tighter">النبض المالي</h3>
          <p className="text-xs font-bold text-gray-400 uppercase mt-1">تحليل كامل لآخر التحركات النقدية</p>
        </div>
        <button className="px-6 py-3 bg-gray-50 rounded-2xl text-xs font-black text-gray-500 hover:bg-black hover:text-white transition-all">
          تصدير كتقرير (PDF)
        </button>
      </div>

      <div className="max-h-[450px] overflow-y-auto no-scrollbar px-6 pb-10">
        <table className="w-full text-right border-separate border-spacing-y-4">
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="group transition-all hover:scale-[1.01]">
                <td className="bg-white p-6 rounded-r-[2.5rem] border-y border-r border-gray-50 shadow-sm group-hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      row.type === 'إيداع' ? 'bg-teal-50 text-teal-500' : 'bg-rose-50 text-rose-500'
                    }`}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm">{row.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{row.date}</p>
                    </div>
                  </div>
                </td>
                <td className="bg-white p-6 border-y border-gray-50 shadow-sm group-hover:shadow-md transition-all">
                  <div className="flex items-center gap-2">
                    {row.status === 'success' ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <Clock size={16} className="text-orange-400 animate-spin-slow" />
                    )}
                    <span className="text-[10px] font-black uppercase text-gray-500">
                      {row.status === 'success' ? 'مكتملة' : 'قيد المعالجة'}
                    </span>
                  </div>
                </td>
                <td className="bg-white p-6 rounded-l-[2.5rem] border-y border-l border-gray-50 shadow-sm group-hover:shadow-md transition-all text-left font-black text-lg">
                  <span className={row.type === 'إيداع' ? 'text-[#319795]' : 'text-gray-800'}>
                    {row.amount}
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
export default PulseLedger