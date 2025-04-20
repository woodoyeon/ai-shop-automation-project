// ✅ Navbar.jsx 수정된 전체 코드
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // ✅ role로 관리자 여부 판단
  const userRole = session?.user?.user_metadata?.role;
  const isAdmin = userRole === 'admin';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img src={logo} alt="로고" className="h-8" />
        </Link>
        <div className="text-sm font-medium flex flex-wrap items-center gap-4 text-gray-700">
          <Link to="/detail-maker">상세페이지 제작</Link>
          <Link to="/chat-logs">챗봇 상담</Link>
          <Link to="/ledger">매출 대시보드</Link>
          <Link to="/settings">설정</Link>

          {isAdmin && (
            <>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-red-600 font-bold">관리자 메뉴</span>
              <Link to="/admin" className="text-red-600 font-semibold">대시보드</Link>
              <Link to="/admin/approvals" className="text-red-600 font-semibold">승인관리</Link>
              <Link to="/admin/chat-analysis" className="text-red-600 font-semibold">대화분석</Link>
              <Link to="/admin/sales-report" className="text-red-600 font-semibold">매출통계</Link>
              <Link to="/admin/user-management" className="text-red-600 font-semibold">계정관리</Link>
            </>
          )}
        </div>
      </div>

      <div className="space-x-2">
        {session ? (
          <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-1 rounded text-sm hover:bg-gray-700">
            로그아웃
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
              로그인 / 회원가입
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
