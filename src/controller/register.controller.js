const bcrypt = require("../utils/bcrypt.util");
const appUtil = require("../utils/app.util");
const smsUtil = require("../utils/sms.utils");
const { Response, Message } = require("../common/errors.const");
const User = require("../models/user.model");

const validateUserAndSendOtp = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.encrypt(otp);
  res.cookie(process.env.REGISTER_OTP_SECRET_KEY, hashedOtp, {
    httpOnly: true,
    expires: appUtil.getExpiryTime(2), // otp expires in 2 min
  });
  const success = await smsUtil.sendSms(otp, req.params.mobile);
  success && success.data
    ? res.status(200).send(Response.success(Message.otpSentSuccessfully))
    : res.status(400).send(Response.error(Message.somethingWentWrong));
};

const verifyOtpAndRegister = async (req, res) => {
  const userData = await User.findOne({ mobile: Number(req.body.mobile) });
  if (userData) {
    res.status(400).send(Response.success(Message.userAlreadyExists));
    return;
  }
  const userOtp = req.params.otp;
  const hashedOtp = req.cookies[process.env.REGISTER_OTP_SECRET_KEY];
  if (hashedOtp) {
    const valid = await bcrypt.compare(userOtp, hashedOtp);
    if (valid) {
      const user = new User(req.body);
      const userData = await user.save();
      if (userData) {
        const token = user.generateAuthToken();
        res.cookie(process.env.AUTH_SECRET_KEY, token, {
          httpOnly: true,
          expires: appUtil.getExpiryTime(60), // 60 minutes
        });
        res.status(200).send(Response.success(Message.userCreatedSuccessfully));
      } else {
        res.status(400).send(Response.error(Message.somethingWentWrong));
      }
    } else {
      res.status(400).send(Response.error(Message.invalidOtp));
    }
  } else {
    res.status(400).send(Response.error(Message.somethingWentWrong));
  }
};

module.exports = {
  validateUserAndSendOtp,
  verifyOtpAndRegister,
};
