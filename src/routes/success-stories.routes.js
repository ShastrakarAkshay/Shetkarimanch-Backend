const router = require("express").Router();
const {
  fetchAllStories,
  fetchStoryById,
  createStory,
  updateStoryById,
  deleteStoryById,
} = require("../controller/success-story.controller");

router.post("/", createStory);
router.get("/list", fetchAllStories);
router.get("/:id", fetchStoryById);
router.put("/:id", updateStoryById);
router.delete("/:id", deleteStoryById);

module.exports = router;
