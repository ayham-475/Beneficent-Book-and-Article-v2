import React, { useState, useContext } from 'react';
import { Mail, Lock, User, Eye, EyeOff, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './auther';
import { useToast } from '../../App/Public/Contexts/ToastContext';
import { api } from '../../services/apiClient';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { toast } = useToast();

  // States للبيانات
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // 1. تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'جاري التحقق من البيانات...', type: 'info' });

    try {
      const data = await api.post('/auth/login/', { email, password });

      const userToken = data.token || data.access;
      const user = data.user || {};

      // حفظ موحد في الذاكرة
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', userToken);
      localStorage.setItem('elite_user', JSON.stringify(user));
      localStorage.setItem('elite_token', userToken);

      toast.success(`مرحباً بك مجدداً يا ${user.first_name || user.name || 'صديقنا'}!`, 'تم تسجيل الدخول');
      setMessage({ text: 'تم التحقق بنجاح! جاري توجيهك...', type: 'success' });

      if (typeof login === 'function') {
        login(user, userToken);
      }

      setTimeout(() => {
        if (user.is_superuser === true || user.type === 'Admin' || user.role === 'Admin') {
          navigate('/dashboard');
        } else {
          navigate('/dashboardUser');
        }
      }, 1000);
    } catch (error) {
      console.error('Login Error:', error);
      const errMsg = error.message || 'الإيميل أو كلمة المرور غير صحيحة.';
      setMessage({ text: errMsg, type: 'error' });
      toast.error(errMsg, 'فشل تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. إنشاء حساب جديد
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const msg = 'كلمتا المرور غير متطابقتين!';
      setMessage({ text: msg, type: 'error' });
      toast.warning(msg, 'تنبيه في البيانات');
      return;
    }

    if (password.length < 6) {
      const msg = 'يجب أن تتكون كلمة المرور من 6 أحرف أو أرقام على الأقل';
      setMessage({ text: msg, type: 'error' });
      toast.warning(msg, 'كلمة المرور قصيرة');
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'جاري إنشاء حسابك وضبط الإعدادات...', type: 'info' });

    try {
      const data = await api.post('/auth/register/', {
        name,
        email,
        password,
      });

      const user = data.user || {};
      const token = data.token || '';

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('elite_user', JSON.stringify(user));
      localStorage.setItem('elite_token', token);

      toast.success('تم إنشاء حسابك الجديد بنجاح! نتمنى لك تجربة ممتعة', 'أهلاً بك!');
      setMessage({ text: 'تم إنشاء الحساب بنجاح! جاري التوجيه...', type: 'success' });

      if (typeof login === 'function') {
        login(user, token);
      }

      setTimeout(() => {
        if (user.id) {
          navigate(`/profile/${user.id}`);
        } else {
          navigate('/dashboardUser');
        }
      }, 1500);
    } catch (error) {
      console.error('Register Error:', error);
      const errMsg = error.message || 'حدث خطأ أثناء إنشاء الحساب. تأكد من صحة البريد الإلكتروني.';
      setMessage({ text: errMsg, type: 'error' });
      toast.error(errMsg, 'فشل إنشاء الحساب');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#E2E8F0] font-sans flex items-center justify-center p-4 sm:p-6 relative overflow-hidden" dir="rtl">
      {/* خلفية ضوئية جمالية */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* زر العودة للرئيسية */}
      <Link
        to="/"
        className="absolute top-6 right-6 z-20 flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-full transition-all"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>العودة للرئيسية</span>
      </Link>

      <div className="relative w-full max-w-md bg-[#1e293b]/90 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-white/10 shadow-2xl p-6 sm:p-10 my-8">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl items-center justify-center mb-5 shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/20 hover:scale-105 transition-transform">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-medium">
            {isLogin ? 'مرحباً بك في منصة المعرفة والنشر' : 'ابدأ رحلتك المعرفية ونشر مؤلفاتك معنا'}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">

          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 mr-2">الاسم الكامل / اسم الكاتب</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="أدخل اسمك الكريم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 bg-[#0f172a]/70 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm text-white"
                  required
                />
                <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 mr-2">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-11 pl-4 py-3 bg-[#0f172a]/70 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm text-white"
                required
              />
              <Mail size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 mr-2">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-11 pl-11 py-3 bg-[#0f172a]/70 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm text-white"
                required
              />
              <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors p-1"
                aria-label="إظهار كلمة المرور"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 mr-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="أعد كتابة كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-11 pl-4 py-3 bg-[#0f172a]/70 border border-white/10 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm text-white"
                  required
                />
                <Lock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-black text-base shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>جاري المعالجة...</span>
              </>
            ) : (
              <span>{isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm font-medium">
            {isLogin ? 'لا تملك حساباً بعد؟' : 'لديك حساب بالفعل؟'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage({ text: '', type: '' });
              }}
              className="mr-2 text-blue-400 hover:text-blue-300 font-bold border-b border-blue-400/30 pb-0.5 cursor-pointer transition-colors"
            >
              {isLogin ? 'سجل الآن مجاناً' : 'سجل دخولك'}
            </button>
          </p>
        </div>

        {message.text && (
          <div
            className={`mt-4 p-3.5 rounded-2xl text-center text-xs font-bold transition-all ${
              message.type === 'error'
                ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                : message.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
