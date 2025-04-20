import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import DetailMaker from './pages/DetailMaker';
import ChatLogs from './pages/ChatLogs';
import LedgerPage from './pages/LedgerPage';
import Settings from './pages/Settings';

import AuthForm from './components/AuthForm'; // ✅ 로그인 컴포넌트!

// 관리자용
import AdminDashboard from './pages/admin/AdminDashboard';
import PageApproval from './pages/admin/PageApproval';
import ChatAnalysis from './pages/admin/ChatAnalysis';
import SalesReport from './pages/admin/SalesReport';
import UserManagement from './pages/admin/UserManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 사용자 라우팅 */}
        <Route path="/" element={<Home />} />
        <Route path="/detail-maker" element={<DetailMaker />} />
        <Route path="/chat-logs" element={<ChatLogs />} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/login" element={<AuthForm />} /> {/* ✅ 연결됨! */}
        <Route path="/settings" element={<Settings />} />

        {/* 관리자 라우팅 */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/approvals" element={<PageApproval />} />
        <Route path="/admin/chat-analysis" element={<ChatAnalysis />} />
        <Route path="/admin/sales-report" element={<SalesReport />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
