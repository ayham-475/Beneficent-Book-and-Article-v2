import { useEffect, useState } from "react";

export default function DecisionPanel({ ContentPreviewData }) {

  const GetContentToUpdate = async (newContentPreviewData) => {
    try {

      // الخطوة 2: الآن نرسل طلب التعديل (PATCH) على الرابط الذي يفهمه السيرفر 100%
      const response = await fetch(`http://127.0.0.1:8080/rest/Content-articles/${ContentPreviewData.content_id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContentPreviewData)
      });

      if (!response.ok) {
        throw new Error(`السيرفر رفض التعديل برقم: ${response.status}`);
      }

      const result = await response.json();
      alert("تم التعديل بنجاح!");
      console.log("النتيجة النهائية بعد التعديل:", result);

    } catch (error) {
      alert(`خطأ في التعديل: ${error.message}`);
    }
  }
  function HandlChangeState() {
    const newContentPreviewData={...ContentPreviewData};
    newContentPreviewData.status="PUBLISHED";
    GetContentToUpdate(newContentPreviewData);
  }

  return (
    <div className="w-full bg-[#161616] p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">

      {/* لمسة جمالية خلفية */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <h4 className="text-white font-black mb-8 flex items-center gap-3 text-xl italic">
        <div className="w-2 h-6 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
        اتخاذ إجراء مراجعة
      </h4>

      <div className="flex flex-col gap-8">
        <div className="relative group/input">
          <textarea
            className="w-full bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-6 text-gray-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-lg leading-relaxed placeholder:text-gray-600 shadow-inner"
            rows="4"
            placeholder="أكتب ملاحظات المراجعة للكاتب (في حال الرفض أو القبول)..."
          ></textarea>
          <div className="absolute bottom-4 left-6 text-[10px] font-bold text-gray-700 tracking-widest uppercase opacity-0 group-focus-within/input:opacity-100 transition-opacity">
            Notes Area
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={HandlChangeState} className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-[1.5rem] shadow-2xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
            قبول ونشر المحتوى (Approve)
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform">✓</div>
          </button >

          <button className="flex-1 py-5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-gray-400 font-bold rounded-[1.5rem] transition-all active:scale-95 border border-white/5 hover:border-red-500/30">
            رفض (Reject)
          </button>
        </div>
      </div>
    </div>)
}