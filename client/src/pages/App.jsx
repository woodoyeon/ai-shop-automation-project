import React, { useState } from 'react';
import heroImage from '../assets/hero.jpg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import logo from '../assets/logo.png';

export default function App() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      alert(`${files.length}개의 파일을 업로드했습니다.`);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 상단 네비게이션 바 */}
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

      {/* 상단 전체: 좌우 분할 */}
      <div className="flex flex-1 p-4">
        {/* 왼쪽: 이미지 + 텍스트 */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <img src={heroImage} alt="예시 이미지" className="w-2/3 mb-4" />
          <h1 className="text-3xl font-bold text-center">이미지에서 배경을 제거하세요</h1>
          <p className="mt-2 text-gray-600 text-sm text-center">도매 사장님을 위한 100% 자동화 프로그램</p>
        </div>

        {/* 오른쪽: 업로드 기능 - 카드 박스 */}
        <div className="w-1/2 flex items-center justify-center">
          <div
            className={`bg-white shadow-xl rounded-3xl p-8 w-[350px] flex flex-col items-center text-center transition ${
              isDragging ? 'ring-4 ring-blue-400' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full mb-4 hover:bg-blue-700 transition">
              이미지 업로드
            </button>
            <p className="text-lg font-semibold text-gray-800 mb-1">또는 파일 놓기,</p>
            <p className="text-sm text-gray-500 mb-4">
              이미지 붙여넣기 또는 <a href="#" className="text-blue-500 underline">URL</a>
            </p>
            <div className="flex gap-2">
              <img src={img1} alt="img1" className="w-[60px] h-[60px] object-cover border rounded" />
              <img src={img2} alt="img2" className="w-[60px] h-[60px] object-cover border rounded" />
              <img src={img3} alt="img3" className="w-[60px] h-[60px] object-cover border rounded" />
              <img src={img4} alt="img4" className="w-[60px] h-[60px] object-cover border rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 채팅 입력 */}
      <div className="mt-4 border-t pt-4 px-4">
        <h2 className="text-lg font-bold text-center mb-2">무엇을 도와드릴까요?</h2>
        <div className="flex items-center border rounded px-2 py-1 w-full">
          <input type="text" placeholder="무엇이든 물어보세요" className="flex-grow outline-none px-2" />
          <button className="p-1">🎤</button>
          <button className="p-1">🎧</button>
        </div>
      </div>

      {/* 기능 섹션들 */}
      <div className="p-6 grid md:grid-cols-3 gap-6 text-center">
        {/* 상세페이지 미리보기 */}
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">상세페이지 만들기</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700">+ 새 상세페이지 만들기</button>
          <ul className="text-sm space-y-1">
            <li>샘플 상세페이지 1</li>
            <li>샘플 상세페이지 2</li>
            <li>샘플 상세페이지 3</li>
            <li>샘플 상세페이지 4</li>
            <li>샘플 상세페이지 5</li>
          </ul>
        </div>

        {/* 챗봇 미리보기 */}
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">고객과의 AI 챗봇 대화</h3>
          <ul className="text-sm space-y-2">
            <li className="flex justify-center items-center gap-2">🙋‍♀️ <span>고객: 배송이 언제 오나요?</span></li>
            <li className="flex justify-center items-center gap-2">🤖 <span>챗봇: 오늘 출고 예정입니다.</span></li>
            <li className="flex justify-center items-center gap-2">🙋‍♀️ <span>고객: 교환은 어떻게 하나요?</span></li>
            <li className="flex justify-center items-center gap-2">🤖 <span>챗봇: 챗봇이 교환절차를 안내드릴게요.</span></li>
          </ul>
        </div>

        {/* 매출 요약 */}
        <div className="bg-gray-50 p-4 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">이번 달 매출 요약</h3>
          <p className="text-sm mb-2">총 매출: 1,200,000원</p>
          <p className="text-sm mb-2">광고비: 300,000원</p>
          <p className="text-sm mb-4 font-semibold">순이익: 900,000원</p>
          <h4 className="font-bold text-sm mb-2">인기 상품 TOP 5</h4>
          <ul className="text-sm space-y-1">
            <li>화이트 셔츠</li>
            <li>슬림 팬츠</li>
            <li>블랙 재킷</li>
            <li>여름 반팔</li>
            <li>기모 맨투맨</li>
          </ul>
        </div>
      </div>

      {/* 하단 푸터 */}
      <footer className="bg-gray-800 text-white text-sm mt-12 px-6 py-6 text-center">
        <p>ⓒ 2025 AI 쇼핑몰 자동화 시스템 | 무단 복제 금지 | 서울특별시 강남구 테헤란로 123, AI센터 7층</p>
        <p className="mt-1">본 서비스는 자동화 기술을 활용한 B2B 솔루션으로, 사업자 회원만 이용 가능합니다.</p>
      </footer>
    </div>
  );
}
