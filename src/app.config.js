const DB_URL = `mongodb+srv://Admin:admin@cluster0.rojvjcd.mongodb.net/Test?retryWrites=true&w=majority`;

const CONFIG = {
  PORT: process.env.PORT || 8000,
  MONGO_URL: DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REGISTER_OTP_SECRET_KEY:
    process.env.REGISTER_OTP_SECRET_KEY || "sm-reg-otp-secret-key",
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || "sm-auth-token-secret-key",
  OTP_SECRET_KEY: process.env.OTP_SECRET_KEY || "sm-otp-token-secret-key",
  UI_ORIGIN: "http://154.49.243.226",
};

module.exports = { CONFIG };
