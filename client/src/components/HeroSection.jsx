import React from 'react';
import heroImage from '../assets/hero.png';

export default function HeroSection() {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center">
      <img src={heroImage} alt="예시 이미지" className="w-2/3 mb-4" />
      <h1 className="text-3xl font-bold text-center">이미지에서 배경을 제거하세요</h1>
      <p className="mt-2 text-gray-600 text-sm text-center">도매 사장님을 위한 100% 자동화 프로그램</p>
    </div>
  );
}
