import React, { useEffect, useState } from 'react';
import {
  User, Mail, Phone, Calendar, ShieldCheck, AlertCircle,
  CheckCircle2, XCircle, RotateCcw, FileText, ExternalLink,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function UserVerificationDashboard() {

  const navigate = useNavigate();
  // حالة وهمية لمراجعة طلب المستخدم
  const [userStatus, setUserStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'needs_action'
  const [adminNote, setAdminNote] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [User, SetUser] = useState({});
  const location = useLocation();
  const ProfileData = location.state.profile;
console.log(" f  ",ProfileData)
  const UpdateUSer = async (newuser) => {
    try {
      const Response = await fetch(`http://127.0.0.1:8080/rest/Users/${ProfileData.user_id}`, {
        method: 'PUT', // اختيار طريقة التحديث الكلي
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // أضف التوكين إن كان المعالج يحتاج مصادقة
        },
        // تحويل الكائن إلى نص JSON خالي من أخطاء الـ Syntax
        body: JSON.stringify(newuser),

      });
      if (!Response.ok) {
        throw new Error('حدث خطأ أثناء تعديل البيانات');
      }
      console.log("a  : ", User)
      const updatedData = await Response.json();
      alert('تم التحديث بنجاح:', updatedData);
      navigate('/dashboard')
    } catch {
    }
  }
  useEffect(() => {
    const GetUser = async () => {
      const user = await fetch("http://127.0.0.1:8080/rest/Users");
      const UserData = await user.json();
      const Finduser = UserData.find((user) => {
        return user.id == ProfileData.user_id;
      })
      
      SetUser(Finduser)
    }
    GetUser()
  }, []);
  const handleStatusChange = (newstate) => {
    const newuser = { ...User };
    newuser.is_active = newstate;
    SetUser(newuser)
    UpdateUSer(newuser)
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 dir-rtl">
      {/* Container الرئيسي */}
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header - شريط العنوان والتنقل */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl text-indigo-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  مراجعة طلب انضمام
                </span>
                <span className="text-xs text-slate-400">#{ProfileData.profile_id}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold mt-1 text-white">
                تدقيق بيانات المستخدم
              </h1>
            </div>
          </div>

          {/* شارة الحالة الحالية */}
          <div className="flex items-center gap-3">
            <StatusBadge status={userStatus} />
          </div>
        </div>

        {/* الشبكة الرئيسية: 12 أعمدة للـ Grid للتجاوب */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* العمود الأيسر (الجانبي): معلومات الملف الشخصي + الإجراءات (4 أعمدة في الشاشات الكبيرة) */}
          <div className="lg:col-span-4 space-y-6">

            {/* بطاقة الشخصية التعريفية */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 p-1 shadow-xl shadow-indigo-500/20">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-300">
                      {ProfileData.display_name.slice(0, 2)}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">{ProfileData.display_name}</h2>
                  <p className="text-sm text-slate-400 mt-0.5">كاتب</p>
                </div>
              </div>

              <hr className="border-slate-800 my-5" />

              {/* بيانات التواصل السريعة */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-2xl border border-slate-800/50">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">{ProfileData.payout_details}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-2xl border border-slate-800/50">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="dir-ltr">779549785</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-2xl border border-slate-800/50">
                  <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>تاريخ الطلب: {ProfileData.created_at}</span>
                </div>
              </div>
            </div>

            {/* لوحة واتخاذ القرار القرارات (Action Control Panel) */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 space-y-4 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                اتخاذ إجراء القرار
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                حدد الإجراء المناسب بناءً على صحة البيانات والمستندات المرفقة للمستخدم.
              </p>

              <div className="space-y-3 pt-2">
                {/* زر القبول */}
                <button
                  onClick={() => handleStatusChange(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 active:scale-[0.98] transition-all duration-200"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  قبول الحساب واعتماده
                </button>

                {/* زر طلب تعديل البيانات */}
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/30 active:scale-[0.98] transition-all duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  إعادة للعميل لتعديل البيانات
                </button>

                {/* زر الرفض النهائى */}
                <button
                  onClick={() => handleStatusChange(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/20 active:scale-[0.98] transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                  رفض الطلب نهائياً
                </button>
              </div>
            </div>

          </div>

          {/* العمود الأيمن (الرئيسي): التفاصيل والوثائق (8 أعمدة) */}
          <div className="lg:col-span-8 space-y-6">

            {/* نبذة عن المستخدم */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-base font-semibold text-white mb-3">نبذة شخصية</h3>
              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/40">
                {ProfileData.bio}
              </p>
            </div>

            {/* تفاصيل البيانات الشخصية والأكاديمية */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 space-y-4 backdrop-blur-md">
              <h3 className="text-base font-semibold text-white">البيانات الأساسية للمراجعة</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataBox label="الاسم الكامل" value={ProfileData.display_name} />
                <DataBox label="نوع الحساب المطلوب" />
                <DataBox label="البريد الإلكتروني" value={ProfileData.payout_details} />
                <DataBox label="رقم الهاتف" value={779549785} />
              </div>
            </div>

            {/* المرفقات والوثائق */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">المستندات والوثائق المرفقة</h3>
                <span className="text-xs text-slate-400"> مستندات</span>
              </div>

              {/* <div className="space-y-3">
                {ProfileData.documents.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800/60 hover:border-indigo-500/40 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{doc.name}</p>
                        <span className="text-xs text-slate-500">{doc.type} • {doc.size}</span>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 transition-all">
                      <span>عرض</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div> */}
            </div>

          </div>

        </div>
      </div>

      {/* النافذة المنبثقة: إرجاع الطلب لتعديل البيانات (Modal) */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                طلب تعديل بيانات المستخدم
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              يرجى توضيح الحقول أو المستندات المطلوب تعديلها من المستخدم لكي يتم إرسال تنبيه له عبر البريد والحساب.
            </p>

            <textarea
              rows={4}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="مثال: يرجى إعادة رفع صورة الهوية بحيث تكون واضحة بدقة عالية، وتأكيد رقم الهاتف..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
            />

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleStatusChange('needs_action')}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-2xl text-sm transition-all"
              >
                إرسال الملاحظات للمستخدم
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-2xl text-sm transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// مكون فرعي لعرض الحقول
function DataBox({ label, value }) {
  return (
    <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/40 space-y-1">
      <span className="text-xs text-slate-500 block">{label}</span>
      <span className="text-sm font-medium text-slate-200 block">{value}</span>
    </div>
  );
}

// مكون فرعي لعرض شارات الحالة المختلفة
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-blue-500/10 text-blue-400 border-blue-500/20 icon-blue",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    needs_action: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const labels = {
    pending: "قيد المراجعة والتدقيق",
    approved: "تم القبول والاعتماد",
    rejected: "تم رفض الطلب",
    needs_action: "بانتظار تعديل البيانات",
  };

  const icons = {
    pending: <AlertCircle className="w-4 h-4" />,
    approved: <CheckCircle2 className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
    needs_action: <RotateCcw className="w-4 h-4" />,
  };

  return (
    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {icons[status]}
      <span>{labels[status]}</span>
    </div>
  );
}