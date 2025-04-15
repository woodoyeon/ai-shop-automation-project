import React from 'react';
import hero from '../assets/hero.jpg';
import reactLogo from '../assets/react.svg';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-left space-y-4">
          <img src={hero} alt="hero" className="w-72 mb-6 rounded-xl shadow-xl" />
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Remove Image <br /> Background</h1>
          <p className="text-lg">100% Automatically and <span className="bg-yellow-300 px-2 py-1 rounded">Free</span></p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full md:w-1/2 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700">Upload Image</button>
          <p className="mt-4 text-sm text-gray-600">or drop a file, paste image or <a href="#" className="text-purple-700 underline">URL</a></p>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-800 mb-2">No image? Try one of these:</p>
            <div className="flex justify-center gap-2">
              <img src="https://placehold.co/60x60" alt="example" className="rounded" />
              <img src="https://placehold.co/60x60" alt="example" className="rounded" />
              <img src="https://placehold.co/60x60" alt="example" className="rounded" />
              <img src="https://placehold.co/60x60" alt="example" className="rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">무엇을 도와드릴까요?</h2>
        <div className="w-full md:w-1/2 mx-auto bg-white shadow-md rounded-full flex items-center px-4 py-2 border">
          <input
            type="text"
            placeholder="무엇이든 물어보세요"
            className="flex-grow outline-none px-4 py-2 rounded-l-full"
          />
          <button className="text-xl px-4">🎤</button>
          <button className="text-xl">🎧</button>
        </div>
      </div>
    </div>
  );
}
