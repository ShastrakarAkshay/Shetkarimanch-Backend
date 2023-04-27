const path = require("path");
const SuccessStory = require("../models/success-story.model");
const multer = require("../utils/multer.util");
const { CONFIG } = require("../app.config");
const destination = "./uploads/stories";
const imgAPI = "/api/success-story/file";
const baseImgUrl = path.join(__dirname + `../../../${destination}`);

const fetchAllStories = (req, res) => {
  SuccessStory.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

const createStory = (req, res) => {
  const fileName = req.file?.filename;
  const data = { ...req.body };
  if (fileName) {
    data.image = {
      url: `${CONFIG.SERVER_URL}${imgAPI}/${fileName}`,
      name: fileName,
    };
  }
  const story = new SuccessStory(data);
  story
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      multer.deleteFile(destination, fileName);
      res.status(400).send(err);
    });
};

const fetchStoryById = (req, res) => {
  SuccessStory.findOne({ _id: req.params.id })
    .then((data) =>
      data ? res.status(200).send(data) : res.status(400).send("Invalid Story"),
    )
    .catch((err) => res.status(400).send(err));
};

const updateStoryById = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    SuccessStory.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send("Invalid story");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("Bad request");
  }
};

const deleteStoryById = (req, res) => {
  SuccessStory.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      multer.deleteFile(destination, data.image.name);
      res.status(200).send(data);
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
