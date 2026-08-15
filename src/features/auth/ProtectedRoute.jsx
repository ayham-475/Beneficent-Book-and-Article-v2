import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./auther";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. إذا كان الكونتكت لا يزال يفحص الذاكرة، انتظر
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  // 2. إذا لم يكن هناك مستخدم مسجل دخول إطلاقاً -> وجّهه للوجن
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. التحقق من أدوار المستخدم (Roles / Permissions)
  // نفترض أن allowedRoles مصفوفة تحتوي الأدوار المسموحة، مثلاً: [true, false] أو أنواع الأدوار
  if (allowedRoles && allowedRoles.length > 0) {
    // يمكنك فحص هل المستخدم staff أو superuser
    const hasPermission = 
      allowedRoles.includes(user.is_staff) || 
      allowedRoles.includes(user.is_superuser);

    if (!hasPermission) {
      // إذا لم يملك الصلاحية، وجهه للوجن أو لصفحة غير مصرح (Unauthorized)
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  // 4. إذا عبر جميع الفحوصات بنجاح، اعرض الصفحة المطلوبة
  return children;
};

export default ProtectedRoute;