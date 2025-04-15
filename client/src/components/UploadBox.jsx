import React, { useState } from 'react';

export default function UploadBox() {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
    }
  };

  return (
    <div
      className={`bg-white shadow-2xl rounded-3xl p-8 w-[340px] flex flex-col items-center text-center border border-pink-100 transition-all duration-300 ease-in-out ${
        isDragging ? 'ring-4 ring-pink-200 scale-105' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-2 rounded-full mb-4 font-bold shadow hover:scale-105 transition">
        이미지 업로드
      </button>
      <p className="text-lg font-bold text-pink-600 mb-1">또는 파일을 드래그 하세요</p>
      <p className="text-sm text-gray-400 mb-4">
        붙여넣기 또는 <span className="text-pink-400 underline cursor-pointer">URL 입력</span>
      </p>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="미리보기"
          className="w-full max-w-[240px] mt-4 rounded-xl shadow-lg border-2 border-pink-100"
        />
      )}
    </div>
  );
}
