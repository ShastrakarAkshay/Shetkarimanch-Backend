const router = require("express").Router();
const {
  validateUserExistence,
  validateUserSession,
} = require("../controller/auth.controller");

router.get("/user/exist/:mobile", validateUserExistence);

router.get("/validate/session/:userID", validateUserSession);

module.exports = router;
