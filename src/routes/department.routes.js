const router = require("express").Router();
const {
  fetchAllDepartment,
  fetchDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  fetchDepartmentByTalukaId,
} = require("../controller/department.controller");

router.post("/", createDepartment);
router.get("/list", fetchAllDepartment);
router.get("/:id", fetchDepartmentById);
router.get("/taluka/:id", fetchDepartmentByTalukaId);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
