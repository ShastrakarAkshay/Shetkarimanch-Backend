const router = require("express").Router();
const {
  sendOtp,
  verifyOtp,
  registerUser,
} = require("../controller/register.controller");

router.get("/otp/generate/:mobile", sendOtp);
router.get("/otp/validate/:otp", verifyOtp);
router.post("/user", registerUser);

module.exports = router;
