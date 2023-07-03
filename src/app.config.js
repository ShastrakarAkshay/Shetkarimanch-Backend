const ProdDB = `mongodb+srv://Admin:admin@shetkimanch.kybs2ys.mongodb.net/ShetkiManch?retryWrites=true&w=majority`;
const TestDB = `mongodb+srv://Admin:admin@cluster0.rojvjcd.mongodb.net/Test?retryWrites=true&w=majority`;

const CONFIG = {
  PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL || TestDB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REGISTER_OTP_SECRET_KEY:
    process.env.REGISTER_OTP_SECRET_KEY || "sm-reg-otp-secret-key",
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || "sm-auth-token-secret-key",
  OTP_SECRET_KEY: process.env.OTP_SECRET_KEY || "sm-otp-token-secret-key",
  SERVER_URL:
    process.env.SERVER_URL ||
    "http://shetkimanch-env.eba-5kwfspmw.us-east-2.elasticbeanstalk.com",
  UI_ORIGIN: process.env.UI_ORIGIN || "http://shetkimanch.com",
};

module.exports = { CONFIG };
