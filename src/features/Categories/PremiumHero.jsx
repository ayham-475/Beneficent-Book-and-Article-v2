export const PremiumHero = ({ category }) => (
  <div className="relative md:mt-10 md:mx-3 h-[70vh] flex items-center px-6 md:px-16 overflow-hidden">
    {/* خلفية فخمة مع إضاءة خافتة */}
    <div className="absolute inset-0 z-0">
      <img src={category.bgImage} className="w-full h-full object-cover opacity-40 scale-110" alt="" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#080809] via-[#080809]/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-3xl space-y-6">
      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">إصدارات حصرية لعام 2026</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
        استثمر في <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">أثمن أصولك: عقلك.</span>
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
        انضم لـ {category.subscribers} قارئ اختاروا التميز في مجال {category.name}. كتبنا ليست مجرد ورق، بل هي تجارب عُصِرَت لتختصر لك سنوات من العناء.
      </p>

      <div className="flex gap-4 pt-4">
        <button className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all">
          استكشف الأكثر مبيعاً
        </button>
        <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-white/10 transition-all">
          تحدث مع مستشار ثقافي
        </button>
      </div>
    </div>
  </div>
);