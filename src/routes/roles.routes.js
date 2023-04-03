const router = require("express").Router();
const { fetchRoles } = require("../controller/roles.controller");

router.get("/", fetchRoles);

module.exports = router;
