const router = require("express").Router();
const {
  fetchAllSubject,
  fetchSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  fetchSubjectByDept,
  fetchSubjectByDeptAndDesig,
} = require("../controller/subject.controller");

router.post("/", createSubject);
router.get("/list", fetchAllSubject);
router.get("/list/dept/:id", fetchSubjectByDept);
router.get("/list/desig", fetchSubjectByDeptAndDesig);
router.get("/:id", fetchSubjectById);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
