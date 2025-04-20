import React, { useState } from 'react';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('보낸 메시지:', message);
      setMessage('');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 flex items-center gap-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="챗봇에게 물어보세요..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        전송
      </button>
    </div>
  );
}
