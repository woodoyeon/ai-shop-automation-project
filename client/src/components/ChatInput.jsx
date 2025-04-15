import React from 'react';

export default function ChatInput() {
  return (
    <div className="mt-12 border-t pt-6 px-6">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800">무엇을 도와드릴까요?</h2>
      <div className="flex items-center border rounded px-4 py-2 max-w-2xl mx-auto">
        <input type="text" placeholder="무엇이든 물어보세요" className="flex-grow outline-none text-sm px-2" />
        <button className="text-xl px-2">🎤</button>
        <button className="text-xl px-2">🎧</button>
      </div>
    </div>
  );
}
