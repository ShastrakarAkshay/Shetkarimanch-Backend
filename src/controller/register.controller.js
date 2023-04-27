const appUtil = require("../utils/app.util");
const smsUtil = require("../utils/sms.utils");
const { Response, Message } = require("../common/errors.const");
const { CONFIG } = require("../app.config");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const validateUserAndSendOtp = async (req, res) => {
  const user = await User.findOne({ mobile: Number(req.params.mobile) });
  if (user) {
    res.status(400).send(Response.error(Message.userAlreadyExists));
    return;
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const regOtpToken = await User.generateRegOtpToken(otp, req.params.mobile);
  res.cookie(CONFIG.REGISTER_OTP_SECRET_KEY, regOtpToken);
  const success = await smsUtil.sendSms(otp, req.params.mobile);
  success && success.data
    ? res.status(200).send(Response.success(Message.otpSentSuccessfully))
    : res.status(400).send(Response.error(Message.unableToSendOtp));
};

const verifyOtpAndRegister = async (req, res) => {
  const { mobile, ...body } = req.body;
  const userData = await User.findOne({ mobile: Number(mobile) });
  if (userData) {
    res.status(400).send(Response.success(Message.userAlreadyExists));
    return;
  }
  const userOtp = req.params.otp;
  const regOtpToken = req.cookies[CONFIG.REGISTER_OTP_SECRET_KEY];
  jwt.verify(
    regOtpToken,
    CONFIG.REGISTER_OTP_SECRET_KEY,
    async (err, decode) => {
      if (err) {
        res.status(400).send(Response.error(Message.otpExpired));
      }
      if (decode) {
        const { _otp, _mobile } = decode;
        if (Number(userOtp) === Number(_otp)) {
          const user = new User({
            ...body,
            pinCode: Number(body.pinCode),
            mobile: Number(_mobile),
          });
          const userData = await user.save();
          if (userData) {
            const token = await user.generateAuthToken();
            res.cookie(CONFIG.AUTH_SECRET_KEY, token, {
              httpOnly: true,
              expires: appUtil.getExpiryTime(60), // 60 minutes
            });
            res.status(200).send(userData);
          } else {
            res.status(400).send(Response.error(Message.somethingWentWrong));
          }
        } else {
          res.status(400).send(Response.error(Message.invalidOtp));
        }
      }
    },
  );
};

module.exports = {
  validateUserAndSendOtp,
  verifyOtpAndRegister,
};
