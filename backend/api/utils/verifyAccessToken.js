const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken)
    return res.status(401).json({ message: 'Access token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid access token');
    req.user = decoded;
    next();
  });
};

module.exports = verifyAccessToken;
