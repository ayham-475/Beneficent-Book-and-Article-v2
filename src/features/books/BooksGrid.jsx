import React, { useContext, useEffect, useState } from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/auther';
import { ContentDataContext } from '../../pages/User/Content Adminstorition/ArticlesHome/ArticlesContext';
const BooksSlider = () => {

  const { ContentData } = useContext(ContentDataContext);
  const [Books, SetBooks] = useState([])
  // 1. استخراج المصفوفة الأساسية بأمان لحمايتها من الـ undefined
  const allContent = Array.isArray(ContentData)
    ? ContentData
    : (ContentData?.contents || []);
  const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";

  useEffect(() => {
    const ContentsData = async () => {
      try {
        const contentsdata = await fetch(urlContents)
        const Contents = await contentsdata.json();
        console.log("books  : ", Contents)

        const booksArray = Contents.filter(item => item.content_type === "BOOK");
        SetBooks(booksArray)


      }
      catch (error) {
        console.error("Error fetching Books:", error);

      }

    }

    ContentsData()
  }, [])



  // 2. التصفية الصارمة: جلب العناصر التي نوعها مقالة فقط (BOOKS)


  const { user } = useContext(AuthContext);
  return (
    <section className="py-[8vw] md:py-[6vw] px-[4vw] bg-[#020617]" dir="rtl">
      {/* عنوان القسم - تكبير الخط في الجوال ليكون واضحاً */}
      <div className="flex justify-between items-center mb-[5vw] md:mb-[3vw]">
        <h2 className="text-[5.5vw] md:text-[3.5vw] font-black text-white border-r-4 border-blue-600 pr-4">
          عروض <span className="text-blue-500">حصرية</span> لك
        </h2>
        <button className="text-[3.5vw] md:text-[1.4vw] text-gray-400 hover:text-blue-500 transition-colors">عرض الكل</button>
      </div>

      {/* حاوية السلايدر */}
      {/* حاوية السلايدر */}
      <div className="relative group">
        <div
          className="flex flex-row gap-[2vw] md:gap-[2.5vw] overflow-x-auto scroll-smooth no-scrollbar pb-[4vw] md:pb-[2vw]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {Books.map((book) => (

            <div
              className="w-[29.3vw] md:w-[18vw] group/card bg-[#1e293b]/40 border border-white/10 rounded-2xl p-[1.5vw] hover:border-blue-500/50 transition-all relative"
            >
              {/* شارة التخفيض */}
              {book.tag && (
                <span className="absolute top-[1.5vw] right-[1.5vw] z-10 bg-blue-600 text-white text-[1.8vw] md:text-[0.8vw] font-bold px-[1.2vw] py-[0.4vw] rounded-md shadow-lg">
                  {book.tag}
                </span>
              )}

              {/* غلاف الكتاب */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-[2vw] md:mb-[1.5vw] bg-black">
                <img src={book.img_path} alt={book.title} className="w-full h-full object-cover opacity-90 group-hover/card:scale-105 transition-transform duration-500" />

                <div className="hidden md:flex absolute inset-0 items-center justify-center gap-[1vw] opacity-0 group-hover/card:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <button className="p-[0.8vw] bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Eye size={"1.2vw"} /></button>
                  <Link to={`/BookCardDeatils/${book.content_id}`} key={book.content_id} className="flex-none">
                    <button className="p-[0.8vw] bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                      <ShoppingCart size={"1.2vw"} /></button></Link>
                </div>
              </div>

              {/* اسم الكتاب */}
              <h3 className="text-white font-bold text-[2.8vw] md:text-[1.4vw] mb-[1vw] md:mb-[0.5vw] truncate">{book.title}</h3>

              <div className="flex items-center gap-[0.8vw] md:gap-[0.4vw] mb-[2vw] md:mb-[1vw]">
                <Star size={"2.5vw"} className="text-yellow-500 fill-yellow-500 md:w-[1vw] md:h-[1vw]" />
                <span className="text-white text-[2.5vw] md:text-[1vw] font-bold">{book.rate}</span>
              </div>

              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-emerald-400 font-black text-[3.5vw] md:text-[1.8vw] leading-none">${book.price}</span>
                  <span className="text-gray-500 line-through text-[2.2vw] md:text-[1vw]">${book.oldPrice}</span>
                </div>
                <Link to={(user) ? `/ /${book.content_id}` : `/login`} key={book.content_id} className="flex-none"> <button className="mt-2 md:mt-0 bg-blue-600/20 text-blue-400 border border-blue-500/30 p-[1.5vw] md:p-[0.7vw] rounded-xl hover:bg-blue-600 hover:text-white transition-all flex justify-center">
                  <ShoppingCart size={"3.5vw"} className="md:w-[1.4vw] md:h-[1.4vw]" />
                </button></Link>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSlider;