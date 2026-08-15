import TransactionHistory from './TransactionHistory'
import MainBalance from './MainBalance';
import ProfitRadar from './ProfitRadar';
import { TrendingUp, Book, FileText, Share2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';


import { AuthContext } from '../../../features/auth/auther';


export default function FinancialHome(){


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
    return(
  <>
  {/* حاوية شبكية: تملأ الشاشة بالكامل (w-full)، وتتقسم لـ 3 أعمدة متساوية في الشاشات الكبيرة */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
    <div className="w-full">
      <ProfitRadar label="مبيعات الكتب" value={mainbalance} percent={70} icon={Book} color="bg-teal-500" />
    </div>
    <div className="w-full">
      <ProfitRadar label="اشتراكات المقالات " value={mainbalance} percent={45} icon={FileText} color="bg-blue-500" />
    </div>
    <div className="w-full">
      <ProfitRadar label="عمولات الإحالة" value={mainbalance} percent={30} icon={Share2} color="bg-purple-500" />
    </div>
  </div>

  {/* باقي مكونات لوحة التحكم */}
  <MainBalance />
  <TransactionHistory />
</>
    );  
    
}