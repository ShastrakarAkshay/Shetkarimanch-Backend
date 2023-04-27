const router = require("express").Router();
const upload = require("multer")();

const {
  validateUserAndSendOTP,
  verifyOtpAndLogin,
} = require("../controller/login.controller");

router.get("/otp/generate/:mobile", validateUserAndSendOTP);
router.get("/user", upload.any(), verifyOtpAndLogin);

module.exports = router;
