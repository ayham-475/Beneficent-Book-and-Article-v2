import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, AlertTriangle, X, Heart, ShieldAlert } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* 1. الخلفية الضبابية (Overlay) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
        />

        {/* 2. نافذة المودال (Modal Card) */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl shadow-black/20 overflow-hidden border border-white"
          dir="rtl"
        >
          {/* لمسة فنية في الخلفية */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-l from-[#319795] to-rose-500"></div>

          <div className="p-8 md:p-12 text-center">
            
            {/* أيقونة التحذير بتصميم دائري */}
            <div className="relative mx-auto w-24 h-24 mb-8">
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-rose-50 rounded-full"
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center text-rose-500 bg-white rounded-full shadow-xl border border-rose-50">
                    <LogOut size={40} />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                    <ShieldAlert size={16} />
                </div>
            </div>

            {/* نصوص المودال */}
            <h3 className="text-2xl font-black text-gray-800 mb-4 tracking-tighter">
                هل تود الرحيل حقاً؟
            </h3>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10 px-4">
                تأكد من حفظ جميع تغييراتك قبل المغادرة. نحن دائماً بانتظار عودتك لمواصلة إبداعك في إمبراطورية الكتب.
            </p>

            {/* أزرار التحكم */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={onConfirm}
                className="w-full py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-[2rem] font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-rose-200 active:scale-95"
              >
                تأكيد تسجيل الخروج
              </button>
              
              <button 
                onClick={onClose}
                className="w-full py-5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-[2rem] font-black text-sm transition-all active:scale-95"
              >
                إلغاء، سأبقى قليلاً <Heart size={16} className="inline mr-1 text-rose-400" />
              </button>
            </div>
          </div>

          {/* زر الإغلاق العلوي */}
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 text-gray-300 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutModal;