const router = require("express").Router();
const {
  createBlog,
  fetchAllBlogs,
  fetchBlobById,
  updateBlogById,
  deleteBlogById,
} = require("../controller/blog.controller");

const multer = require("../utils/multer.util");

router.post("/", multer.single("image"), createBlog);
router.get("/list", fetchAllBlogs);
router.get("/:id", fetchBlobById);
router.put("/:id", multer.single("image"), updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
