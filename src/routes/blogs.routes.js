const router = require("express").Router();
const {
  createBlog,
  fetchAllBlogs,
  fetchBlobById,
  updateBlogById,
  deleteBlogById,
} = require("../controller/blog.controller");

const multer = require("../utils/multer.util");
const destination = "./uploads/blogs";

router.post("/", multer.single("image", destination), createBlog);
router.get("/list", fetchAllBlogs);
router.get("/:id", fetchBlobById);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
