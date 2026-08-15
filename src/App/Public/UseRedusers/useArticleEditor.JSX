import { useReducer, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../Contexts/ToastContext';
// import ArticleRed
import ArticleReducer from './ArticlesReduser';

export function useArticleEditor(dataArticle, user) {
  const navigate = useNavigate();
  const { showHideToast } = useContext(ToastContext);
  const [isFullscreen, setIsFullscreen] = useState(false);

  
  const [articlesData, ArticlesDispatch] = useReducer(ArticleReducer, {
    content_id: Math.floor(Math.random() * 10000), 
    author_id: user?.id,
    category_id: "مقالة تكنلوجيا",
    title: '',
    description: '',
    content_type: 'ARTICLE',
    price: 20,
    img_path: "",
    status: 'DRAFT',
    content: '',
    created_at: new Date().toISOString().split('T')[0]
  });

  const [dataArticleDetails, SetDataArticleDetails] = useState({
    id: Math.floor(Math.random() * 10000),
    content_id: articlesData.content_id,
    body_html: "",
    pages_count: 320,
  });

  useEffect(() => {
    if (dataArticle) {
      ArticlesDispatch({
        type: "SET_ARTICLE_DATA",
        payload: {
          ...dataArticle,
          title: dataArticle.title || "",
          content_type: dataArticle.content_type || "ARTICLE",
          img_path: dataArticle.img_path || "",
          category_id: dataArticle.category_id || "مقالة تكنلوجيا",
          content: dataArticle.content || ""
        }
      });
      SetDataArticleDetails(prev => ({ ...prev, body_html: dataArticle.content || "" }));
    }
  }, [dataArticle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    ArticlesDispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  };

  const updateContent = (htmlContent) => {
    SetDataArticleDetails(prev => ({ ...prev, body_html: htmlContent }));
    ArticlesDispatch({ type: "UPDATE_FIELD", payload: { name: "content", value: htmlContent } });
  };

  const submitArticle = async (currentStatus) => {
    const finalArticleData = { ...articlesData, status: currentStatus };
    const method = dataArticle ? "PUT" : "POST";
    const API_URL = dataArticle ? `http://localhost:3000/contents/${dataArticle.id}` : "http://localhost:3000/contents";

    try {
      const res = await fetch(API_URL, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalArticleData)
      });

      if (res.ok) {
        showHideToast(dataArticle ? "تم التحديث بنجاح" : "تم الحفظ بنجاح");
        
        // إرسال تفاصيل المقال
        await fetch("http://localhost:3000/articles_details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...dataArticleDetails, content_id: articlesData.content_id })
        });

        setTimeout(() => navigate('/ArticlesManager'), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    articlesData,
    isFullscreen,
    setIsFullscreen,
    handleInputChange,
    updateContent,
    submitArticle
  };
}