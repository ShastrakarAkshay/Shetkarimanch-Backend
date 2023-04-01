const router = require("express").Router();
const SuccessStory = require("../models/success-story.model");

const fetchAllStories = (req, res) => {
  SuccessStory.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const createStory = (req, res) => {
  const story = new SuccessStory(req.body);
  story
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const getStoryById = (req, res) => {
  SuccessStory.findOne({ _id: req.params.id })
    .then((data) =>
      data ? res.status(200).send(data) : res.status(400).send("Invalid Story")
    )
    .catch((err) => res.status(400).send(err));
};

const updateStoryById = (req, res) => {
  // dont send request if req.body is invalid
  SuccessStory.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid story");
    })
    .catch((err) => res.status(400).send(err));
};

const deleteStoryById = (req, res) => {
  SuccessStory.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount
        ? res.status(200).send(data)
        : res.status(404).send("Invalid story");
    })
    .catch((err) => res.status(400).send(err));
};

router.post("/", createStory);
router.get("/list", fetchAllStories);
router.get("/:id", getStoryById);
router.put("/:id", updateStoryById);
router.delete("/:id", deleteStoryById);

module.exports = router;
