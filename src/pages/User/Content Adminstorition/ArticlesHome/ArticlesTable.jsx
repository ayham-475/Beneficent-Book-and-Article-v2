import React, { useState, useContext, useEffect } from 'react';
import { 
  Edit3, Trash2, Eye, Calendar, Plus,
  MessageSquare, MoreVertical, Share2
} from 'lucide-react';
import { AuthContext } from '../../../../features/auth/auther';
import ArticleEditor from './ArticleEditor';
import { Link } from 'react-router-dom';
const SmartArticlesManager = ({SerchedArticles}) => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [n,setn]=useState(1)
  
  // const API_URL = "https://698292229c3efeb892a2ab23.mockapi.io/api/v1/contents"; 
  // const API_URL = "http://localhost:3000/co/ntents"; 
    const API_URL = "http://127.0.0.1:8080/rest/Content-articles/";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(API_URL);
        
        const contents = await res.json();
        const userArticles = contents.filter(
            

          (item) => item.user === user.id && item.content_type === "ARTICLE"
          
        );
          console.log("contents w  : ",userArticles)

                 setn(n+1)

        setArticles(userArticles);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    if (user?.id) fetchArticles();
  }, [user?.id]);

 const handlDelete = async (id) => {
   alert(id)
    const confirmDelete = window.confirm("هل أنت تأكد من حذف هذه المقالة ؟");
    if (!confirmDelete) return; // ✅ الإلغاء إذا لم يوافق المستخدم

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}${id}`, { // ✅ إضافة الـ ID إلى الرابط
        method: "DELETE",
        headers: {
          "Authorization": `Token ${token}`
        }
      });

      if (res.ok) {
        // تحديث الواجهة وحذف المقال من الـ State
        setArticles(prev => prev.filter(item => (item.content_id || item.id) !== id));
      } else {
        alert("فشل حذف المقالة من السيرفر.");
      }
    } catch (error) {
      alert("حدث خطأ في الاتصال: " + error.message);
    }
  };
  if (loading) return <div className="p-10 text-center font-black text-gray-400 animate-pulse">جاري تحميل مقالاتك الإبداعية...</div>;
  function handlupdateArticle(art){
     

  }
  return (
    <div className="p-2 md:p-8" dir="rtl">
      <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] border border-white/50 shadow-2xl overflow-hidden">
        
        {/* --- Header --- */}
        <div className="p-6 md:p-10 border-b border-white/40 flex justify-between items-center bg-white/20">
          <div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter">إدارة المقالات</h2>
            <p className="text-[10px] md:text-sm font-bold text-gray-500 mt-1">لديك {articles.length} أعمال إبداعية</p>
          </div>
          <Link to="/ArticleEditor" >
          <button className="flex items-center gap-2 bg-[#319795] text-white px-7 py-3 rounded-3xl font-black shadow-lg shadow-[#319795]/30 hover:scale-105 transition-transform">
            <Plus size={24} /> كتابة مقال جديد
          </button>
          </Link>
        </div>

        {/* --- Main Content Container --- */}
        <div className="max-h-[75vh] overflow-y-auto no-scrollbar">
          
          {/* 1. تصميم الكمبيوتر (Desktop View) */}
          <div className="hidden md:block">
            <table className="w-full text-right border-collapse">
              <thead className="sticky top-0 bg-white/60 backdrop-blur-xl z-10">
                <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-10 py-6 font-black">المقال التفصيلي</th>
                  <th className="px-10 py-6 font-black">التصنيف</th>
                  <th className="px-10 py-6 font-black">التفاعل</th>
                  <th className="px-10 py-6 font-black">الحالة</th>
                  <th className="px-10 py-6 font-black text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/30">
                {SerchedArticles.map((art) => (
                  <tr key={art.content_id} className="hover:bg-white/40 transition-all group">
                    <td className="px-10 py-6">
                      <div className="font-bold text-gray-800 text-lg group-hover:text-[#319795] transition-colors">{art.title}</div>
                      <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-medium italic"><Calendar size={12}/> {art.created_at}</div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="bg-white/60 px-4 py-1.5 rounded-xl text-[10px] font-black text-gray-500 border border-white shadow-sm uppercase">{art.category_id}</span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1.5 text-xs font-black text-gray-600"><Eye size={14} className="text-blue-400"/> {art.views || 0}</span>
                        <span className="flex items-center gap-1.5 text-xs font-black text-gray-600"><MessageSquare size={14} className="text-purple-400"/> {art.comments_count || 0}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                       <StatusBadge status={art.status || "مسودة"} />
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex gap-2 justify-end">
                     <Link to="/ArticleEditor"  state={{articledata:art}} > 
                      <button  className="p-2.5 bg-white rounded-xl shadow-sm text-gray-400 hover:text-[#319795] hover:shadow-md transition-all"><Edit3 size={18}/></button> </Link> 
                        <button className="p-2.5 bg-white rounded-xl shadow-sm text-gray-400 hover:text-rose-500 hover:shadow-md transition-all"  onClick={()=>handlDelete(art.content_id)}><Trash2 size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. تصميم الهاتف الإبداعي (Mobile View) */}
          <div className="md:hidden p-4 space-y-4">
            {SerchedArticles.map((art) => (
              <div key={art.content_id} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm relative group active:scale-[0.98] transition-transform">
                
                {/* الجزء العلوي: التصنيف والإجراءات */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] font-black bg-white/80 text-[#319795] px-3 py-1 rounded-full border border-[#319795]/10 shadow-sm uppercase tracking-wider">
                    {art.category_id}
                  </span>
                  <div className="flex gap-3 text-gray-400">
                    <button  onClick={()=>{handlupdateArticle(art)}}   className="p-1 hover:text-[#319795]"><Edit3 size={16} /></button>
                    <button className="p-1 hover:text-rose-500"><Trash2 size={16} /></button>
                  </div>
                </div>

                {/* العنوان */}
                <h3 className="text-[15px] font-black text-gray-800 leading-tight mb-5 line-clamp-2">
                  {art.title}
                </h3>

                {/* الإحصائيات والحالة */}
                <div className="flex justify-between items-center pt-4 border-t border-white/40">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[10px] font-black text-gray-500">
                      <Eye size={12} className="text-blue-400"/> {art.views || 0}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-black text-gray-500">
                      <Calendar size={12} className="text-teal-400"/> {art.created_at?.split('T')[0]}
                    </span>
                  </div>
                  <StatusBadge status={art.status || "مسودة"} isMobile />
                </div>
              </div>
            ))}
          </div>

          {/* في حال عدم وجود بيانات */}
          {articles.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-bold">لم تكتب أي مقالات بعد.. ابدأ رحلتك الآن!</div>
          )}

        </div>
      </div>
    </div>
  );
};

// مكون الحالة (Status Badge)
const StatusBadge = ({ status, isMobile }) => {
  const styles = {
    "منشور": "bg-emerald-50 text-emerald-600 border-emerald-100/50",
    "مسودة": "bg-gray-50 text-gray-500 border-gray-100",
    "قيد المراجعة": "bg-amber-50 text-amber-600 border-amber-100/50",
  };
  
  const currentStyle = styles[status] || styles["مسودة"];
  
  return (
    <span className={`rounded-full font-black border tracking-tighter ${isMobile ? 'px-3 py-1 text-[9px]' : 'px-4 py-1.5 text-[11px]'} ${currentStyle} shadow-sm inline-block`}>
      {status}
    </span>
  );
};

export default SmartArticlesManager;