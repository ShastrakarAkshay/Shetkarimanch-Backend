const router = require("express").Router();
const { validateUserExistence } = require("../controller/auth.controller");

router.get("/user/exist/:mobile", validateUserExistence);

module.exports = router;
