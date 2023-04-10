const jwt = require("jsonwebtoken");

exports.createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

exports.verifyToken = (token, next) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return userId;
  } catch (err) {
    next(err);
  }
};
