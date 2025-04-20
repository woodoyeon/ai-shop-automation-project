import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function PageApproval() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return null;

  if (!user || user.user_metadata?.role !== 'admin') {
    return <div className="p-8 text-red-500 font-semibold">🚫 관리자 전용 페이지입니다</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">✅ 상세페이지 승인 관리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border p-4 rounded shadow">
            <div className="w-full h-40 bg-gray-200 rounded mb-3" />
            <h2 className="text-lg font-semibold mb-1">상세페이지 제목 {i}</h2>
            <p className="text-sm text-gray-600 mb-2">설명 요약 내용입니다.</p>

            <textarea
              className="w-full border rounded p-2 text-sm mb-2"
              placeholder="반려 사유 입력 (선택)"
            ></textarea>

            <div className="flex gap-3">
              <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">승인</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">반려</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
