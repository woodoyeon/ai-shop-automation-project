import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import UploadBox from '../components/UploadBox';
import ChatInput from '../components/ChatInput';
import PreviewSection from '../components/PreviewSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      <section className="mt-20">
        <div className="flex flex-1 p-4 gap-12">
          <HeroSection />
          <UploadBox />
        </div>
      </section>

      {/* 여기에 테스트용 Tailwind 박스 넣기 */}
      <div className="bg-blue-500 text-white p-4 mt-8 rounded-lg shadow-lg">
      Tailwind 색상, 여백, 그림자 다 적용되나요?
    </div>

      <ChatInput />
      <PreviewSection />
      <Footer />
    </div>
  );
}
