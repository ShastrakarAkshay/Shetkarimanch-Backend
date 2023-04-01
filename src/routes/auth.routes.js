const router = require("express").Router();
const axios = require("axios");
const User = require("../models/user.model");

const validateUserExistence = (req, res) => {
  User.findOne({ mobile: Number(req.params.mobile) })
    .then((data) => {
      data ? res.status(200).send(true) : res.status(404).send(false);
    })
    .catch((err) => res.status(404).send(false));
};

const sendOTP = (req, res) => {
  // http://login.wishbysms.com/api/sendhttp.php?authkey=65497AZmUVzmQVV63f4c90fP1&mobiles=(var2)&message=Dear Farmer, Your Agriculture Grievance projects One Time Verification Code OTP is (var1) thank you POWERED BY MTJF&sender=grAGRO&route=4&country=91&DLT_TE_ID=1307166952390775178
  const mobile = req.params.mobile;
  const URL = `http://login.wishbysms.com/api/sendhttp.php`;
  axios
    .get(URL, {
      params: {
        authkey: "65497AZmUVzmQVV63f4c90fP1",
        mobiles: "9767986750",
        message: "Hello Akshay",
        sender: "grAGRO",
        route: 4,
        country: 91,
        DLT_TE_ID: "1307166952390775178",
      },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

router.get("/:mobile", validateUserExistence);
router.get("/otp/:mobile", sendOTP);

module.exports = router;
