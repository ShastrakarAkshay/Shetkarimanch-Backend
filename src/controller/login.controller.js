const User = require("../models/user.model");
const { Message, Response } = require("../common/errors.const");
const { sendSms } = require("../utils/sms.utils");
const { CONFIG } = require("../app.config");
const appUtil = require("../utils/app.util");

const validateUserAndSendOTP = async (req, res) => {
  const mobile = req.params.mobile;
  const user = await User.findOne({ mobile: Number(mobile) });
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    await user.generateOtpToken(otp);
    const success = await sendSms(otp, mobile);
    success && success.data
      ? res.status(200).send(Response.success(Message.otpSentSuccessfully))
      : res.status(400).send(Response.error(Message.unableToSendOtp));
  } else {
    res.status(404).send(Response.error(Message.userDoesNotExists));
  }
};

const verifyOtpAndLogin = async (req, res) => {
  const { mobile, otp } = req.query;
  const user = await User.findOne({ mobile: Number(mobile) });
  if (user) {
    const savedOtp = await user.verifyOtpToken();
    if (Number(otp) === Number(savedOtp)) {
      const token = await user.generateAuthToken();
      res.cookie(CONFIG.AUTH_SECRET_KEY, token, {
        httpOnly: true,
        sameSite: "none",
        expires: appUtil.getExpiryTime(60), // 60 minutes
      });
      res.status(200).send(Response.success(Message.loginSuccess));
    } else {
      res.status(400).send(Response.error(Message.invalidOtp));
    }
  } else {
    res.status(404).send(Response.error(Message.userDoesNotExists));
  }
};

module.exports = { validateUserAndSendOTP, verifyOtpAndLogin };
