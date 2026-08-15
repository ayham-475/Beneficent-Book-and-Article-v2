import React, { useState ,useEffect} from 'react'

import './App.css'; // تأكد من المسار الصحيح
import AuthPage from './features/auth/login.jsx';
import content_user from './features/Article/ArticlesHub.jsx'
import AuthorDashboard from './pages/User/Dashboard/dashboard.jsx'
import { Routes, Route } from 'react-router-dom';

import BookCardDeatils from './features/books/BookCardDeatils.jsx'
import CreativeArticleView from './features/Article/ArticleDeatiles.jsx'
import { ArticlesContextData } from './App/Public/Contexts/ArticlesContext.jsx';

import { AuthProvider } from './features/auth/auther.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';
import CategoriesPage from './App/Public/HomePages/CosmicHero.jsx'
import AdminPendingReviews from './pages/Admin/Dashboard/AdminPendingReviews.jsx'
import AdminUsers from './pages/Admin/adminUsers.jsx'
import UsersManager from './pages/Admin/Users/UsersManager.jsx'
import AddDataContent from './pages/User/Dashboard/AddDataContent.jsx'
import UploadFiles from './pages/User/Dashboard/UploadFiles.jsx'
import HomeH from './features/home/home.jsx'
import HomeBook from './features/books/home.jsx'

import ArticlesManager from './pages/User/Content Adminstorition/ArticlesHome/ArticlesManager.jsx';

import CreativeHub from './pages/User/Content Adminstorition/UserContentManager.jsx';
import ArticleEditor from './pages/User/Content Adminstorition/ArticlesHome/ArticleEditor.jsx';
import UserLayout from './App/Public/Layout/MainLayoutUser.jsx';
import AdminLayout from './App/Public/Layout/MainLayoutAdmin.jsx';
import BookContentHome from './pages/User/Content Adminstorition/BooksHome/BookContentHome.jsx';
// import AddBookContent from './pages/User/Content Adminstorition/BooksHome/AddBookContent.jsx';
import FinancialHome from './pages/User/Financial Management/FinancialHome.jsx';

import FinanceManager from './pages/Admin/FinanceManager/FinanceManager.jsx';
import SettingsManager from './pages/Admin/System Settings/SettingsManager.jsx';
import UserManagement from './pages/Admin/Content Moderation Hub/ContentModeration.jsx';
import ReaderCategoryView from './features/Categories/ReaderCategoryView.jsx';
import ArticleCategoryView from './features/Categories/ArticleCard.jsx';
import MySnakbar from './App/Public/Components/Toast.jsx';
import { ToastContext } from './App/Public/Contexts/ToastContext.jsx';
import { ContentDataContext } from './pages/User/Content Adminstorition/ArticlesHome/ArticlesContext.jsx';
import ProfileEditor from './features/auth/Profile.jsx';
import Articles from './features/Article/ArticlesHub.jsx';
import UserVerificationDashboard from './pages/Admin/Dashboard/UserVerificationDashboard.jsx';
function App() {
  const [ContentData,setContentdata]=useState([])
  const APT_URL="http://localhost:3000/contents";
    const GetDatacontent=async()=>{
      const res = await fetch(APT_URL);

      const contentdat = await res.json();
    
      setContentdata(contentdat)
  }
 useEffect(() => {
 GetDatacontent();
   
  }, []);
const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

 function showHideToast(message){
  setOpen(true); 
  setTimeout(()=>{
    setOpen(false)
  },2000)
  setMessage(message)
 }

  return (  
    //i am ayham alyaari
    <div>
      <MySnakbar open={open}  message={message} />
      <AuthProvider>
        <ToastContext.Provider value={{showHideToast}}>
          <ContentDataContext.Provider value={ContentData}>
       
            <Routes>

              {/* 1. المسارات العامة ( بدون سلايد بار) */}
              <Route path="/" element={<HomeH />} />
              <Route path="s" element={<MySnakbar />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/profile/:userId" element={<ProfileEditor />} />
              <Route path="/category" element={<CategoriesPage />} />
              <Route path="/Categories" element={<ReaderCategoryView />} />
              <Route path="/CategoriesArticle" element={<ArticleCategoryView />} />

              <Route path="/articlenew" element={<Articles />} />
              <Route path="/BookCardDeatils/:bookId" element={<BookCardDeatils />} />
              <Route path="/ArticleDetail/:ArticleId" element={<CreativeArticleView />} />
              <Route path="/homeBook" element={<HomeBook />} />

              {/* 2. مسارات لوحة التحكم (هنا السحر! السلايد بار سيظهر في كل هؤلاء) */}
              <Route element={<ProtectedRoute allowedRoles={[true]}><UserLayout /></ProtectedRoute>}>
                 
                {/* كل هذه الصفحات ستظهر داخل الـ Outlet وتأخذ السلايد بار تلقائياً */}
                <Route path="/dashboardUser" element={<AuthorDashboard />} />
                <Route path="/content_user" element={<CreativeHub />} />
                <Route path="/ArticleEditor" element={<ArticleEditor />} />
                <Route path="/ArticlesManager" element={<ArticlesManager />} />
                <Route path="/AddDataContent" element={<AddDataContent />} />
                <Route path="/UploadFiles" element={<UploadFiles />} />
                <Route path="/BookContentHome" element={<BookContentHome />} />
                {/* <Route path="/AddBookContent" element={<AddBookContent />} /> */}
                <Route path="/FinancialHome" element={<FinancialHome />} />

              </Route>

              {/* 3. مسارات الأدمن (إذا أردت لها سلايد بار مخت\لف أو نفس الشيء) */}
              <Route element={<ProtectedRoute allowedRoles={[true]}><AdminLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<AdminUsers />} />
                
                <Route path="/users" element={<UsersManager />} />
                <Route path="/UserVerificationDashboard" element={<UserVerificationDashboard />} />
                <Route path="/ContentModeration" element={<UserManagement />} />
                <Route path="/content" element={<AdminPendingReviews />} />
                <Route path="/FinanceManager" element={<FinanceManager />} />
                <Route path="/SettingsManager" element={<SettingsManager />} />
              </Route>
            </Routes>
        </ContentDataContext.Provider>
        </ToastContext.Provider>
      </AuthProvider>
    </div>
  );

}
export default App
