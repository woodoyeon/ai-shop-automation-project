import React, { useState } from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

export default function UploadBox() {
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
          {[img1, img2, img3, img4].map((img, i) => (
            <img key={i} src={img} alt={`img${i}`} className="w-[60px] h-[60px] object-cover border rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
