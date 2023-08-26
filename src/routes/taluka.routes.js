const router = require("express").Router();
const {
  fetchAllTaluka,
  fetchTalukaById,
  createTaluka,
  updateTaluka,
  deleteTaluka,
} = require("../controller/taluka.controller");

router.post("/", createTaluka);
router.get("/list", fetchAllTaluka);
router.get("/:id", fetchTalukaById);
router.put("/:id", updateTaluka);
router.delete("/:id", deleteTaluka);

module.exports = router;
