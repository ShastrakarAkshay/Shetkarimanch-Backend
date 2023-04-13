const router = require("express").Router();
const { validateUserAndSendOtp, verifyOtpAndRegister } = require("../controller/register.controller");

router.get("/otp/generate/:mobile", validateUserAndSendOtp);
router.get("/user/:otp", verifyOtpAndRegister);

module.exports = router;
