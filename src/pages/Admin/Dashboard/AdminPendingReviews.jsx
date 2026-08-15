import React, { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ContentPreview from './ContentPreview';
import DecisionPanel from "./DecisionPanel";

const AdminPendingReviews = () => {
  const [ContentPreviewData, setContentPreviewData] = useState({});



  const [User, SetUser] = useState({});
  // جلب المستخدم تلقائياً كلما تغيرت بيانات المقال المختار
  useEffect(() => {
    const GetUser = async () => {
      // 1. تأكد أولاً من وجود بيانات المقال ومُعرّف الكاتب
      // (استبدل ContentPreviewData.author بالحقل الصحيح لكاتب المقال لديك مثل user أو author)
      const authorId = ContentPreviewData.author || ContentPreviewData.user;

      if (!authorId) return;

      try {
        const userdata = await fetch("http://127.0.0.1:8080/rest/Users/");
        const users = await userdata.json();

        // البحث عن المستخدم باستخدام id الكاتب
        const UserContent = users.find((u) => u.id == authorId);

        if (UserContent) {
          SetUser(UserContent);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المستخدم:", error);
      }
    };

    GetUser();
  }, [ContentPreviewData]); // تموضع ContentPreviewData كـ dependency تضمن التنفيذ فور اختيار مقال جديد

  // },[])
  console.log("User ", User, "ContentPreviewData :", ContentPreviewData)
  function ChangeContentPreviewData(data) {
    setContentPreviewData(data);
    // السكرول لأعلى عند اختيار مقال جديد
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-200" dir="rtl">

      {/* padding-right يتغير حسب السايدبار، و padding-left يتغير للموبايل */}
      <main className="pr-0 md:pr-[110px] px-4 md:pl-10 py-6 md:py-10 transition-all duration-500">

        {/* عنوان الصفحة - متجاوب */}
        <div className="mb-8 px-2 md:px-0">
          <h1 className="text-2xl md:text-3xl font-black text-white">مراجعة المحتوى</h1>
          <p className="text-gray-500 text-[10px] md:text-xs mt-1 uppercase font-bold tracking-widest">Pending Approval Queue</p>
        </div>

        {/* الحاوية الرئيسية: عمودية في الموبايل، أفقية في الشاشات الكبيرة */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 md:gap-10 items-start">

          {/* منطقة العرض: flex-1 تجعلها تأخذ المساحة الكبرى */}

          {/* القائمة الجانبية: في الموبايل تأخذ عرض كامل، في الكبير عرض ثابت ومتحرك مع السكرول */}

          <div className="w-full lg:flex-1 space-y-6 md:space-y-10">
            <ContentPreview ContentPreviewData={ContentPreviewData} user={User} />
            <DecisionPanel ContentPreviewData={ContentPreviewData} />

          </div>
          <aside className="w-full lg:w-[380px] xl:w-[420px] lg:sticky lg:top-10 shrink-0 z-30">
            <ReviewList ChangeContentPreviewData={ChangeContentPreviewData} />
          </aside>

        </div>
      </main>

    </div>
  );
};

export default AdminPendingReviews;