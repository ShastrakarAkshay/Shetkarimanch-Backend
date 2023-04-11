const axios = require("axios");
const bcrypt = require("../utils/bcrypt.util");
const appUtil = require("../utils/app.util");
const userController = require("./user.controller");

const generateOTP = (req, res, otp, mobile) => {
  const URL = `http://login.wishbysms.com/api/sendhttp.php`;
  return axios.get(URL, {
    params: {
      authkey: "65497AZmUVzmQVV63f4c90fP1",
      mobiles: mobile,
      message: `Dear Farmer, Your Agriculture Grievance projects One Time Verification Code OTP is ${otp} thank you POWERED BY MTJF`,
      sender: "grAGRO",
      route: 4,
      country: 91,
      DLT_TE_ID: "1307166952390775178",
    },
  });
};

const sendOtp = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.encrypt(otp);
  res.cookie("sm-reg-otp-token", hashedOtp, {
    httpOnly: true,
    secure: true,
    expires: appUtil.getExpiryTime(2),
  });
  const success = await generateOTP(req, res, otp, req.params.mobile);
  success && success.data
    ? res.status(200).send(true)
    : res.status(400).send(false);
};

const verifyOtp = async (req, res) => {
  const userOtp = req.params.otp;
  const hashedOtp = req.cookies["sm-reg-otp-token"];
  if (hashedOtp) {
    const valid = await bcrypt.compare(userOtp, hashedOtp);
    valid ? res.status(200).send(true) : res.status(400).send(false);
  } else {
    res.status(400).send(false);
  }
};

const registerUser = (req, res) => {
  userController.createUser(req, res);
};

module.exports = {
  generateOTP,
  sendOtp,
  verifyOtp,
  registerUser,
};
