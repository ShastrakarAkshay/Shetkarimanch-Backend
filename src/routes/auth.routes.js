const router = require("express").Router();
const {
  validateUserExistence,
  sendOtp,
  verifyOtp,
  registerUser,
} = require("../controller/auth.controller");

router.get("/user/exist/:mobile", validateUserExistence);
router.get("/register/otp/generate/:mobile", sendOtp);
router.get("/register/otp/validate/:otp", verifyOtp);
router.post("/register/user", registerUser);

module.exports = router;
