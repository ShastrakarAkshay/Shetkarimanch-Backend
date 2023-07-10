const router = require("express").Router();
const {
  fetchAllDesignation,
  fetchDesignationById,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  fetchDesignationByDept,
} = require("../controller/designation.controller");

router.post("/", createDesignation);
router.get("/list", fetchAllDesignation);
router.get("/list/dept/:id", fetchDesignationByDept);
router.get("/:id", fetchDesignationById);
router.put("/:id", updateDesignation);
router.delete("/:id", deleteDesignation);

module.exports = router;
