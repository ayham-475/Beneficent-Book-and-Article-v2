
import { useContext ,user} from 'react';
import { useLocation, Link,useNavigate} from 'react-router-dom';
import { ToastContext } from '../Contexts/ToastContext';
import { AuthContext } from '../../../features/auth/auther';

export const ArticlesReducer = (currentStates, {type,payload}) => {

  const { user } = useContext(AuthContext);
  const location = useLocation();
//   const navigate = useNavigate();
  const { showHideToast } = useContext(ToastContext);
  const dataArticle = location.state?.currentState;
     const API_URL = `${import.meta.env.VITE_API_URL}/rest/Content-articles/`;

    switch (type) {
        case "POST": {
            console.log("current : ",currentStates,"action : ",payload)
            const saveArticle = async (targetStatus) => {
                const isEditing = Boolean(dataArticle?.content_id || dataArticle?.id);
                const method = isEditing ? "PUT" : "POST";
                const targetId = dataArticle?.content_id || dataArticle?.id;
                const url = isEditing ? `${API_URL}${targetId}/` : API_URL;
                // ✅ تجهيز الـ payload بشكل سليم مع إضافة الـ user والمحتوى النصي
                const payloads = {
                    user: user?.id, // 👈 تم التثبيت هنا لمنع خطأ null value in column user_id
                    title: payload.title,
                    description: payload.description,
                    category_id: payload.category_id,
                    content_type: payload.content_type || 'ARTICLE',
                    price: payload.price || 0,
                    img_path: payload.img_path || '',
                    language: payload.language || 'ar',
                    status: payload.status,
                    text_content: ""
                };
             console.log("pyload  : ",payload)
                try {
                    const token = localStorage.getItem("token");
                    const res = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${token}`
                        },
                        body: JSON.stringify(payloads)
                    });

                    if (res.ok) {
                        const resData = await res.json();
                        const savedContentId = resData.id || targetId;

                        // if (savedContentId) {
                        //     await addArticleDetails(savedContentId);
                        // }

                        const successMessage = isEditing ? "تم تعديل المقال بنجاح ✨" : "تم نشر المقال بنجاح ✨";
                        showHideToast(successMessage);

                        // setTimeout(() => navigate('/ArticlesManager'), 1200);
                    } else {
                        const errorData = await res.json();
                        // 💡 يطبع تفاصيل أخطاء الـ Serializer بدقة لمعرفتها فوراً
                        console.error("تفاصيل خطأ السيرفر:", errorData);
                        alert(JSON.stringify(errorData) || "حدث خطأ أثناء حفظ المقال.");
                    }
                } catch (error) {
                    console.error("خطأ الاتصال بالسيرفر:", error);
                    alert("تعذر الاتصال بالسيرفر. يرجى التحقق من الخادم.");
                }
                // console.log("articleDetails  :",articleDetails)
            };
           saveArticle("")
     
        }
        case "PUT": {
            console.log("added successful")

        }
        case "DELETE": {
             const handlDelete = async () => {
                 const confirmDelete = window.confirm("هل أنت تأكد من حذف هذه المقالة ؟");
                 if (!confirmDelete) return; // ✅ الإلغاء إذا لم يوافق المستخدم
             
                 try {
                   const token = localStorage.getItem("token");
                   const res = await fetch(`${API_URL}${payload}`, { // ✅ إضافة الـ ID إلى الرابط
                     method: "DELETE",
                     headers: {
                       "Authorization": `Token ${token}`
                     }
                   });
             
                   if (res.ok) {
                     // تحديث الواجهة وحذف المقال من الـ State
                    //  setArticles(prev => prev.filter(item => (item.content_id || item.id) !== id));
                            showHideToast("تم حذف المقال بنجاح ✨");
                   } 
                 } catch (error) {
                   alert("حدث خطأ في الاتصال: " + error.message);
                 }
               };
               handlDelete()
        }
        default: {

        }
    }
    return []
}