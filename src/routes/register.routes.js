const router = require("express").Router();
const { validateUserAndSendOtp, verifyOtpAndRegister } = require("../controller/register.controller");

router.get("/user", verifyOtpAndRegister);
router.get("/otp/generate/:mobile", validateUserAndSendOtp);

module.exports = router;
