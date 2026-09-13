import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Bookmark, Quote, Clock, Check, ArrowRight } from 'lucide-react';
import Navbar from '../../App/Public/Layout/Hedder';
import Footer from '../home/Footer';
import CommentsSection from './CommentsSection';
import { ContentDataContext } from '../../pages/User/Content Adminstorition/ArticlesHome/ArticlesContext';
import { useToast } from '../../App/Public/Contexts/ToastContext';
import { api } from '../../services/apiClient';

const CreativeArticleView = () => {
  const { ArticleId } = useParams();
  const { toast } = useToast();
  const { ContentData } = useContext(ContentDataContext);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(128);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);
        const data = await api.get('/rest/Content-articles/');
        if (Array.isArray(data)) {
          const onlyArticles = data.filter((item) => item.content_type === 'ARTICLE' || !item.content_type);
          setArticles(onlyArticles);
        }
      } catch (err) {
        console.warn('Fallback to context data for articles:', err);
      } finally {
        setLoading(false);
      }
    };
    getContent();
  }, []);

  const allArticles = articles.length > 0 ? articles : (Array.isArray(ContentData) ? ContentData : []);
  const article = allArticles.find((b) => String(b.content_id) === String(ArticleId) || String(b.id) === String(ArticleId));

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      toast.success('شكراً لتفاعلك! تم تسجيل إعجابك بالمقال.', 'إعجاب بالمقال');
    } else {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
      toast.info('تم إلغاء الإعجاب بالمقال.');
    }
  };

  const handleSave = () => {
    if (!saved) {
      setSaved(true);
      toast.success('تمت إضافة المقال إلى قائمتك المحفوظة للقراءة لاحقاً.', 'تم الحفظ');
    } else {
      setSaved(false);
      toast.info('تمت إزالة المقال من قائمتك المحفوظة.');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.info('تم نسخ رابط المقال إلى الحافظة للمشاركة!', 'رابط المقال');
    } else {
      toast.info('رابط المقال جاهز للمشاركة!');
    }
  };

  if (loading && !article) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex flex-col items-center justify-center gap-4" dir="rtl">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-400 font-bold text-sm">جاري تحميل المقال وقراءة السطور...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-[#020617] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        <Navbar />
        <div className="max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <h2 className="text-2xl font-black mb-3">عفواً، لم يتم العثور على هذا المقال</h2>
          <p className="text-gray-400 text-sm mb-6">قد يكون تم نقله أو حذفه بواسطة الكاتب.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all"
          >
            الرجوع إلى الخلف
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#f8fafc] min-h-screen font-sans pb-20" dir="rtl">
        {/* 1. Hero Header */}
        <header className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={article.img_path || 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop'}
              className="w-full h-full object-cover"
              alt={article.title}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
          </motion.div>

          <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-12 md:pb-16 px-4 sm:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 inline-block shadow-xl shadow-blue-600/30">
                {article.category || 'مقالات معرفية مختارة'}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 drop-shadow-2xl">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-1.5 pl-4 rounded-full border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">
                    {article.author_id ? article.author_id[0] : 'ك'}
                  </div>
                  <span className="font-bold text-xs sm:text-sm">{article.author_id || 'كاتب المنصة'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
                  <Clock size={16} className="text-blue-400" />
                  <span>5 دقائق للقراءة</span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* 2. منطقة المحتوى */}
        <main className="container mx-auto px-4 sm:px-8 -mt-10 relative z-20">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            {/* الأزرار التفاعلية العائمة */}
            <aside className="lg:w-20 flex lg:flex-col gap-3 sticky top-24 h-fit order-2 lg:order-1 justify-center md:justify-start">
              {/* زر الإعجاب */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleLike}
                className="flex flex-col items-center gap-1 cursor-pointer"
                title="إعجاب بالمقال"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 shadow-xl rounded-2xl flex items-center justify-center border transition-all ${
                    liked
                      ? 'bg-rose-50 text-rose-500 border-rose-200'
                      : 'bg-white text-gray-400 border-gray-100 hover:text-rose-500'
                  }`}
                >
                  <Heart size={22} className={liked ? 'fill-rose-500 text-rose-500' : ''} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">{likesCount}</span>
              </motion.button>

              {/* زر الحفظ */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleSave}
                className="flex flex-col items-center gap-1 cursor-pointer"
                title="حفظ المقال"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 shadow-xl rounded-2xl flex items-center justify-center border transition-all ${
                    saved
                      ? 'bg-blue-50 text-blue-600 border-blue-200'
                      : 'bg-white text-gray-400 border-gray-100 hover:text-blue-500'
                  }`}
                >
                  <Bookmark size={22} className={saved ? 'fill-blue-600 text-blue-600' : ''} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">{saved ? 'محفوظ' : 'حفظ'}</span>
              </motion.button>

              {/* زر المشاركة */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleShare}
                className="flex flex-col items-center gap-1 cursor-pointer"
                title="مشاركة المقال"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 hover:text-cyan-500 transition-all">
                  <Share2 size={22} />
                </div>
                <span className="text-[10px] font-bold text-gray-500">مشاركة</span>
              </motion.button>
            </aside>

            {/* جسم المقال */}
            <section className="flex-1 bg-white p-6 sm:p-10 md:p-14 rounded-3xl md:rounded-[3rem] shadow-2xl shadow-gray-200/50 order-1 lg:order-2">
              <div className="prose prose-base sm:prose-lg max-w-none text-gray-800 leading-[1.9] text-right">
                {/* المقدمة */}
                <p className="text-lg sm:text-2xl font-light text-gray-600 mb-8 leading-relaxed border-r-4 border-blue-500 pr-5">
                  {article.description || 'هذا المقال يستعرض أفكاراً معمقة حول الموضوع بأسلوب فلسفي وتطبيقي فريد يثري القارئ بالمعرفة العميقة...'}
                </p>

                {/* اقتباس مميز */}
                {article.TextContent && (
                  <div className="relative my-8 sm:my-12 py-3">
                    <Quote className="text-blue-500/10 absolute -right-4 sm:-right-8 -top-4 w-16 h-16 sm:w-24 sm:h-24" />
                    <h3 className="text-xl sm:text-3xl font-black text-gray-900 pr-5 sm:pr-8 border-r-4 sm:border-r-8 border-blue-600 leading-snug">
                      {article.TextContent}
                    </h3>
                  </div>
                )}

                {/* نص المقال الديناميكي */}
                <div className="space-y-5 text-gray-700 text-base sm:text-lg font-normal">
                  {article.content ? (
                    <p className="whitespace-pre-line">{article.content}</p>
                  ) : (
                    <>
                      <p>
                        المعرفة هي الركيزة الأساسية التي تبنى عليها الحضارات وتزدهر بها العقول. في عالمنا المعاصر، تتسارع وتيرة تدفق المعلومات مما يجعل القراءة الانتقائية العميقة مهارة استثنائية تميز الباحث الحقيقي عن المتصفح العابر.
                      </p>
                      <p>
                        إن الأثر الحقيقي للقراءة لا يكمن في عدد الصفحات التي نطويها، بل في مقدار الأسئلة التي نثيرها والرؤى الجديدة التي تتشكل داخل وعينا. كل فكرة نكتسبها تفتح نافذة جديدة لفهم ذواتنا ومحيطنا.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* قسم التعليقات والمناقشة */}
              <div className="mt-12 pt-10 border-t border-gray-100">
                <CommentsSection articleId={ArticleId} />
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default CreativeArticleView;
