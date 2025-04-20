// test-leonardo.js
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // .env 파일 불러오기

const API_KEY = process.env.LEONARDO_API_KEY;
console.log('🔑 API 키 확인:', API_KEY);

async function testLeonardo() {
  try {
    const res = await axios.get('https://cloud.leonardo.ai/api/rest/v1/me', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
    });

    console.log('✅ 성공:', res.data);
  } catch (err) {
    console.error('❌ 실패:', err.response?.data || err.message);
  }
}

testLeonardo();
