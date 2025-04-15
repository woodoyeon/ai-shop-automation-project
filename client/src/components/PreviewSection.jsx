import React from 'react';

export default function PreviewSection() {
  return (
    <div className="p-8 grid md:grid-cols-3 gap-6 text-center">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-bold text-lg mb-3 text-pink-600">상세페이지 만들기</h3>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-full mb-4 hover:bg-pink-600">+ 새 상세페이지</button>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>샘플 상세페이지 1</li>
          <li>샘플 상세페이지 2</li>
          <li>샘플 상세페이지 3</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-bold text-lg mb-3 text-blue-600">AI 챗봇 상담</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🙋 고객: 배송이 언제 오나요?</li>
          <li>🤖 챗봇: 오늘 출고 예정입니다.</li>
          <li>🙋 고객: 교환 어떻게 하나요?</li>
        </ul>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-bold text-lg mb-3 text-purple-600">이번 달 매출 요약</h3>
        <p className="text-sm text-gray-700 mb-1">총 매출: 1,200,000원</p>
        <p className="text-sm text-gray-700 mb-1">광고비: 300,000원</p>
        <p className="text-sm font-semibold text-green-600">순이익: 900,000원</p>
      </div>
    </div>
  );
}
