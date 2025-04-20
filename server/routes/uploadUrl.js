// 📁 server/routes/uploadUrl.js
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();
require('dotenv').config();

const upload = multer({ storage: multer.memoryStorage() });
const API_KEY = process.env.LEONARDO_API_KEY;

// 🔽 프론트에서 presigned URL 요청만 따로 처리하는 경우
router.post('/', async (req, res) => {
  const { extension } = req.body;

  try {
    const response = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/init-image',
      { extension },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const { url, fields, id } = response.data.uploadInitImage;
    res.json({ url, fields, imageId: id });
  } catch (err) {
    console.error('🔴 Presigned URL 생성 실패:', err.response?.data || err.message);
    res.status(500).json({ error: 'Presigned URL 요청 실패' });
  }
});

// 🔽 이미지 업로드 + 생성까지 백엔드에서 처리
router.post('/upload-and-generate', upload.single('image'), async (req, res) => {
  const prompt = req.body.prompt;
  const imageBuffer = req.file?.buffer;

  if (!prompt || !imageBuffer) {
    return res.status(400).json({ error: '이미지와 프롬프트가 필요합니다.' });
  }

  try {
    // Step 1: presigned URL 요청
    const presignRes = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/init-image',
      { extension: 'png' },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    const uploadUrl = presignRes.data.uploadInitImage.url;
    const fields = presignRes.data.uploadInitImage.fields;
    const imageId = presignRes.data.uploadInitImage.id;

    // Step 2: presigned URL로 이미지 업로드
    const form = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append('file', imageBuffer, {
      filename: 'upload.png',
      contentType: 'image/png'
    });

    await axios.post(uploadUrl, form, {
      headers: form.getHeaders()
    });

    // Step 3: 생성 요청
    const response = await axios.post(
      'https://cloud.leonardo.ai/api/rest/v1/generations',
      {
        prompt,
        height: 512,
        width: 512,
        init_image_id: imageId,
        init_strength: 0.5,
        modelId: '1e60896f-3c26-4296-8ecc-53e2afecc132'
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    const generationId = response.data?.sdGenerationJob?.generationId;

    const finalRes = await axios.get(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const imageUrl = finalRes.data.generations?.[0]?.generated_images?.[0]?.url;
    if (!imageUrl) {
      return res.status(500).json({ error: '이미지 생성 실패 (URL 없음)' });
    }

    res.json({ imageUrl });
  } catch (err) {
    console.error('❌ Leonardo 전체 호출 실패:', err.response?.data || err.message);
    res.status(500).json({ error: 'Leonardo 전체 처리 실패' });
  }
});

module.exports = router;
