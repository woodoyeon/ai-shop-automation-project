const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.LEONARDO_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    // 1단계: 이미지 생성 요청
    const res1 = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        prompt,
        num_images: 1,
        width: 512,
        height: 768,
        guidance_scale: 7,
        scheduler: 'LEONARDO'
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generationId = res1.data.sdGenerationJob?.generationId;
    if (!generationId) {
      return res.status(500).json({ error: 'generationId 없음' });
    }

    // 2단계: 생성 기다리기
    await new Promise((resolve) => setTimeout(resolve, 10000)); // 10초 대기

    // 3단계: 생성된 이미지 조회
    const res2 = await axios.get(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const images = res2.data.generations_by_pk?.generated_images || [];
    res.json({ images });

  } catch (error) {
    console.error('Leonardo API 오류:', error.response?.data || error.message);
    res.status(500).json({ error: '이미지 생성 실패' });
  }
});

module.exports = router;
