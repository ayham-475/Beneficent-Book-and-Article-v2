import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Wallet, Plus, Zap } from 'lucide-react';
import { AuthContext } from '../../../features/auth/auther';

const MainBalance = () => {
  const { user } = useContext(AuthContext);

  // روابط الـ API
  const Url = "http://localhost:3000/purchases";
  const UrlContent = "http://localhost:3000/contents";
  const UrlUsers = "http://localhost:3000/users"; 

  const [salesData, SetsalesData] = useState([]);
  const [mainbalance, setmainbalance] = useState(0);

  // ✅ جلب البيانات عند تحميل الكومبوننت والتأكد من وجود الـ user.id
  useEffect(() => {
    if (user?.id) {
      GetPurchures();
    }
  }, [user?.id]);

  // ✅ مراقبة salesData وحساب الرصيد فور تحديثها تلقائياً
  useEffect(() => {
    if (salesData.length > 0) {
      const count = salesData.reduce((total, sale) => {
        // تأكد من طرح عمولة المنصة بشكل صحيح (إذا لم تكن موجودة تفترض صفر)
        const commission = sale.platform_commission ? Number(sale.platform_commission) : 0;
        return total + (Number(sale.price) - commission);
      }, 0);
      
      setmainbalance(count);
    }
  }, [salesData]); // تعاد الحسبة فوراً عندما تتغير الـ salesData

  const GetPurchures = async () => {
    try {
      const purchasesResponse = await fetch(Url);
      const contentsResponse = await fetch(UrlContent);
      const usersResponse = await fetch(UrlUsers);

      const Datapurchases = await purchasesResponse.json();
      const DataContent = await contentsResponse.json();
      const DataUsers = await usersResponse.json();

      // المحتويات الخاصة بالمؤلف الحالي
      const myContents = DataContent.filter(
        (content) => content.author_id === user?.id
      );

      // دمج البيانات
      const sales = Datapurchases
        .filter((purchase) =>
          myContents.some(
            (content) => content.content_id == purchase.content_id
          )
        )
        .map((purchase) => {
          const content = myContents.find(
            (item) => item.content_id == purchase.content_id
          );

          const buyer = DataUsers.find(
            (item) => item.id === purchase.payer_id
          );

          return {
            ...purchase,
            title: content?.title || "محتوى غير معروف",
            image: content?.img_path || content?.image, 
            price: content?.price || 0,
            customer: buyer?.profile?.name || buyer?.name || "مستخدم غير معروف", 
          };
        });

      SetsalesData(sales);
      
    } catch (error) {
      console.error("خطأ في جلب بيانات المبيعات:", error);
    }
  };

  return (
    <div className="grid mt-20 mr-20 grid-cols-1 lg:grid-cols-3 gap-6" dir="rtl">
      {/* البطاقة الكبيرة - الرصيد */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 relative overflow-hidden bg-[#0a0a0a] rounded-[3rem] p-10 border border-white/5 shadow-2xl"
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-500 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap size={14} fill="currentColor" /> إجمالي المحفظة المالية
              </p>
              <h2 className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                ${mainbalance}<span className="text-2xl text-gray-600">.00</span>
              </h2>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20">
              <Wallet className="text-emerald-500" size={32} />
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <button className="flex-1 px-8 py-5 bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              <ArrowUpRight size={20} /> سحب الأرباح للبنك
            </button>
            <button className="flex-1 px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2">
              <Plus size={20} /> تحويل رصيد
            </button>
          </div>
        </div>

        {/* تأثير التوهج الخلفي */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </motion.div>

      {/* بطاقة إحصائية سريعة - الأرباح الشهرية */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-xl flex flex-col justify-between"
      >
        <div className="space-y-4">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">أرباح الشهر الحالي</span>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-black text-gray-800">$12,400</h3>
            <span className="text-emerald-500 font-bold text-sm mb-1">+24%</span>
          </div>
          {/* رسم بياني مصغر تفاعلي */}
          <div className="h-20 w-full flex items-end gap-1 px-2">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="flex-1 bg-emerald-500/20 rounded-t-lg hover:bg-emerald-500 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div className="pt-6 border-t border-gray-50">
          <p className="text-xs text-gray-400 font-bold leading-relaxed">أنت تحقق أداءً أفضل من الشهر الماضي بـ <span className="text-gray-800">3,200$</span></p>
        </div>
      </motion.div>
    </div>
  );
};

export default MainBalance;