const router = require("express").Router();
const {
  fetchAllCategory,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");

router.post("/", createCategory);
router.get("/list", fetchAllCategory);
router.get("/:id", fetchCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
