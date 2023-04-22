const SuccessStory = require("../models/success-story.model");
const multer = require("../utils/multer.util");
const destination = "./uploads/stories";
const path = require("path");
const baseImgUrl = path.join(__dirname + `../../../${destination}`);
const imgAPI = "/api/success-story/file";

const fetchAllStories = (req, res) => {
  SuccessStory.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const createStory = (req, res) => {
  const story = new SuccessStory({
    ...req.body,
    image: `${imgAPI}/${req.file.filename}`,
  });
  story
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const fetchStoryById = (req, res) => {
  SuccessStory.findOne({ _id: req.params.id })
    .then((data) => (data ? res.status(200).send(data) : res.status(400).send("Invalid Story")))
    .catch((err) => res.status(400).send(err));
};

const updateStoryById = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    SuccessStory.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((data) => {
        data ? res.status(200).send(data) : res.status(404).send("Invalid story");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("Bad request");
  }
};

const deleteStoryById = (req, res) => {
  SuccessStory.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount ? res.status(200).send(data) : res.status(404).send("Invalid story");
    })
    .catch((err) => res.status(400).send(err));
};

const getStoryImage = (req, res) => {
  res.sendFile(`${baseImgUrl}/${req.params.image}`);
};

module.exports = {
  fetchAllStories,
  fetchStoryById,
  createStory,
  updateStoryById,
  deleteStoryById,
  getStoryImage,
};
