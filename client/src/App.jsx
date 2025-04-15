import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PreviewSection from './components/PreviewSection';
import ChatInput from './components/ChatInput';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ChatInput />
      <PreviewSection />
      <Footer />
    </div>
  );
}

export default App;
