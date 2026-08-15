import React, { useState } from 'react';
import { User, FileText, CreditCard, Mail, Save, ArrowRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function ProfileEditor() {
  const navigate = useNavigate();
  const { userId } = useParams();

  // حالة لإمساك رسائل الأخطاء وعرضها للمستخدم
  const [message, setMessage] = useState({ text: "", type: "" });

  // حالة البيانات الأساسية بدون حقل الصورة
  const [profileData, setProfileData] = useState({
    // profile_id: String(Math.floor(Math.random() * 100000)),
    user: userId,
    display_name: "",
    bio: "",
    payout_method: "PayPal",
    payout_details: "ayham.admin@example.com"
  });

  // دالة تحديث الحقول النصية ديناميكياً
  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const UrlProfile = "http://127.0.0.1:8080/rest/Profile/";

  // دالة الإرسال وحفظ البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // جلب التوكن من متصفح المستخدم لكي يتعرف الديجانغو على هويتك
    const token = localStorage.getItem("token  sw"); 

    try {
      const res = await fetch(UrlProfile, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Token ${token}` // إرسال التوكن لفك مشكلة الـ AnonymousUser
        },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        alert("تم تحديث الملف الشخصي بنجاح ✨");
        navigate("/login");
      } else {
        const errorData = await res.json();
        console.error("خطأ السيرفر:", errorData);
        setMessage({ 
          text: errorData.error || "فشل حفظ البيانات، تأكد من صحة الحقول.", 
          type: "error" 
        });
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الاتصال:", error);
      setMessage({ text: "حدث خطأ في الاتصال بالسيرفر. تأكد من تشغيله.", type: "error" });
    }
  };

  // الأنماط الجمالية للنيومورفيك والأزرق الملوكي
  const glassHeaderStyle = {
    background: "rgba(235, 243, 255, 0.4)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(193, 218, 255, 0.5)",
    borderRadius: "2.5rem",
    boxShadow: "0 8px 32px 0 rgba(26, 115, 232, 0.05)"
  };

  const cardStyle = {
    background: "#E0E8F5",
    borderRadius: "2.5rem",
    boxShadow: "20px 20px 60px #bec6d1, -20px -20px 60px #ffffff"
  };

  const inputStyle = {
    background: "#E0E8F5",
    boxShadow: "inset 6px 6px 12px #b8bfca, inset -6px -6px 12px #ffffff",
    border: "none",
    borderRadius: "1.25rem",
    width: "100%",
    padding: "1.2rem 1.5rem",
    outline: "none"
  };

  return (
    <div className="min-h-screen bg-[#E0E8F5] pb-20 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto pt-16 px-4" dir="rtl">
        
        {/* رأس الصفحة الزجاجي */}
        <div style={glassHeaderStyle} className="p-8 md:p-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 flex items-center gap-3">
              <span className="p-3 bg-[#1a73e8]/10 rounded-2xl text-[#1a73e8]">
                <User size={28} />
              </span>
              الملف الشخصي
            </h1>
            <p className="text-gray-600 font-medium mr-14 text-sm">أهلاً بك، خصص هويتك الرقمية وطريقة استلام أرباحك.</p>
          </div>
          <span className="text-xs font-bold text-[#1a73e8] bg-white/60 px-4 py-2 rounded-full border border-[#c1daff]">
            معرّف المستخدم: {profileData.user}
          </span>
        </div>

        {/* عرض رسائل الخطأ إن وجدت */}
        {message.text && (
          <div className="p-4 mb-6 text-center font-bold text-white bg-red-500 rounded-2xl shadow-lg">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* قسم الاسم والبيو */}
          <div style={cardStyle} className="p-8 md:p-12 relative overflow-hidden">
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 mr-2 flex items-center gap-2">
                  <User size={16} className="text-[#1a73e8]" /> اسم العرض للجمهور *
                </label>
                <input
                  style={inputStyle}
                  value={profileData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  type="text"
                  required
                  placeholder="اكتب اسمك الذي سيظهر للقراء..."
                  className="focus:ring-2 ring-[#1a73e8]/20 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 mr-2 flex items-center gap-2">
                  <FileText size={16} className="text-[#1a73e8]" /> السيرة الذاتية المختصرة (Bio)
                </label>
                <textarea
                  style={inputStyle}
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="4"
                  placeholder="اكتب نبذة عن خبراتك ومجال اهتمامك التقني..."
                  className="resize-none focus:ring-2 ring-[#1a73e8]/20 transition-all"
                ></textarea>
              </div>
            </div>
          </div>

          {/* قسم تفضيلات الدفع */}
          <div style={cardStyle} className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8 text-[#1a73e8]">
              <div className="w-2 h-8 bg-[#1a73e8] rounded-full"></div>
              <h2 className="text-xl font-black text-gray-700">تفضيلات عوائد الأرباح</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 mr-2 flex items-center gap-2">
                  <CreditCard size={16} className="text-[#1a73e8]" /> طريقة الدفع المفضلة
                </label>
                <select
                  value={profileData.payout_method}
                  onChange={(e) => handleInputChange('payout_method', e.target.value)}
                  className="w-full p-5 bg-[#E0E8F5] border-none rounded-2xl outline-none shadow-[inset_6px_6px_12px_#b8bfca,inset_-6px_-6px_12px_#ffffff] font-bold text-gray-600 focus:ring-2 ring-[#1a73e8]/20"
                >
                  <option value="PayPal">PayPal</option>
                  <option value="حساب بنكي">حساب بنكي داخلي</option>
                  <option value="USDT">عملة رقمية (USDT)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-gray-500 mr-2 flex items-center gap-2">
                  <Mail size={16} className="text-[#1a73e8]" /> تفاصيل الحساب / البريد الإلكتروني *
                </label>
                <input
                  style={inputStyle}
                  value={profileData.payout_details}
                  onChange={(e) => handleInputChange('payout_details', e.target.value)}
                  type="text"
                  required
                  placeholder="أدخل بريد الباي بال أو معرّف المحفظة..."
                  className="focus:ring-2 ring-[#1a73e8]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <button 
              type="button" 
              onClick={() => navigate("/dashboardUser")}
              className="flex items-center gap-2 text-gray-500 font-bold hover:text-rose-500 transition-colors cursor-pointer"
            >
              <ArrowRight size={18} /> العودة للوحة التحكم
            </button>

            <button 
              type="submit" 
              className="w-full sm:w-auto px-12 py-4 bg-[#1a73e8] text-white rounded-2xl font-black shadow-xl hover:bg-[#155cb8] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save size={20} />
              <span>حفظ البيانات وتحديث الملف</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ProfileEditor;