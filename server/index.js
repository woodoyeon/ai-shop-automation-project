const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ 라우터 등록
const leonardoRoute = require('./routes/leonardoAPI');
app.use('/leonardo', leonardoRoute);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('✅ 서버 작동 중');
});

app.listen(5000, () => {
  console.log('🚀 서버 실행 중: http://localhost:5000');
});
