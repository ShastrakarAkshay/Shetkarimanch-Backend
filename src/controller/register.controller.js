const bcrypt = require("../utils/bcrypt.util");
const appUtil = require("../utils/app.util");
const userController = require("./user.controller");
const { sendSms } = require("../utils/sms.utils");
const { Response, Message } = require("../common/errors.const");
const User = require("../models/user.model");

const validateUserAndSendOtp = async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.encrypt(otp);
  res.cookie("sm-reg-otp-token", hashedOtp, {
    httpOnly: true,
    secure: true,
    expires: appUtil.getExpiryTime(2),
  });
  const success = await sendSms(otp, req.params.mobile);
  success && success.data
    ? res.status(200).send(true)
    : res.status(400).send(false);
};

const verifyOtpAndRegister = async (req, res) => {
  const userOtp = req.params.otp;
  const hashedOtp = req.cookies["sm-reg-otp-token"];
  if (hashedOtp) {
    const valid = await bcrypt.compare(userOtp, hashedOtp);
    if (valid) {
      const user = new User(req.body);
      const userData = await user.save();
      if (userData) {
        // initiate jwt token and login session
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
