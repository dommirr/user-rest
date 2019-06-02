const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.get('token');

  jwt.verify(token, process.env.SEED || 'teststring' , (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido."
        }
      });
    }
    req.user = decoded.user;
    next();
  });
}

module.exports = { verifyToken };
