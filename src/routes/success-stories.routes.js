const router = require("express").Router();
const {
  fetchAllStories,
  fetchStoryById,
  createStory,
  updateStoryById,
  deleteStoryById,
  getStoryImage,
} = require("../controller/success-story.controller");
const multer = require("../utils/multer.util");
const destination = "./uploads/stories";

router.post("/", multer.single("image", destination), createStory);
router.get("/list", fetchAllStories);
router.get("/:id", fetchStoryById);
router.put("/:id", multer.single("image", destination), updateStoryById);
router.delete("/:id", deleteStoryById);
router.get("/file/:image", getStoryImage);

module.exports = router;
