const CONFIG = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  REGISTER_OTP_SECRET_KEY: process.env.REGISTER_OTP_SECRET_KEY,
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY,
  OTP_SECRET_KEY: process.env.OTP_SECRET_KEY,
  SERVER_URL: process.env.SERVER_URL,
};

module.exports = { CONFIG };
