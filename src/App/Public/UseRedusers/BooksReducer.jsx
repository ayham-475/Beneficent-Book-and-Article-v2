import { useContext, useNavigate } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../features/auth/auther';
import { ToastContext } from '../Contexts/ToastContext';

// 1. حولنا الدالة إلى Hook (تبدأ بكلمة use) لكي تسمح لنا باستخدام useContext بداخلها
export const useBooksActions = () => {
    // 2. الآن يمكننا استخدام الأدوات هنا بدون أي مشاكل
    // const location = useLocation();
    // const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { showHideToast } = useContext(ToastContext);

    const urlContents = `${import.meta.env.VITE_API_URL}/rest/Content-articles/`;

    // 3. هذه هي الدالة التي ستستقبل النوع (type) والبيانات (payload) من صفحة العرض
    const executeAction = async ({ type, payload }) => {
        switch (type) {
            case "POST": {
                // تجهيز البيانات
                const payloads = {
                    user: user?.id || payload.user,
                    category_id: payload.category_id || "عملي",
                    title: payload.title,
                    description: payload.description || "",
                    content_type: payload.content_type || "BOOK",
                    price: parseFloat(payload.price) || 0.00,
                    text_content: payload.text_content || "",
                    img_path: payload.img_path || "https://via.placeholder.com/600x400",
                    language: payload.language || "ar",
                    status: (payload.status === 'PUBLISHED') ? 'PUBLISHED' : 'DRAFT',
                };

                try {
                    const token = localStorage.getItem("token");

                    const resContent = await fetch(urlContents, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token ? `Token ${token}` : ""
                        },
                        body: JSON.stringify(payloads)
                    });

                    if (!resContent.ok) {
                        const errorData = await resContent.json();
                        console.error("تفاصيل خطأ Django:", errorData);
                        alert("خطأ من السيرفر: " + JSON.stringify(errorData));
                        return;
                    }

                    const responseData = await resContent.json();
                    console.log("تم الحفظ بنجاح:", responseData);
                    showHideToast("تم حفظ البيانات بنجاح");

                    // setTimeout(() => navigate('/BookContentHome'), 1500);

                } catch (error) {
                    console.error("خطأ شبكة/سيرفر:", error);
                    alert("تعذر الاتصال بالسيرفر");
                }
                break; // مهم جداً وضع break في نهاية كل حالة
            }
            case "PUT": {
                // منطق التعديل يوضع هنا
                break;
            }
            case "DELETE": {
                const confirmDelete = window.confirm(id + "هل أنت متأكد من حذف هذا الكتاب ؟");
                if (!confirmDelete)
                    return;
                try {
                    const contentData = await fetch(`${urlContents}${id}`, {
                        method: "DELETE",
                    });
                    if (contentData.ok) {
                        SetBook(Books.filter(item => item.content_id != id))
                        setMessage({
                            text: dataArticle ? "تم حذف الكتاب بنجاح!" : "تم إنشاء الكتاب بنجاح!",

                            type: "success"
                        });
                    }
                } catch (error) {
                    // setMessage({ text: "حدث خطأ أثناء الاتصال بالسيرفر.", type: "error" });
                }
            
                // منطق الحذف يوضع هنا
                break;
        }
            default: {
    console.log("نوع العملية غير معروف");
}
        }
    };

// 4. نرجع الدالة لكي نستخدمها في ملف العرض
return { executeAction };
};