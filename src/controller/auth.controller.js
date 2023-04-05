const axios = require("axios");
const User = require("../models/user.model");

const validateUserExistence = (req, res) => {
  User.findOne({ mobile: Number(req.params.mobile) })
    .then((data) => {
      data ? res.status(200).send(true) : res.status(404).send(false);
    })
    .catch((err) => res.status(404).send(false));
};

const generateOTP = (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const URL = `http://login.wishbysms.com/api/sendhttp.php`;
  axios
    .get(URL, {
      params: {
        authkey: "65497AZmUVzmQVV63f4c90fP1",
        mobiles: req.params.mobile,
        message: `Dear Farmer, Your Agriculture Grievance projects One Time Verification Code OTP is ${otp} thank you POWERED BY MTJF`,
        sender: "grAGRO",
        route: 4,
        country: 91,
        DLT_TE_ID: "1307166952390775178",
      },
    })
    .then((data) => {
      res.status(200).send(data);
      // store otp in users db
      // dont store actual otp
      // encrypt otp and save in db
    })
    .catch((err) => res.status(400).send(err));
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
};
