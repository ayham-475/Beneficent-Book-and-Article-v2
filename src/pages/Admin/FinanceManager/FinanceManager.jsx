

import Sidebar from "../Dashboard/Sidebar";
import { FinancialSummaryCards } from "./FinancialSummaryCards";
import {RevenueAnalyticsChart} from './RevenueAnalyticsChart'
import { WithdrawalRequests } from "./WithdrawalRequests";
import { TransactionHistory } from "./TransactionHistory";
const FinanceManager = () => {
  return (
    <div className="h-screen bg-[#080809] flex overflow-hidden font-sans text-white" dir="rtl">
      <Sidebar />
      <main className="flex-1 md:pr-[110px] p-6 md:p-12 overflow-y-auto no-scrollbar scroll-smooth">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-2">الإدارة المالية</h1>
          <p className="text-gray-500 tracking-widest text-xs uppercase">مركز التحكم في السيولة والأرباح</p>
        </header>

        {/* المكونات مقسمة بشكل احترافي */}
        <FinancialSummaryCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <RevenueAnalyticsChart />
              <WithdrawalRequests />
           </div>
           <div className="lg:col-span-1">
              <TransactionHistory />
              {/* مكون إضافي: ملخص النفقات التشغيلية */}
              <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 rounded-[2rem]">
                <h4 className="text-sm font-black mb-4">تنبيه الميزانية</h4>
                <p className="text-xs text-gray-400 leading-relaxed">وصلت نفقات السيرفر إلى 80% من الميزانية المحددة لهذا الشهر.</p>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};
export default FinanceManager
