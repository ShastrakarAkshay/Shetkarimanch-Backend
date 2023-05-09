const path = require("path");
const SuccessStory = require("../models/success-story.model");
const multer = require("../utils/multer.util");
const { CONFIG } = require("../app.config");
const destination = "./uploads";
const imgAPI = "/api/success-story/file";
const baseImgUrl = path.join(__dirname + `../../../${destination}`);

const fetchAllStories = (req, res) => {
  const filters = {};
  if (req.body.filters) {
    const _filters = req.body.filters;
    if (_filters.fromDate && _filters.toDate) {
      filters.createdAt = {
        $gte: new Date(_filters.fromDate),
        $lte: new Date(_filters.toDate),
      };
    }
    if (_filters.taluka) {
      filters["farmerDetails.taluka"] = {
        $eq: _filters.taluka,
      };
    }
  }

  SuccessStory.find(filters)
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
  const fileName = req.file?.filename;
  const data = { ...req.body };
  if (fileName) {
    data.image = {
      url: `${CONFIG.SERVER_URL}${imgAPI}/${fileName}`,
      name: fileName,
    };
  }
  SuccessStory.findOneAndUpdate({ _id: req.params.id }, data, {
    new: true,
  })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid story");
    })
    .catch((err) => res.status(400).send(err));
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
