const router = require("express").Router();
const {
  validateUserExistence,
  generateOTP,
  registerUser,
} = require("../controller/auth.controller");

router.get("/exist/:mobile", validateUserExistence);
router.get("/otp/generate/:mobile", generateOTP);
router.get("/otp/validate/:mobile", generateOTP);
router.get("/register/user", registerUser);

module.exports = router;
