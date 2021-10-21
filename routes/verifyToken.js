const jwt = require('jsonwebtoken');

function verify(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Akses ditolak!');

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token tidak valid!');
  }
}

module.exports = verify;