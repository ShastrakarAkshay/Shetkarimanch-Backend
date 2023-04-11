const User = require("../models/user.model");
const { Message, Response } = require("../common/errors.const");
const { sendSms } = require("../utils/sms.utils");
const bcrypt = require("../utils/bcrypt.util");

const validateUserAndSendOTP = async (req, res) => {
  const mobile = req.params.mobile;
  const user = await User.findOne({ mobile: Number(mobile) });
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.encrypt(otp);
    const success = await sendSms(otp, mobile);
    if (success && success.data) {
      const tokens = {
        hashedOtp: hashedOtp,
        authToken: "authToken",
      };
      const update = await User.findOneAndUpdate(
        { _id: user._id },
        { tokens: tokens },
        { new: true }
      );
      update
        ? res.status(200).send(Response.success(Message.otpSentSuccessfully))
        : res.status(400).send(Response.error(Message.somethingWentWrong));
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
    const valid = await bcrypt.compare(otp, user.tokens.hashedOtp);
    if (valid) {
      // allow login create jwt token and user session
      res.send(200).send(Response.success(Message.loginSuccess));
    } else {
      res.status(400).send(Response.error(Message.invalidOtp));
    }
  } else {
    res.status(404).send(Response.error(Message.userDoesNotExists));
  }
};

module.exports = { validateUserAndSendOTP, verifyOtpAndLogin };
