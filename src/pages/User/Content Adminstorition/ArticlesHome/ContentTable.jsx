import React from 'react';
import { Edit3, Trash2, ExternalLink, MoreVertical } from 'lucide-react';

const ContentTable = () => {
  const contents = [
    { id: 1, title: 'تعلم React من الصفر', type: 'كتاب رقمي', status: 'منشور', price: '45 SAR', date: '2024-05-10' },
    { id: 2, title: 'أسرار التصميم الإبداعي', type: 'مقال', status: 'مسودة', price: 'مجاني', date: '2024-05-12' },
    // يمكن جلب البقية من الـ API
  ];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-white overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <h2 className="text-2xl font-black text-gray-800">قائمة أعمالك</h2>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#319795] transition-colors shadow-lg">
          + إضافة عمل جديد
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right" dir="rtl">
          <thead>
            <tr className="text-gray-400 text-sm uppercase">
              <th className="px-8 py-6 font-black">العمل</th>
              <th className="px-8 py-6 font-black">النوع</th>
              <th className="px-8 py-6 font-black">الحالة</th>
              <th className="px-8 py-6 font-black">السعر</th>
              <th className="px-8 py-6 font-black">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contents.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <span className="font-bold text-gray-700 group-hover:text-[#319795] transition-colors">{item.title}</span>
                  <p className="text-[10px] text-gray-400 mt-1">تاريخ النشر: {item.date}</p>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{item.type}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.status === 'منشور' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    <span className="text-sm font-bold text-gray-600">{item.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-gray-700">{item.price}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"><Edit3 size={18} /></button>
                    <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-colors"><ExternalLink size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentTable;