const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const API_KEY = process.env.LEONARDO_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  console.log('📥 프론트에서 받은 프롬프트:', prompt);

  if (!prompt) {
    return res.status(400).json({ error: '프롬프트가 필요합니다.' });
  }

  if (!API_KEY) {
    console.error('❌ API 키가 없습니다!');
    return res.status(500).json({ error: '서버 설정 오류: API 키 없음' });
  }

  try {
    // 1단계: generationId 발급
    const initResponse = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        prompt,
        width: 512,
        height: 512,
        modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876',
        num_images: 1
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    const generationId = initResponse.data?.sdGenerationJob?.generationId;
    console.log('🆔 생성된 generationId:', generationId);

    if (!generationId) {
      return res.status(500).json({ error: 'generationId 생성 실패' });
    }

    // 2단계: 이미지 생성 상태 확인 (polling 반복 방식)
    const MAX_RETRIES = 6;
    let retries = 0;

    const pollForImage = async () => {
      try {
        const statusRes = await axios.get(
          `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              Accept: 'application/json'
            }
          }
        );

        const imageUrl = statusRes.data?.generations?.[0]?.generated_images?.[0]?.url;
        console.log('🎯 이미지 확인 시도:', retries + 1, '| URL:', imageUrl);

        if (imageUrl) {
          return res.json({ imageUrl });
        }

        if (retries < MAX_RETRIES) {
          retries++;
          setTimeout(pollForImage, 5000);
        } else {
          return res.status(504).json({ error: '이미지 생성 시간이 초과되었습니다.' });
        }
      } catch (e) {
        console.error('❌ polling 중 오류:', e.response?.data || e.message);
        return res.status(500).json({ error: '이미지 조회 중 오류 발생' });
      }
    };

    pollForImage();
  } catch (err) {
    console.error('🔥 생성 요청 실패:', err.response?.data || err.message);
    res.status(500).json({ error: 'Leonardo API 호출 실패' });
  }
});

module.exports = router;
