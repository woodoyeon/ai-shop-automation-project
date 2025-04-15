import React from 'react';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 border-b shadow-sm">
      <div className="flex items-center space-x-12">
        <img src={logo} alt="로고" className="h-[40px] w-auto" />
        <div className="flex space-x-10 text-sm font-medium">
          <a href="/detail-maker" className="text-blue-700 hover:underline">상세페이지 제작</a>
          <a href="/chatbot" className="text-blue-700 hover:underline">챗봇 상담</a>
          <a href="/sales" className="text-blue-700 hover:underline">매출 대시보드</a>
          <a href="/settings" className="text-blue-700 hover:underline">설정</a>
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <input type="text" placeholder="아이디" className="border px-2 py-1 rounded text-sm" />
        <input type="password" placeholder="비밀번호" className="border px-2 py-1 rounded text-sm" />
        <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">로그인</button>
      </div>
    </div>
  );
}
