import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, BookOpen, Users, ShieldCheck, Zap } from 'lucide-react';
import { ContentDataContext } from '../../pages/User/Content Adminstorition/ArticlesHome/ArticlesContext';
import Hedder from '../../App/Public/Layout/Hedder';
import { AuthContext } from '../auth/auther';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../App/Public/Contexts/ToastContext';
const BookDetails = () => {

  const { ContentData } = useContext(ContentDataContext);

  const [Books, SetBooks] = useState([])
  const [Profiles, SetProfiles] = useState([])
  const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";
  const urlProfile = "http://127.0.0.1:8080/rest/Profile/";
 
  // 
  useEffect(() => {
    const GetContentId = async () => {
      try {
        const Contents = await fetch(urlContents)
        const ProfilesData = await fetch(urlProfile)
        const ContentsJson = await Contents.json()
        const ProfilesJson = await ProfilesData.json()
        SetBooks(ContentsJson)
        SetProfiles(ProfilesJson)
        console.log("dea", ContentsJson)
      } catch (error) {
        console.log(" error   : ", error)
      }


    }
    GetContentId()
  

  }, [])

  // 1. سحب بيانات الكتب من الـ Context
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [Purchase, setPurchase] = useState({
    content: 101,
    payer: "",
    author_amount: 24,
    platform_commission: "",
    price: 10,
    payment_status: "COMPLETED",
    payment_method: "الكريمي",
    transaction_reference: "TXN-992811",
   
  });

  const { showHideToast } = useContext(ToastContext);

  // 2. استخراج معرف الكتاب (bookId) من رابط الصفحة الحالي
  const { bookId } = useParams();
  const allContent = Array.isArray(ContentData)
    ? ContentData
    : (ContentData?.contents || []);

  // 2. التصفية الصارمة: جلب العناصر التي نوعها مقالة فقط (BOOKS)
  //  const booksArray = allContent.filter(item => item.content_type === "BOOK");

  // 3. البحث عن الكتاب المطابق باستخدام الـ id الفعلي
  const book = Books.find((b) => String(b.content_id) === String(bookId));

  // 4. حزام أمان لمنع الانهيار
  if (!book) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
        <p className="animate-pulse text-cyan-400 font-bold text-sm">جاري جلب تفاصيل الكتاب الحصري...</p>
      </div>
    );
  }

   const getUserProfile=Profiles.find((profile)=>{
    return profile.user==user.id;
  })
// حساب عمولة المنصة وصافي ربح الكاتب ديناميكياً بناءً على سعر الكتاب الحالي
  const platform_commission = Number((book.price * 0.2).toFixed(2)); // عمولة المنصة 20% كمثال
  const author_amount = Number((book.price - platform_commission).toFixed(2)); // الصافي للكاتب

  const API_URL = "http://127.0.0.1:8080/rest/Purchases/";

  // دمج عملية الإرسال وتمرير البيانات مباشرة
  const handleRegisterPurchase = async (pData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pData)
      });

      if (res.ok) {
        alert("هل انت متاكد انك تريد شراء هذا الكتاب");
        showHideToast("  تم شراء الكتاب بنجاح   شكرا")
        navigate("/homeBook");
      } else {
        alert("فشل في تسجيل عملية الشراء بالخادم");
      }
    } catch (error) {
      console.error("خطأ في الاتصال بالسيرفر:", error);
    }
  };

  function addPurchase() {
    if (!user) {
      alert("يرجى تسجيل الدخول أولاً لإتمام عملية الشراء");
      return;
    }

    // بناء كائن المشتريات المالي الاحترافي والمطابق لجدول الـ JSON تماماً
    const NewPurchas = {
      content:bookId || book.id,
      payer: getUserProfile.profile_id,
      author_amount: author_amount,
      platform_commission: platform_commission,
      price: book.price,
      payment_status: "COMPLETED",
      payment_method: "الكريمي",
      transaction_reference: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    // تحديث الـ State للواجهة 
    setPurchase(NewPurchas);

    // تمرير الكائن الفوري للدالة مباشرة دون انتظار الـ State المتأخر برمجياً
    handleRegisterPurchase(NewPurchas);
  }

  console.log("profile  : ",Profiles,"Purchase  : ",Purchase,"getUserProfile : ",getUserProfile)
  return (
    <>
      <Hedder />
      <div className="min-h-screen bg-[#050816] text-white font-sans p-4 md:p-12" dir="rtl">

        {/* Container الرئيسي بتصميم Glassmorphism */}
        <div style={{ marginTop: "60px" }} className="max-w-6xl mx-auto bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">

          {/* شريط الإغلاق الجمالي في الأعلى */}
          <div className="absolute top-10 left-8 flex gap-2 z-20">
            <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* الجانب الأيمن: غلاف الكتاب والإضاءة النيون */}
            <div className="relative p-12 flex items-center justify-center bg-gradient-to-br from-blue-600/5 to-transparent">
              <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>

              <motion.div
                initial={{ rotateY: 20, perspective: 1000 }}
                whileHover={{ rotateY: 0 }}
                className="relative z-10 mt-10 lg:mt-20"
              >
                <img
                  src={book.img_path}
                  className="w  -80 h-[450px] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
                  alt={book.title}
                />
                <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-black font-black px-4 py-2 rounded-lg text-sm shadow-xl">
                  ${book.price}
                </div>
              </motion.div>
            </div>

            {/* الجانب الأيسر: المحتوى الكتابي */}
            <div className="p-12 lg:border-r border-white/5 flex flex-col justify-center">
              <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase mb-2 block">تفاصيل الكتاب الحصري</span>
              <h2 className="text-3xl md:text-4xl font-black mb-2 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                {book.title}
              </h2>
              <h3 className="text-xl font-bold text-gray-400 mb-6">
                للكاتب: {book.nameWriter}
              </h3>

              {/* إحصائيات سريعة */}
              <div className="flex gap-8 py-6 border-y border-white/5 mb-8 justify-start">
                <div className="text-center min-w-[60px]">
                  <Users className="mx-auto text-gray-500 mb-2" size={20} />
                  <span className="block text-[10px] text-gray-400 uppercase">الجمهور</span>
                  <span className="font-bold text-sm">+{book.reviews * 3}K</span>
                </div>
                <div className="text-center min-w-[60px]">
                  <Star className="mx-auto text-yellow-500 mb-2" size={20} fill="currentColor" />
                  <span className="block text-[10px] text-gray-400 uppercase">التقييم</span>
                  <span className="font-bold text-sm">{book.rate}</span>
                </div>
                <div className="text-center min-w-[60px]">
                  <BookOpen className="mx-auto text-blue-400 mb-2" size={20} />
                  <span className="block text-[10px] text-gray-400 uppercase">المراجعات</span>
                  <span className="font-bold text-sm">{book.reviews}</span>
                </div>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                  <ShieldCheck className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-sm">ضمان المحتوى</h4>
                  <p className="text-[10px] text-gray-500 mt-1">تحديثات مدى الحياة للنسخة</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                  <Zap className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-sm">قراءة فورية</h4>
                  <p className="text-[10px] text-gray-500 mt-1">متاح بجميع الصيغ الرقمية</p>
                </div>
              </div>

              {/* زر الشراء الفوري المحسن */}
              <button
                onClick={addPurchase}
                className="w-full bg-[#0FD3C4] text-black font-black py-5 rounded-2xl text-xl hover:shadow-[0_0_30px_rgba(15,211,196,0.4)] transition-all active:scale-95 shadow-lg"
              >
                شراء وتحميل الكتاب فوراً (PDF)
              </button>

              <p className="text-center mt-4 text-gray-500 text-xs">
                دفع آمن 100% عبر جميع الوسائل المتاحة
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;