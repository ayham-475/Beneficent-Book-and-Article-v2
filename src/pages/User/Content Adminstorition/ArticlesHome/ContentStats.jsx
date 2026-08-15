import React from 'react';
import { motion } from 'framer-motion';
import { Eye, DollarSign, BookOpen, Star } from 'lucide-react';

const ContentStats = () => {
  const stats = [
    { label: 'إجمالي المبيعات', value: '12,450 SAR', icon: <DollarSign />, color: 'bg-emerald-500' },
    { label: 'قراءات الكتب', value: '1,200', icon: <BookOpen />, color: 'bg-blue-500' },
    { label: 'مشاهدات المقالات', value: '45.2K', icon: <Eye />, color: 'bg-purple-500' },
    { label: 'متوسط التقييم', value: '4.9', icon: <Star />, color: 'bg-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer group"
        >
          <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-xl font-black text-gray-800">{stat.value}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentStats;