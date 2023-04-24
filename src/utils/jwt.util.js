const jwt = require("jsonwebtoken");
const { CONFIG } = require("../app.config");

exports.createToken = (payload) => {
  const token = jwt.sign(payload, CONFIG.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

exports.verifyToken = (token, next) => {
  try {
    const { userId } = jwt.verify(token, CONFIG.JWT_SECRET_KEY);
    return userId;
  } catch (err) {
    next(err);
  }
};
