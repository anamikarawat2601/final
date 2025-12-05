const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  console.log('Auth middleware running...');
  // Expect header: Authorization: Bearer <token>
  const authHeader = req.header('Authorization') || req.header('authorization');
  //console.log("authHeader::",authHeader)
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.replace('Bearer ', '').trim()
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
//header
//payload
//
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info from token to request object
    req.user = payload;
    next();
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
