const router = require("express").Router();
const {
  validateUserAndSendOtp,
  verifyOtpAndRegister,
} = require("../controller/register.controller");

router.get("/otp/generate/:mobile", validateUserAndSendOtp);
router.get("/otp/validate/:otp", verifyOtpAndRegister);

module.exports = router;
