const router = require("express").Router();
const {
  validateUserAndSendOTP,
  verifyOtpAndLogin,
} = require("../controller/login.controller");

router.get("/otp/generate/:mobile", validateUserAndSendOTP);
router.get("/otp/validate/:otp", verifyOtpAndLogin);

module.exports = router;
