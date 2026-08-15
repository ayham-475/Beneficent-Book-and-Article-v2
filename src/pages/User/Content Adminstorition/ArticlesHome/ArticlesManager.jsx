import React, { useContext, useState ,useEffect } from 'react';
import { 
  Plus, Search, Filter, Clock
} from 'lucide-react';
import { ContentDataContext } from '../ArticlesHome/ArticlesContext';
import { AuthContext } from '../../../../features/auth/auther';
import { Link } from 'react-router-dom';
import ArticlesTable from "./ArticlesTable"
const ArticlesManager = () => {

  
  const [searchTerm, setSearchTerm] = useState("");

        const [UserArticles, SetUserArticles] = useState([]);
  const { user } = useContext(AuthContext);

 const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";
 useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(urlContents);
        const contents = await res.json();
        const userBooks = contents.filter(
          (item) => item.user === user.id && item.content_type === "ARTICLE"
        );
        
        SetUserArticles(userBooks);
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };

    if (user?.id) fetchArticles();
  }, [user?.id]);
   
  const SerchedArticles=UserArticles.filter((Article)=>{
    const nameArticle=searchTerm.toLowerCase(searchTerm);
    return(
      (Article.title&&Article.title.toLowerCase().includes(nameArticle))||
      (Article.content_id&&String(Article.content_id).toLowerCase().includes(nameArticle))

    )

  })


  // بيانات تجريبية تحاكي الواقع

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "2.5rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.03)"
  };

  return (
    <div className="min-h-screen mt-10 bg-[#F0F2F5] p-6 md:p-12" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-3">مقالاتي</h1>
            <p className="text-gray-500 font-bold text-lg">لديك <span className="text-[#319795]"></span> مقالات منشورة ومسودات.</p>
          </div>
          
        </header>

        {/* Search & Filter Bar */}
        <div style={cardStyle} className="p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="ابحث عن عنوان مقال..."
              value={searchTerm}
              className="w-full bg-white/50 border-none rounded-2xl py-4 pr-12 pl-4 focus:ring-2 ring-[#319795]/20 outline-none font-bold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-4 bg-white/60 rounded-2xl text-gray-600 hover:bg-white transition-colors"><Filter size={20} /></button>
            <select className="flex-1 md:flex-none p-4 bg-white/60 rounded-2xl text-gray-700 font-bold border-none outline-none">
              <option>الأحدث أولاً</option>
              <option>الأكثر مشاهدة</option>
            </select>
          </div>
        </div>

        {/* Articles List / Grid */}
       <ArticlesTable SerchedArticles={(SerchedArticles)?SerchedArticles:UserArticles }/>
      </div>
    </div>
  );
};

// أيقونة التاريخ لعدم نسيانها
const CalendarDays = ({ size }) => <Clock size={size} />;

export default ArticlesManager;