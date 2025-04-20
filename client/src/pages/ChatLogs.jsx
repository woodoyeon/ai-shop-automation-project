import React, { useState } from 'react';
import Footer from '../components/Footer';

const dummyLogs = [
  {
    id: 1,
    customer: '홍길동',
    time: '2025-04-17 14:32',
    sentiment: '긍정',
    messages: [
      { sender: '고객', text: '상품 배송은 언제 되나요?' },
      { sender: 'AI', text: '배송은 내일 중 도착 예정입니다.' },
    ],
  },
  {
    id: 2,
    customer: '김영희',
    time: '2025-04-17 13:05',
    sentiment: '부정',
    messages: [
      { sender: '고객', text: '제품이 불량이에요.' },
      { sender: 'AI', text: '불편을 드려 죄송합니다. 교환 도와드릴게요.' },
    ],
  },
];

export default function ChatLogs() {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pt-24 px-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">💬 고객 챗봇 대화</h1>

      {/* 대화 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {dummyLogs.map((log) => (
          <div
            key={log.id}
            className="p-4 border rounded shadow hover:bg-blue-50 cursor-pointer transition"
            onClick={() => setSelectedLog(log)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{log.customer}</span>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
              log.sentiment === '긍정' ? 'bg-green-100 text-green-700' :
              log.sentiment === '부정' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {log.sentiment}
            </span>
          </div>
        ))}
      </div>

      {/* 개별 대화 보기 */}
      {selectedLog && (
        <div className="bg-gray-50 p-6 rounded shadow max-w-2xl mb-16">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">📌 {selectedLog.customer}님과의 대화</h2>
          <div className="space-y-3 text-sm">
            {selectedLog.messages.map((msg, i) => (
              <div key={i} className={`p-3 rounded ${msg.sender === '고객' ? 'bg-white border-l-4 border-pink-300' : 'bg-blue-50 border-l-4 border-blue-300'}`}>
                <strong>{msg.sender}</strong>: {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
