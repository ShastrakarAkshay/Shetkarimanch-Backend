const username = "AkshayShastrakar";
const password = "FDZu1v4JPa2FCbyq";
const database = "ShetkiManch";
const URL = `mongodb+srv://${username}:${password}@shetkimanch.wq66pzi.mongodb.net/${database}?retryWrites=true&w=majority`;

const CONFIG = {
  PORT: process.env.PORT || 8000,
  DB_USERNAME: process.env.DB_USERNAME || username,
  DB_PASSWORD: process.env.DB_PASSWORD || password,
  DB_NAME: process.env.DB_NAME || database,
  MONGO_URL: process.env.MONGO_URL || URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  REGISTER_OTP_SECRET_KEY:
    process.env.REGISTER_OTP_SECRET_KEY || "sm-reg-otp-secret-key",
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || "sm-auth-token-secret-key",
  OTP_SECRET_KEY: process.env.OTP_SECRET_KEY || "sm-otp-token-secret-key",
  SERVER_URL:
    process.env.SERVER_URL ||
    "http://shetkimanch-env.eba-5kwfspmw.us-east-2.elasticbeanstalk.com",
};

module.exports = { CONFIG };
