const User = require("../models/user.model");
const { Message, Response } = require("../common/errors.const");
const { sendSms } = require("../utils/sms.utils");
const bcrypt = require("../utils/bcrypt.util");
const appUtil = require("../utils/app.util");

const validateUserAndSendOTP = async (req, res) => {
  const mobile = req.params.mobile;
  const user = await User.findOne({ mobile: Number(mobile) });
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.encrypt(otp);
    const success = await sendSms(otp, mobile);
    if (success && success.data) {
      User.findOneAndUpdate({ _id: user._id }, { hashedOtp }, { new: true })
        .then(() => res.status(200).send(Response.success(Message.otpSentSuccessfully)))
        .catch(() => res.status(400).send(Response.error(Message.somethingWentWrong)));
    } else {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    }
  } else {
    res.status(404).send(Response.error(Message.userDoesNotExists));
  }
};

const verifyOtpAndLogin = async (req, res) => {
  const mobile = req.body.mobile;
  const otp = req.params.otp;
  const user = await User.findOne({ mobile: Number(mobile) });
  if (user) {
    const valid = await bcrypt.compare(otp, user.hashedOtp);
    if (valid) {
      const token = await user.generateAuthToken();
      res.cookie(process.env.AUTH_SECRET_KEY, token, {
        httpOnly: true,
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
