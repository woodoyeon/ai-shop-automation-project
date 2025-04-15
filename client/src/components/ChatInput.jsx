import React from 'react';

export default function ChatInput() {
  return (
    <div className="mt-4 border-t pt-4 px-4">
      <h2 className="text-lg font-bold text-center mb-2">무엇을 도와드릴까요?</h2>
      <div className="flex items-center border rounded px-2 py-1 w-full">
        <input type="text" placeholder="무엇이든 물어보세요" className="flex-grow outline-none px-2" />
        <button className="p-1">🎤</button>
        <button className="p-1">🎧</button>
      </div>
    </div>
  );
}
