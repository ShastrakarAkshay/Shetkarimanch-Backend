const router = require("express").Router();
const {
  createGrievience,
  fetchAllGrieviences,
  fetchGrievienceById,
  updateGrievienceById,
  deleteGrievienceById,
} = require("../controller/grievience.controller");

const multer = require("../utils/multer.util");

router.post("/", multer.single("document"), createGrievience);
router.get("/list", fetchAllGrieviences);
router.get("/:id", fetchGrievienceById);
router.put("/:id", multer.single("document"), updateGrievienceById);
router.delete("/:id", deleteGrievienceById);

module.exports = router;
