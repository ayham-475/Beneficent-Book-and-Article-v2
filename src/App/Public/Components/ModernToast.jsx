import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, AlertTriangle, Info, X } from 'lucide-react';

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200',
    iconColor: 'text-emerald-400',
    barColor: 'bg-emerald-500',
    defaultTitle: 'تمت العملية بنجاح'
  },
  error: {
    icon: AlertOctagon,
    bg: 'bg-rose-950/90 border-rose-500/40 text-rose-200',
    iconColor: 'text-rose-400',
    barColor: 'bg-rose-500',
    defaultTitle: 'حدث خطأ'
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-950/90 border-amber-500/40 text-amber-200',
    iconColor: 'text-amber-400',
    barColor: 'bg-amber-500',
    defaultTitle: 'تنبيه'
  },
  info: {
    icon: Info,
    bg: 'bg-blue-950/90 border-blue-500/40 text-blue-200',
    iconColor: 'text-blue-400',
    barColor: 'bg-blue-500',
    defaultTitle: 'معلومة'
  }
};

export default function ModernToast({ toasts = [], onDismiss }) {
  return (
    <div
      dir="rtl"
      className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3 max-w-sm w-[90vw] sm:w-96 pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const cfg = toastConfig[t.type] || toastConfig.info;
          const Icon = cfg.icon;

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl p-4 pointer-events-auto flex items-start gap-3 ${cfg.bg}`}
            >
              {/* أيقونة الحالة */}
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 shadow-inner">
                  <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                </div>
              </div>

              {/* نص التنبيه */}
              <div className="flex-1 min-w-0 pr-1">
                <h4 className="font-bold text-sm tracking-tight text-white">
                  {t.title || cfg.defaultTitle}
                </h4>
                <p className="text-xs mt-1 text-white/80 leading-relaxed break-words">
                  {t.message}
                </p>
              </div>

              {/* زر الإغلاق */}
              <button
                onClick={() => onDismiss(t.id)}
                className="flex-shrink-0 text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>

              {/* شريط التقدم الزمني */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: (t.duration || 4000) / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 right-0 h-1 ${cfg.barColor}`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
