import React from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center space-x-6">
        <img src={logo} alt="로고" className="h-8" />
        <div className="text-sm font-medium space-x-5 text-gray-700">
          <a href="#">상세페이지 제작</a>
          <a href="#">챗봇 상담</a>
          <a href="#">매출 대시보드</a>
          <a href="#">설정</a>
        </div>
      </div>
      <div className="space-x-2">
        <input type="text" placeholder="아이디" className="px-2 py-1 border rounded text-sm" />
        <input type="password" placeholder="비밀번호" className="px-2 py-1 border rounded text-sm" />
        <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">로그인</button>
      </div>
    </nav>
  );
}
