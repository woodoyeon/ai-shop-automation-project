const express = require('express');
const app = express();
const PORT = 5000;

// JSON 파싱을 위한 미들웨어
app.use(express.json());

// 라우터 연결
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('✅ 서버가 잘 작동하고 있습니다!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
