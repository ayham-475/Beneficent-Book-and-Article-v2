import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../pages/User/Dashboard/SlideBar';
import TopHeader from '../../../pages/User/Dashboard/TopHeader'; // تأكد من المسار
import Footer from './Fotter';

const UserLayout = () => {
  return (
    <>
    {/* // "flex-row-reverse" لأن الموقع عربي (السلايد بار على اليمين) */}
    <div className="flex flex-row-reverse min-h-screen bg-[#E0E5EC]" dir="rtl">
      
      {/* 1. السلايد بار يظهر دائماً في كل الصفحات */}
      <Sidebar />

      {/* 2. منطقة المحتوى (الهيدر + الصفحة المتغيرة) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* الهيدر الثابت في الأعلى */}
        <TopHeader />

        {/* 3. منطقة "Outlet" حيث ستظهر صفحاتك (المقالات، الإضافة، إلخ) */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8">
          <Outlet /> 
        </main>

      </div>
   
    </div>
       <Footer />
       </>

  );
};

export default UserLayout;