import React from 'react';

export default function PreviewSection() {
  return (
    <div className="p-6 grid md:grid-cols-3 gap-6 text-center">
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
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="font-bold text-lg mb-2">고객과의 AI 챗봇 대화</h3>
        <ul className="text-sm space-y-2">
          <li className="flex justify-center items-center gap-2">🙋‍♀️ <span>고객: 배송이 언제 오나요?</span></li>
          <li className="flex justify-center items-center gap-2">🤖 <span>챗봇: 오늘 출고 예정입니다.</span></li>
          <li className="flex justify-center items-center gap-2">🙋‍♀️ <span>고객: 교환은 어떻게 하나요?</span></li>
          <li className="flex justify-center items-center gap-2">🤖 <span>챗봇: 챗봇이 교환절차를 안내드릴게요.</span></li>
        </ul>
      </div>
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
  );
}
