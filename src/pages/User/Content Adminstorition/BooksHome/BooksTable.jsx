import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Eye, Star, BookOpen } from 'lucide-react';
import { AuthContext } from '../../../../features/auth/auther';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const BooksTable = ({BooKsSerched}) => {
  const { user } = useContext(AuthContext);
  const [Books, SetBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  // const API_URL = "http://localhost:3000/contents";
    const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";

  // const API_URL = "https://698292229c3efeb892a2ab23.mockapi.io/api/v1/contents"; 
  const HandleDelete = async (id) => {

    const confirmDelete = window.confirm(id + "هل أنت متأكد من حذف هذا الكتاب ؟");
    if (!confirmDelete)
      return;
    try {
      const contentData = await fetch(`${urlContents}${id}`, {
        method: "DELETE",
      });
      if (contentData.ok) {
        SetBook(Books.filter(item => item.content_id != id))
        setMessage({
          text: dataArticle ? "تم حذف الكتاب بنجاح!" : "تم إنشاء الكتاب بنجاح!",
          
          type: "success"
        });
      }
    }catch (error) {
      // setMessage({ text: "حدث خطأ أثناء الاتصال بالسيرفر.", type: "error" });
    }
  }


  if(!BooKsSerched)return <div className="p-10 text-center font-black text-gray-400 animate-pulse">جاري تحميل مقالاتك الإبداعية...</div>;

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[1rem] border border-white shadow-2xl overflow-hidden">

      {/* تصميم الكمبيوتر - مع سكرول مخفي بديع */}
      <div className="hidden md:block">
        {/* الحاوية التي تحتوي على السكرول */}
        <div className="max-h-[600px] overflow-y-auto no-scrollbar scroll-smooth">
          <table className="w-full text-right border-collapse">
            <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur-md">
              <tr className="text-gray-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-100/50">
                <th className="px-8 py-6">الكتاب والتصنيف</th>
                <th className="px-8 py-6">الحالة</th>
                <th className="px-8 py-6">الإحصائيات</th>
                <th className="px-8 py-6">السعر</th>
                <th className="px-8 py-6">الإجراءات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100/50">
              {BooKsSerched.map((book, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  key={book.content_id}
                  className="hover:bg-white/80 transition-all duration-300 group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img
                          src={book.img_path}
                          className="w-14 h-20 object-cover rounded-xl shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]"></div>
                      </div>
                      <div>
                        <p className="font-black text-gray-800 text-base mb-1 group-hover:text-[#319795] transition-colors">
                          {book.title}
                        </p>
                        <span className="bg-gray-100 text-gray-500 text-[9px] px-2 py-1 rounded-lg font-black uppercase">
                          {book.category_id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${book.status === 'منشور' ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`}></span>
                      <span className={`text-[10px] font-black ${book.status === 'منشور' ? 'text-green-600' : 'text-orange-600'}`}>
                        {book.status}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                          <Eye size={14} />
                        </div>
                        <span className="text-xs font-black text-gray-700">{book.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
                          <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-[10px] font-black text-gray-600">{book.price}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="inline-block px-4 py-2 bg-[#319795]/10 rounded-2xl">
                      <span className="font-black text-[#319795] text-sm">{book.price}</span>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex gap-3">
                      <Link to="/AddDataContent" state={{ BookData: book }}><button className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl text-gray-400 hover:text-[#319795] hover:shadow-md transition-all active:scale-90">
                        <Edit3 size={18} />
                      </button>
                      </Link>
                      <button 
                        onClick={() => HandleDelete(book.content_id)} // ✅ مررنا الآيدي الخاص بالكتاب في هذه اللفة
                        className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 hover:shadow-md transition-all active:scale-90"
                      >
                        <Trash2  size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* تصميم الهاتف - سكرول عمودي للبطاقات */}
      <div className="md:hidden">
        <div className="max-h-[500px] overflow-y-auto no-scrollbar p-5 space-y-5">
          {BooKsSerched.map((book) => (
            <div key={book.content_id} className="bg-white/80 p-5 rounded-[2.5rem] shadow-sm border border-white relative group overflow-hidden">
              <div className="flex gap-5">
                <img src={book.img_path} className="w-24 h-32 object-cover rounded-[1.5rem] shadow-xl" />
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-black bg-[#319795] text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-teal-500/20">
                      {book.category_id}
                    </span>
                    <span className="font-black text-[#319795] text-sm">{book.price}</span>
                  </div>
                  <h3 className="text-base font-black text-gray-800 leading-tight mb-4">{book.title}</h3>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-[8px] font-bold text-gray-400 uppercase">قراءات</p>
                        <p className="text-xs font-black text-gray-700">{book.price}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] font-bold text-gray-400 uppercase">تقييم</p>
                        <p className="text-xs font-black text-orange-500">{book.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/AddDataContent" state={{ BookData: book }} ><button className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Edit3 size={16} /></button></Link>

                      <button
                        onClick={() => HandleDelete(book.content_id)} // ✅ تأكد من التعديل هنا أيضاً
                        className="p-2.5 bg-red-50 text-red-500 rounded-xl"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
      {message.text && (
          <div className={`mt-10 p-5 rounded-3xl text-center font-black shadow-lg animate-bounce ${message.type === "error" ? "bg-rose-100 text-rose-600 border border-rose-200" : "bg-emerald-100 text-emerald-600 border border-emerald-200"
            }`}>
            {message.text}
          </div>
        )}
    </div>
  );
};

export default BooksTable;