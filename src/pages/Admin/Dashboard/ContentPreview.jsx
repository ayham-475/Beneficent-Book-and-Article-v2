import React from 'react';
import { User, Tag, Calendar, Quote, Sparkles } from 'lucide-react';

const ContentPreview = ({ ContentPreviewData ,user}) => {
  return (
    <div className="bg-[#161616] rounded-[2.5rem] mt-10   border border-white/5 shadow-2xl overflow-hidden flex flex-col">
      
      {/* رأس المكون - أنيق وبسيط */}
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#1a1a1a]/30">
        <div className="flex items-center gap-3">
          <Sparkles className="text-emerald-500" size={20} />
          <h3 className="text-white font-black text-sm uppercase tracking-tighter">معاينة المحتوى الإبداعي</h3>
        </div>
        <div className="px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <span className="text-emerald-500 text-[10px] font-black italic">PREMIUM VIEW</span>
        </div>
      </div>

      {/* منطقة المحتوى - بدون سكرول داخلي (انسيابية كاملة) */}
      <div className="p-10 md:p-16 space-y-12">
        {/* الصورة الرئيسية - تأثير الفخامة */}
        <div className="relative h-[270px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          <img src={ContentPreviewData.img_path}
            
            className="w-full h-full object-cover" 
            alt="Article Header" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-60" />
        </div>

        {/* معلومات المقال - توزيع متناسق */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f0f0f] p-5 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <User size={22} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">الكاتب المعتمد</p>
              <p className="text-white font-black"> {user.username}</p>
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-5 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <Tag size={22} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">التصنيف</p>
              <p className="text-white font-black text-emerald-400">{ContentPreviewData.category_id}</p>
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-5 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
              <Calendar size={22} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">تاريخ النشر</p>
              <p className="text-white font-black text-gray-300">{ContentPreviewData.created_at}</p>
            </div>
          </div>
        </div>

        {/* محتوى النص - خطوط عريضة ومريحة */}
        <article className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-black text-white leading-[1.15] tracking-tight">
            {ContentPreviewData.title}
         </h1>
          
          <div className="relative">
            <Quote className="absolute -right-16 -top-4 text-emerald-500/10 w-32 h-32" />
            <p className="text-2xl text-gray-400 leading-[1.8] font-light text-right relative z-10">
              {ContentPreviewData.desc}
            </p>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-10" />

          <div className="prose prose-invert max-w-none text-gray-500 text-xl leading-loose">
            <p>
              هذا التصميم يعود الآن للنمط الانسيابي الكامل الذي تفضله، حيث يظهر المقال كقطعة واحدة متماسكة. 
              المسافات هنا محسوبة لتكون مريحة جداً للعين عند المراجعة، مع التركيز على تباين الألوان بين الأبيض الصريح للعنوان والرمادي الهادئ للنصوص.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ContentPreview;