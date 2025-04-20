const express = require('express');
const multer = require('multer');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const API_KEY = process.env.LEONARDO_API_KEY;

// 이미지 Presigned URL 업로드 방식
router.post('/', upload.single('image'), async (req, res) => {
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
    const FormData = require('form-data');
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

    // Step 4: 결과 이미지 요청
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
    console.error('❌ Leonardo 호출 실패:', err?.response?.data || err.message);
    res.status(500).json({ error: 'Leonardo API 호출 실패' });
  }
});

module.exports = router;
