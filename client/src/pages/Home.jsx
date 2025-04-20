import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pt-24 px-6">
      {/* 상단 버튼 영역 */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-2xl font-bold text-pink-600">🏠 내 대시보드</h1>
        <div className="flex gap-3">
          <Link to="/detail-maker" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            상세페이지 만들기
          </Link>
          
        </div>
      </div>

      {/* 상세페이지 리스트 카드 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📄 내 상세페이지 보기</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg shadow p-4">
              <div className="w-full h-40 bg-gray-200 rounded mb-2" />
              <p className="font-medium">AI 상세페이지 {i}</p>
              <p className="text-sm text-gray-500 mt-1">생성일: 2025-04-17</p>
              <Link to="/detail-maker" className="text-blue-500 text-sm mt-2 inline-block hover:underline">자세히 보기</Link>
            </div>
          ))}
        </div>
      </div>

      {/* 고객 챗봇 미리보기 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">💬 최근 챗봇 대화</h2>
        <div className="bg-gray-50 border rounded p-4 shadow max-w-2xl">
          <div className="text-sm text-gray-600 mb-1">[고객] 배송은 언제 오나요?</div>
          <div className="text-sm text-blue-600">[AI] 고객님, 오늘 발송되며 1~2일 내 도착합니다.</div>
        </div>
      </div>

      {/* 매출 요약 카드 */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📈 이번 달 매출 요약</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-green-100 p-4 rounded shadow">
            <p className="text-sm">총 매출</p>
            <p className="text-xl font-bold text-green-700">₩2,300,000</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <p className="text-sm">총 이익</p>
            <p className="text-xl font-bold text-yellow-700">₩1,800,000</p>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            <p className="text-sm">광고비</p>
            <p className="text-xl font-bold text-blue-700">₩300,000</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <p className="text-sm">방문자 수</p>
            <p className="text-xl font-bold text-red-700">1,542명</p>
          </div>
        </div>
      </div>

      {/* 인기 상품 미리보기 */}
      <div className="mb-20">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">🔥 인기 상품 미리보기</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[150px] border rounded shadow p-2 bg-white">
              <div className="w-full h-24 bg-gray-200 rounded mb-1" />
              <p className="text-sm text-center">상품명 {i}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
