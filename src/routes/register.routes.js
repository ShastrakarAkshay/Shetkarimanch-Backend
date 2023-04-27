const router = require("express").Router();
const upload = require("multer")();

const { validateUserAndSendOtp, verifyOtpAndRegister } = require("../controller/register.controller");

router.get("/otp/generate/:mobile", validateUserAndSendOtp);
router.post("/user/:otp", upload.any(), verifyOtpAndRegister);

module.exports = router;
