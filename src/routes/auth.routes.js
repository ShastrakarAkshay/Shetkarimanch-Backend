const router = require("express").Router();
const {
  validateUserExistence,
  generateOTP,
} = require("../controller/auth.controller");

router.get("/exist/:mobile", validateUserExistence);
router.get("/otp/generate/:mobile", generateOTP);
router.get("/otp/validate/:mobile", generateOTP);

module.exports = router;
