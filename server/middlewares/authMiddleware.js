const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: '토큰 없음' });

  try {
    const decoded = jwt.verify(token, 'secret-key'); // 비밀키는 보통 .env에서 관리
    req.user = decoded; // 요청 객체에 user 정보 저장
    next(); // 다음 미들웨어 또는 라우터 실행
  } catch (err) {
    res.status(401).json({ msg: '토큰 유효하지 않음' });
  }
};
