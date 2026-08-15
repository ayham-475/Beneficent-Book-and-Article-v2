import React from 'react';
import { Bookmark, Share2, ArrowLeft , TrendingUp, Zap, ArrowUpRight , ArrowRight, MousePointer2 } from 'lucide-react';
import Hedder from '../../App/Public/Layout/Hedder';
import Footer from "../../App/Public/Layout/Fotter";

const ArticleCard = ({ article }) => (
  <div className="flex-shrink-0 snap-item  group w-[46%] md:w-[calc(25%-1.5rem)] cursor-pointer">
    <div className="relative aspect-[3/4] overflow-hidden rounded-[1.2rem] md:rounded-[1.8rem] bg-[#111] mb-3">
      <img 
        src={article.image} 
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Badge */}
      <div className="absolute top-3 right-3">
         <span className="bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-md border border-emerald-500/30">
            {article.tag}
         </span>
      </div>
    </div>

    <div className="space-y-1">
      <h3 className="text-xs md:text-base font-black leading-snug text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <div className="flex items-center gap-2 text-[9px] md:text-[11px] text-gray-500 font-bold">
        <span>{article.author}</span>
        <span className="w-1 h-1 bg-gray-700 rounded-full" />
        <span>{article.readTime}</span>
      </div>
    </div>
  </div>
);

const ArticleCategoryView = () => {
  const articles = [
    { title: "استراتيجيات التفاوض في الصفقات الكبرى", tag: "ريادة أعمال", readTime: "5 دقائق", author: "خالد منصور", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500" },
    { title: "مستقبل التكنولوجيا المالية في الشرق الأوسط", tag: "اقتصاد", readTime: "7 دقائق", author: "نورة القحطاني", image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?w=500" },
    { title: "كيف تبني علامة تجارية شخصية قوية؟", tag: "تسويق", readTime: "4 دقائق", author: "سمير عادل", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500" },
    { title: "سيكولوجية المستهلك في عصر الذكاء الاصطناعي", tag: "علم نفس", readTime: "6 دقائق", author: "د. هالة يوسف", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500" },
  ];

  return (
    <div className="min-h-screen  bg-[#080809] text-white selection:bg-emerald-500 selection:text-black" dir="rtl">
      <Hedder />
      
      {/* 1. HERO SECTION: تصميم هادف ومبهر بلمسة واقعية */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        {/* الخلفية: صورة خافتة مع تدرج عميق */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600" 
                className="w-full h-full object-cover opacity-20 grayscale"
                alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#080809] via-[#080809]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className=" md:mt-19 space-y-8">
              <div className="inline-flex items-center gap-2 bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                 <TrendingUp size={14} />
                 الأكثر تأثيراً اليوم
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight text-white">
                مقالات تُعيد تعريف <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                   مشهد الأعمال الحديث.
                </span>
              </h1>
              
              <p className="max-w-lg text-gray-400 text-sm md:text-lg font-medium leading-relaxed border-r-4 border-emerald-500 pr-6">
                انضم إلى أكثر من 50,000 قارئ محترف يحصلون على تحليلات يومية معمقة حول الابتكار، القيادة، والتوجهات المستقبلية. محتوى صُنع ليكون مرجعك الأول.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                 <button className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-500 transition-all group">
                    ابدأ القراءة الآن
                    <ArrowRight size={18} className="group-hover:translate-x-[-4px] transition-transform" />
                 </button>
                 <div className="flex -space-x-3 rtl:space-x-reverse items-center">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#080809] bg-gray-800 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                        </div>
                    ))}
                    <span className="pr-4 text-xs font-bold text-gray-500">+10k قارئ نشط</span>
                 </div>
              </div>
            </div>

            {/* عنصر بصري تفاعلي جهة اليسار (للكومبيوتر) */}
            <div className="hidden md:block relative">
                <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                            <Zap size={24} className="text-black" fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-xs text-emerald-500 font-black tracking-widest uppercase">مقال الساعة</p>
                            <h4 className="text-xl font-black">الاقتصاد الأخضر 2026</h4>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        "التحول نحو الطاقة المستدامة ليس مجرد خيار بيئي، بل هو المحرك القادم لأضخم الثروات في العقد القادم..."
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-white/40 uppercase">12 دقيقة قراءة</span>
                        <button className="text-white hover:text-emerald-500 transition-colors">
                            <ArrowUpRight size={24} />
                        </button>
                    </div>
                </div>
                {/* الدوائر الزخرفية خلف العنصر */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-5 py-20">
        
        {/* 2. SECTION: THE SLIDER (نفس منطق الكتب - بطاقتين في الهاتف) */}
        <div className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl md:text-4xl font-black">أحدث ما تم نشره</h2>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Latest Insights</p>
            </div>
            <button className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2">
                عرض الكل <ArrowLeft size={16} />
            </button>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .snap-x-mandatory { scroll-snap-type: x mandatory; }
            .snap-item { scroll-snap-align: start; }
          `}} />

          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar snap-x-mandatory pb-6">
            {[...articles, ...articles].map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))}
          </div>
        </div>

        {/* 3. SECTION: CALL TO ACTION (تصميم يسر الناظرين) */}
        <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-emerald-600 group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200" className="w-full h-full object-cover mix-blend-overlay opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="relative z-10 p-10 md:p-24 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6">لا تكتفِ بالخبر، <br/> افهم ما وراءه.</h2>
                    <p className="text-emerald-100/80 text-lg font-medium">اشترك في "نشرة العقول" الأسبوعية، واحصل على زبدة المقالات والتحليلات التي تهم مستقبلك المهني.</p>
                </div>
                <div className="shrink-0">
                    <button className="bg-black text-white px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-4">
                        سجل مجاناً
                        <MousePointer2 size={20} />
                    </button>
                </div>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default ArticleCategoryView;