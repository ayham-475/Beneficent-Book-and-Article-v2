export const TrustSignals = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-white/5 my-20">
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">🛡️</div>
      <div>
        <h4 className="font-black text-white text-sm">حماية المشتري</h4>
        <p className="text-gray-500 text-[10px] mt-1">ضمان استرجاع الأموال في حال عدم الرضا عن جودة المحتوى.</p>
      </div>
    </div>
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">⚡</div>
      <div>
        <h4 className="font-black text-white text-sm">وصول فوري</h4>
        <p className="text-gray-500 text-[10px] mt-1">بمجرد الشراء، يصبح الكتاب في مكتبتك الرقمية للأبد.</p>
      </div>
    </div>
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">💎</div>
      <div>
        <h4 className="font-black text-white text-sm">محتوى حصري</h4>
        <p className="text-gray-500 text-[10px] mt-1">إصدارات خاصة لن تجدها في أي منصة أخرى حول العالم.</p>
      </div>
    </div>
  </div>
);