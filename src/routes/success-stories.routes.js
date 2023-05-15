const router = require("express").Router();
const {
  fetchAllStories,
  fetchStoryById,
  createStory,
  updateStoryById,
  deleteStoryById,
} = require("../controller/success-story.controller");
const multer = require("../utils/multer.util");

router.post("/", multer.single("image"), createStory);
router.get("/list", fetchAllStories);
router.get("/:id", fetchStoryById);
router.put("/:id", multer.single("image"), updateStoryById);
router.delete("/:id", deleteStoryById);

module.exports = router;
