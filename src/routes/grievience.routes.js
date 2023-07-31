const router = require("express").Router();
const {
  createGrievience,
  fetchAllGrieviences,
  fetchAllGrievienceByUserId,
  fetchGrievienceById,
  updateGrievienceById,
  deleteGrievienceById,
  fetchAllGrievienceByDeptId,
  fetchAllGrievienceByDeptAndDesig,
} = require("../controller/grievience.controller");

const multer = require("../utils/multer.util");

router.post("/", multer.single("document"), createGrievience);
router.get("/list", fetchAllGrieviences);
router.get("/list/:userId", fetchAllGrievienceByUserId);
router.get("/list/dept/:id", fetchAllGrievienceByDeptId);
router.get("/list/desig/:id", fetchAllGrievienceByDeptAndDesig);
router.get("/:id", fetchGrievienceById);
router.put("/:id", multer.single("document"), updateGrievienceById);
router.delete("/:id", deleteGrievienceById);

module.exports = router;
