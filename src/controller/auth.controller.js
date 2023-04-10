const axios = require("axios");
const User = require("../models/user.model");
const bcrypt = require("../utils/bcrypt.util");
const appUtil = require("../utils/app.util");
const userController = require("./user.controller");

const generateAndStoreOtpInCookie = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.encrypt(otp);
  res.cookie(process.env.REGISTER_OTP_TOKEN, hashedOtp, {
    httpOnly: true,
    secure: true,
    expires: appUtil.getExpiryTime(2),
  });
  return await generateOTP(req, res, otp);
};

const registerUser = async (req, res) => {
  // send plain and store hashed otp in cookie with expiry as 2min
  const success = await generateAndStoreOtpInCookie(req, res);
  if (success) {
    // decrypt otp from cookie and compare with user data
    const userData = res.body;
    const hashedOtp = cookie.get(process.env.REGISTER_OTP_TOKEN);
    const valid = await bcrypt.compare(userData.otp, hashedOtp);
    // if valid then allow registration
    if (valid) {
      userController.createUser(req, res);
    }
  }
  // after registration store logged in data in session
};

const validateUserExistence = (req, res) => {
  User.findOne({ mobile: Number(req.params.mobile) })
    .then((data) => {
      data ? res.status(200).send(true) : res.status(404).send(false);
    })
    .catch((err) => res.status(404).send(false));
};

const generateOTP = (req, res, otp) => {
  const URL = `http://login.wishbysms.com/api/sendhttp.php`;
  return axios.get(URL, {
    params: {
      authkey: "65497AZmUVzmQVV63f4c90fP1",
      mobiles: req.params.mobile,
      message: `Dear Farmer, Your Agriculture Grievance projects One Time Verification Code OTP is ${otp} thank you POWERED BY MTJF`,
      sender: "grAGRO",
      route: 4,
      country: 91,
      DLT_TE_ID: "1307166952390775178",
    },
  });
};

const verifyOTP = (req, res) => {
  // get otp from user
  // validate from db
  // decrypt otp
  // if is valid then allow registration or login
};

module.exports = {
  validateUserExistence,
  generateOTP,
  verifyOTP,
  registerUser,
};
