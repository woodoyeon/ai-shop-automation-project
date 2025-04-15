const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// 관리자 전용 라우트
router.get('/', auth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: '관리자만 접근 가능' });
  }
  res.json({ msg: '✅ 관리자 전용 데이터입니다!' });
});

module.exports = router;
