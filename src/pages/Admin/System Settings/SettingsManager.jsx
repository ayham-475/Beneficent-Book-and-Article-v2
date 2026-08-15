import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import { Settings, Shield, CreditCard, Palette, Save } from 'lucide-react';
import { GeneralSettings } from './GeneralSettings';
import {FinancialRules} from './FinancialRules'
import {SecurityAudit} from './SecurityAudit'
const SettingsManager = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'العامة', icon: <Settings size={18} /> },
    { id: 'finance', name: 'المالية', icon: <CreditCard size={18} /> },
    { id: 'security', name: 'الأمان', icon: <Shield size={18} /> },
  ];

  return (
    <div className="h-screen bg-[#080809] flex overflow-hidden text-white" dir="rtl">
      <Sidebar />
      <main className="flex-1 md:pr-[110px] flex flex-col h-full relative">
        
        {/* Header ثابت */}
        <header className="px-6 md:px-12 pt-10 pb-6 shrink-0 z-20">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">الإعدادات</h1>
              <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">تكوين النظام وتفضيلات المنصة</p>
            </div>
            <button className="bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Save size={18} /> حفظ التغييرات
            </button>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-10 border-b border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-black transition-all relative ${
                  activeTab === tab.id ? 'text-emerald-500' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab.icon}
                {tab.name}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>}
              </button>
            ))}
          </div>
        </header>

        {/* Content Area القابل للسكرول */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 md:px-12 pb-20 pt-6">
          <div className="max-w-4xl">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'finance' && <FinancialRules />}
            {activeTab === 'security' && <SecurityAudit />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsManager;