import React, { useContext, useState, useEffect } from 'react';
import { ShoppingBag, ArrowUpRight, Clock, UserCheck, ExternalLink } from 'lucide-react';
import { AuthContext } from '../../../features/auth/auther';

const RecentSales = () => {
  const { user } = useContext(AuthContext);
  
  // روابط الـ API
  const Url = "http://127.0.0.1:8080/rest/Purchases/";
  const UrlContent = "http://127.0.0.1:8080/rest/Content-articles/";
  const UrlUsers = "http://127.0.0.1:8080/rest/Profile/"; // ✅ تم إضافة المتغير الغائب هنا لإصلاح الانهيار

  const [salesData, SetsalesData] = useState([]);

  // ✅ استخدام useEffect لاستدعاء الدالة بمجرد تحميل الكومبوننت
  useEffect(() => {
    if (user?.id) {
      GetPurchures();
    }
  }, [user?.id]);

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
        (content) => content.user === user?.id
      );
          
      // دمج البيانات
    const sales = Datapurchases
        .filter((purchase) =>
          myContents.some(
            // تصحيح: استخدام content بحرف صغير
            (content) => (content.content_id || content.id) === purchase.content
          )
        )
        .map((purchase) => {
          // بيانات المحتوى (تصحيح: purchase.content)
          const content = myContents.find(
            (item) => (item.content_id || item.id) === purchase.content
          );

          // بيانات المشتري (تصحيح: purchase.payer)
          const buyer = DataUsers.find(
            (item) => (item.profile_id || item.id) === purchase.payer
          );
           console.log("buyer:",buyer)

          return {
            ...purchase,
            title: content?.title || "محتوى غير معروف",
            image: content?.img_path || content?.image, // التوافق مع التسميات لديك
            price: content?.price || 0,
            customer: buyer?.profile?.display_name || buyer?.display_name || "مستخدم غير معروف", // اسم المشتري المدمج
          };
        });

      SetsalesData(sales);
      console.log("salesData  :", salesData, "myContents  : ",myContents,"sales : ",sales,"Datapurchases : ",Datapurchases,"DataUsers :",DataUsers)

    } catch (error) {
      console.error("خطأ في جلب بيانات المبيعات:", error);
    }
  };
  return (
    <div className="bg-white/80 backdrop-blur-xl mx-4 md:mr-36 mb-10 rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] h-[600px] md:h-[550px] flex flex-col transition-all duration-300">
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header القسم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10 px-2 shrink-0" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-[#319795] rounded-full"></div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-[#1A202C]">آخر عمليات الحصاد</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">تتبع مبيعاتك لحظة بلحظة</p>
          </div>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-[#319795] font-black text-xs bg-[#E6FFFA] px-4 py-2.5 rounded-xl hover:bg-[#319795] hover:text-white transition-all duration-300">
          سجل المبيعات <ExternalLink size={14} />
        </button>
      </div>

      {/* قائمة المبيعات */}
      <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pb-4" dir="rtl">
        {salesData.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">لا توجد عمليات مبيعات حالياً.</div>
        ) : (
          salesData.map((sale, index) => (
            <div 
              key={sale.id || index} 
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-50 hover:border-[#319795]/20 hover:shadow-[0_15px_30px_rgba(49,151,149,0.05)] transition-all duration-500 cursor-pointer gap-4"
            >
              {/* الجزء الأيمن: الصورة والعنوان */}
              <div className="flex items-center gap-4 md:gap-5 w-full">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                    <img
                      src={sale.image || "https://via.placeholder.com/150"}
                      alt={sale.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-[#319795] text-white rounded-lg flex items-center justify-center shadow-md border-2 border-white scale-0 group-hover:scale-100 transition-transform">
                    <ShoppingBag size={10} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xs md:text-sm text-[#2D3748] mb-1 group-hover:text-[#319795] transition-colors truncate">{sale.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-gray-400">
                      <Clock size={10} /> {sale.purchased_at || "مؤخراً"}
                    </span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                    <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-[#319795]">
                      <UserCheck size={10} /> {sale.customer} {/* ✅ هنا استبدلنا الـ id باسم المشتري الفعلي */}
                    </span>
                  </div>
                </div>
              </div>

              {/* الجزء الأيسر: الربح والسعر */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 md:gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
                <div>
                  <p className="text-[9px] text-gray-300 font-bold uppercase mb-0.5">المبلغ</p>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 tracking-tighter">{sale.price} SAR</p>
                </div>
                <div className="bg-[#F0FDFA] p-2 md:p-3 rounded-xl md:rounded-2xl border border-[#E6FFFA] text-center min-w-[80px] md:min-w-[100px] group-hover:bg-[#319795] transition-all">
                  <p className="text-[8px] md:text-[9px] text-[#319795] font-black group-hover:text-white/80 uppercase">ربحك</p>
                  <p className="text-sm md:text-lg font-black text-[#319795] group-hover:text-white tracking-tighter">+{sale.price-sale.platform_commission} SAR</p>
                </div>
                <ArrowUpRight size={18} className="text-gray-200 group-hover:text-[#319795] transition-colors hidden sm:block" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* تلميح سفلي */}
      <div className="mt-auto pt-4 shrink-0">
        <div className="p-3 md:p-4 bg-[#F8FAFA] rounded-xl md:rounded-2xl border border-dashed border-gray-200 text-center">
          <p className="text-[9px] md:text-[11px] text-gray-400 font-medium">يتم تحديث هذه القائمة تلقائياً عند كل عملية شراء جديدة.</p>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;