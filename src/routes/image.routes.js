const router = require("express").Router();
const { getImage } = require("../controller/image.controller");

router.get("/:name", getImage);

module.exports = router;
