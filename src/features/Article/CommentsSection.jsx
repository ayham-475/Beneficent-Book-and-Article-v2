import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Reply, Send, MessageCircle } from 'lucide-react';

const CommentsSection = () => {
    const comments = [
        { id: 1, user: "أحمد العلوي", avatar: "https://i.pravatar.cc/150?u=1", date: "منذ ساعتين", text: "مقال رائع جداً، أسلوب الكتابة سلس والمعلومات قيمة للغاية." },
        { id: 3, user: "ياسين المنصوري", avatar: "https://i.pravatar.cc/150?u=3", date: "منذ يوم", text: "التصميم الجديد للموقع يفتح النفس للقراءة! استمروا." },
        { id: 2, user: "سارة محمود", avatar: "https://i.pravatar.cc/150?u=2", date: "منذ 5 ساعات", text: "أعجبني الربط بين الفلسفة والواقع الرقمي، نحتاج لمثل هذه الرؤى." },
        { id: 3, user: "ياسين المنصوري", avatar: "https://i.pravatar.cc/150?u=3", date: "منذ يوم", text: "التصميم الجديد للموقع يفتح النفس للقراءة! استمروا." },
        { id: 4, user: "نورة علي", avatar: "https://i.pravatar.cc/150?u=4", date: "منذ يومين", text: "هل هناك جزء ثاني لهذا المقال؟ أتمنى التعمق أكثر." },
        { id: 3, user: "ياسين المنصوري", avatar: "https://i.pravatar.cc/150?u=3", date: "منذ يوم", text: "التصميم الجديد للموقع يفتح النفس للقراءة! استمروا." },
  ];

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto px-2" dir="rtl">
      {/* رأس القسم متناسق مع ألوان الموقع */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-600/20 rounded-xl border border-blue-500/30">
          <MessageCircle className="text-blue-400" size={22} />
        </div>
        <h4 className="text-xl md:text-2xl font-black text-white">
          التعليقات <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-0.5 rounded-full mr-2">{comments.length}</span>
        </h4>
      </div>

      {/* منطقة التعليقات بسكرول مخفي وطول مدروس */}
      <div 
        className="relative max-h-[400px] md:max-h-[500px] overflow-y-auto pl-2 space-y-3 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `div::-webkit-scrollbar { display: none; }` }} />

        {comments.map((comment, index) => (
          <motion.div 
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group bg-white/5 backdrop-blur-md border border-white/10 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex gap-3 md:gap-4">
              {/* صورة رمزية أصغر في الهاتف */}
              <div className="relative flex-shrink-0">
                <img 
                  src={comment.avatar} 
                  className="w-10 h-10 md:w-14 md:h-14 rounded-xl object-cover border border-white/10" 
                  alt={comment.user} 
                />
              </div>

              {/* المحتوى مضغوط وأنيق */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-bold text-blue-400 text-sm md:text-lg truncate">{comment.user}</h5>
                  <span className="text-[10px] md:text-xs text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-300 leading-snug text-sm md:text-base mb-2 line-clamp-3 md:line-clamp-none">
                  {comment.text}
                </p>

                {/* أزرار تفاعل صغيرة جداً لتوفير المساحة */}
                <div className="flex gap-4 pt-2 border-t border-white/5">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-400 transition-colors text-[11px] md:text-xs font-bold">
                    <Heart size={14} /> <span>12</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-400 transition-colors text-[11px] md:text-xs font-bold">
                    <Reply size={14} /> <span>رد</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* صندوق الإضافة - نحيف جداً للهاتف */}
      <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 p-2 md:p-3 rounded-[1.2rem] md:rounded-full focus-within:border-blue-500/50 transition-all shadow-2xl">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="اكتب تعليقك..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-base font-medium px-4 py-1"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 md:px-5 md:py-2 rounded-[0.9rem] md:rounded-full flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            <span className="hidden md:block font-bold text-sm">إرسال</span>
            <Send size={18} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;