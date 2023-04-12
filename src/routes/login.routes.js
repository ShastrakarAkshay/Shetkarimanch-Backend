const router = require("express").Router();
const { validateUserAndSendOTP, verifyOtpAndLogin } = require("../controller/login.controller");

router.get("/user", verifyOtpAndLogin);
router.get("/otp/generate/:mobile", validateUserAndSendOTP);

module.exports = router;
