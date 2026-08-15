import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. إنشاء السياق (The Context)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();
  // حالة المستخدم: نضع فيها الـ Object الكامل (الاسم، الصورة، الرول)
  const [user, setUser] = useState(null);

  // حالة التحميل: مهمة جداً لمنع الـ Redirect العشوائي عند عمل Refresh
  const [loading, setLoading] = useState(true);

  // 2. ميكانيكا استعادة الجلسة (بمجرد فتح المتصفح)
  useEffect(() => {
    const loadStorageData = () => {
      try {
        const savedUser = localStorage.getItem('elite_user');
        const savedToken = localStorage.getItem('elite_token');

        if (savedUser && savedToken) {
          // تحويل النص المخزن (String) إلى كائن برمجى (Object)
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("خطأ في قراءة الذاكرة:", error);
        localStorage.clear(); // تنظيف في حال وجود بيانات معطوبة
      } finally {
        setLoading(false); // انتهينا من الفحص، يمكننا إظهار الموقع الآن
      }
    };
    loadStorageData();
  }, []);

  // 3. دالة تسجيل الدخول (تستقبل البيانات من صفحة Login)
  const login = (userData, token) => {
    setUser(userData); // حفظ في الذاكرة الحية (State)

    // حفظ في الذاكرة الدائمة (LocalStorage)
    localStorage.setItem('elite_user', JSON.stringify(userData));
    localStorage.setItem('elite_token', token);
  };
  // 4. دالة تسجيل الخروج
  const logout = () => {

  // 1. تنظيف شامل لكل التوكينات والبيانات المخزنة
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("elite_token");
  localStorage.removeItem("elite_user");
  localStorage.removeItem("token sw");

  // أو يمكنك مسح كل شيء دفعة واحدة بحذر عبر:
  // localStorage.clear();

  // 2. تحديث الـ State في React
  setUser(null);

  // 3. التوجيه لصفحة تسجيل الدخول
  navigate("/login");
  
  };

  // القيم التي سيراها أي مكون يستخدم useContext(AuthContext)

  const value = {
    user,
    login,
    logout  ,
    loading,
    isAuthenticated: !!user // تحويل كائن المستخدم إلى قيمة منطقية (True/False)
  };

  return (
    <AuthContext.Provider value={value}>
      {/* إذا كان التطبيق لسه بيفحص البيانات، نظهر لودر فخم */}
      {!loading ? children : (
        <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-emerald-500 font-black text-xs animate-pulse italic">SECURE ACCESS...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};