const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.LEONARDO_API_KEY;

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        height: 512,
        width: 512,
        modelId: "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", // 기본 모델
        prompt
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: '이미지 생성 실패' });
  }
});

module.exports = router;
