import React, { useContext, useEffect, useState } from 'react';
import {
  ArrowRight, Tag, DollarSign, FileText, Image, Globe, FileDown
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../features/auth/auther';
import { ToastContext } from '../../../App/Public/Contexts/ToastContext';

function AddDataContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookdata = location.state?.BookData; // البيانات القادمة من صفحة الإدارة عند التعديل
  const { user } = useContext(AuthContext);
  const { showHideToast } = useContext(ToastContext);

  // 1. تعريف الكيان الأول (المحتوى الأساسي)
  const [ContentData, SetContentData] = useState({
    user: user?.id || null,
    category_id: "",
    title: '',
    description: '',
    content_type: 'BOOK',
    price: 20,
    text_content: "",
    img_path: "",
    language: "ar",
    status: 'PENDING',
  });

  // 2. تعريف الكيان الثاني (تفاصيل الملف الرقمي)
  const [dataBookDetails, SetDataBookDetails] = useState({
    file_url: "",
    pages_count: 320,
  });

  // 3. منطق التعديل (تعبئة الحقول بالبيانات القادمة)
  useEffect(() => {
    if (user?.id) {
      SetContentData(prev => ({ ...prev, user: user.id }));
    }

    if (bookdata) {
      SetContentData({
        user: bookdata.user || user?.id || null,
        category_id: bookdata.category_id || "",
        title: bookdata.title || "",
        content_type: bookdata.content_type || "BOOK",
        description: bookdata.description || "",
        price: bookdata.price || 20,
        img_path: bookdata.img_path || "",
        text_content: bookdata.text_content || "",
        language: bookdata.language || "ar",
        status: bookdata.status || 'DRAFT',
      });

      if (bookdata.file_url) {
        SetDataBookDetails({
          file_url: bookdata.file_url || "",
          pages_count: bookdata.pages_count || 320,
        });
      }
    }
  }, [bookdata, user]);

  // روابط الـ API
  const urlContents = "http://127.0.0.1:8080/rest/Content-articles/";

  // دالة المعالجة وحفظ البيانات
  const handlAddContent = async (e) => {
    if (e) e.preventDefault();

    // استخدام content_id أو id الموجود في الكيان
    const targetId = bookdata?.content_id || bookdata?.id;
    const isEdit = Boolean(targetId);
    const method = isEdit ? "PUT" : "POST";
    const requestUrl = isEdit ? `${urlContents}${targetId}/` : urlContents;

    // تجهيز الـ payload بدقة لتناسب الـ Model
    const payload = {
      user: user?.id || ContentData.user, // رقم ID المستخدم
      category_id: ContentData.category_id || "عملي", // CharField يقبل نص
      title: ContentData.title,
      description: ContentData.description || "",
      content_type: ContentData.content_type || "BOOK", // يطابق ContentType.BOOK
      price: parseFloat(ContentData.price) || 0.00,
      text_content: ContentData.text_content || "",
      img_path: ContentData.img_path || "https://via.placeholder.com/600x400",
      language: ContentData.language || "ar",

      // إرسال إما 'DRAFT' أو 'PUBLISHED' حصراً
      status: (ContentData.status === 'PUBLISHED') ? 'PUBLISHED' : 'DRAFT',
    };

    try {
      const token = localStorage.getItem("token");

      const resContent = await fetch(requestUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Token ${token}` : ""
        },
        body: JSON.stringify(payload)
      });

      if (!resContent.ok) {
        const errorData = await resContent.json();
        console.error("تفاصيل خطأ Django:", errorData);
        alert("خطأ من السيرفر: " + JSON.stringify(errorData));
        return;
      }

      const responseData = await resContent.json();
      console.log("تم الحفظ بنجاح:", responseData);

      showHideToast(isEdit ? "تم تحديث البيانات بنجاح" : "تم حفظ البيانات بنجاح");
      setTimeout(() => navigate('/BookContentHome'), 1500);

    } catch (error) {
      console.error("خطأ شبكة/سيرفر:", error);
      alert("تعذر الاتصال بالسيرفر");
    }
  };
  return (
    <div className="min-h-screen mt-20 bg-[#F0F4F8] pb-20 font-sans">
      <div className="max-w-4xl mx-auto mt-12 px-4" dir="rtl">
        {/* رأس الصفحة */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">
              {bookdata ? "تعديل العمل الإبداعي" : "إضافة عمل إبداعي جديد"}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">املأ التفاصيل أدناه لنشر محتواك في المتجر</p>
          </div>
        </div>

        <form onSubmit={handlAddContent} className="space-y-8">
          {/* البطاقة الأولى: المعلومات الأساسية */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#319795]"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-700">المعلومات الأساسية</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 mr-2">عنوان العمل *</label>
                <input
                  value={ContentData.title}
                  onChange={(e) => SetContentData({ ...ContentData, title: e.target.value })}
                  type="text"
                  placeholder="مثلاً: دليل احتراف React.js"
                  className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-[#319795]/30 focus:bg-white transition-all font-bold text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 mr-2">وصف العمل</label>
                <textarea
                  value={ContentData.description}
                  onChange={(e) => SetContentData({ ...ContentData, description: e.target.value })}
                  rows="4"
                  placeholder="اشرح لجمهورك ما الذي يجعل هذا العمل مميزاً..."
                  className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-[#319795]/30 focus:bg-white transition-all font-medium text-gray-600 shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* البطاقة الثانية: الروابط والملفات الرقمية ولغة العمل */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                <Globe size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-700">الروابط واللغة</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 mr-2">
                  <Image size={16} className="text-gray-400" />
                  <label className="text-sm font-bold">رابط صورة الغلاف *</label>
                </div>
                <input
                  value={ContentData.img_path}
                  onChange={(e) => SetContentData({ ...ContentData, img_path: e.target.value })}
                  type="url"
                  placeholder="https://example.com/cover.jpg"
                  className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-blue-400/30 focus:bg-white transition-all font-bold text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500 mr-2">
                  <FileDown size={16} className="text-gray-400" />
                  <label className="text-sm font-bold">رابط ملف الكتاب (PDF) *</label>
                </div>
                <input
                  value={dataBookDetails.file_url}
                  onChange={(e) => SetDataBookDetails({ ...dataBookDetails, file_url: e.target.value })}
                  type="url"
                  placeholder="https://example.com/book.pdf"
                  className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-blue-400/30 focus:bg-white transition-all font-bold text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-gray-500 mr-2">
                  <Globe size={16} className="text-gray-400" />
                  <label className="text-sm font-bold">لغة الكتاب</label>
                </div>
                <select
                  value={ContentData.language}
                  onChange={(e) => SetContentData({ ...ContentData, language: e.target.value })}
                  className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-blue-400/30 focus:bg-white transition-all font-bold text-gray-600 shadow-sm"
                >
                  <option value="العربية">العربية</option>
                  <option value="الإنجليزية">الإنجليزية</option>
                  <option value="الفرنسية">الفرنسية</option>
                </select>
              </div>
            </div>
          </div>

          {/* البطاقة الثالثة: السعر والنوع */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-gray-200/40 border border-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-2xl text-[#319795]">
                  <DollarSign size={22} />
                </div>
                <h3 className="font-black text-gray-700">التسعير (SAR)</h3>
              </div>
              <input
                value={ContentData.price}
                onChange={(e) => SetContentData({ ...ContentData, price: e.target.value })}
                type="number"
                placeholder="0.00"
                className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-[#319795] transition-all font-black text-2xl text-[#319795]"
              />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg shadow-gray-200/40 border border-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                  <Tag size={22} />
                </div>
                <h3 className="font-black text-gray-700">تصنيف المحتوى</h3>
              </div>
              <select
                value={ContentData.text_content}
                onChange={(e) => SetContentData({ ...ContentData, text_content: e.target.value })}
                className="w-full p-5 bg-[#F8FAFB] border-2 border-transparent rounded-2xl outline-none focus:border-blue-400 transition-all font-bold text-gray-600 shadow-sm"
              >
                <option value="عملي">كتاب عن العلم (PDF)</option>
                <option value="ديني">كتاب عن الدين </option>
                <option value="عن الحياة"> كتاب عن الحياة</option>
                <option value="التكنولوجيا">كتاب عن التكنولوجيا </option>
              </select>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
            <Link to="/dashboardUser" className="order-2 md:order-1 flex items-center gap-2 text-gray-400 font-black hover:text-gray-600 transition-all">
              <ArrowRight size={20} /> إلغاء والعودة
            </Link>

            <div className="flex gap-4 w-full md:w-auto order-1 md:order-2">
              <Link to="/UploadFiles" state={{ currentData: ContentData, bookDetails: dataBookDetails }}>
                <button type="button" className="bg-gray-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-900 shadow-lg">
                  التالي (رفع الملفات)
                </button>
              </Link>

              <button
                type="submit"
                className="bg-[#319795] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#2a8381] shadow-lg"
              >
                {bookdata ? "تحديث البيانات" : "حفظ فقط"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDataContent;