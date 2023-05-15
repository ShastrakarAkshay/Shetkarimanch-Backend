const router = require("express").Router();
const { getImage } = require("../controller/image.controller");

router.get("/:id", getImage);

module.exports = router;
