const router = require("express").Router();
const {
  validateUserExistence,
  sendOTP,
} = require("../controller/auth.controller");

router.get("/:mobile", validateUserExistence);
router.get("/otp/:mobile", sendOTP);

module.exports = router;
