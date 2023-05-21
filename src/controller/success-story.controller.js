const SuccessStory = require("../models/success-story.model");
const multer = require("../utils/multer.util");
const imageController = require("./image.controller");

const fetchAllStories = (req, res) => {
  const filters = {};
  if (req.query.fromDate && req.query.toDate) {
    filters.createdAt = {
      $gte: new Date(req.query.fromDate),
      $lte: new Date(req.query.toDate),
    };
  }
  if (req.query.taluka) {
    filters["farmerDetails.taluka"] = {
      $eq: req.query.taluka,
    };
  }

  SuccessStory.find(filters)
    .limit(req.query?.limit || 0)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const createStory = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = await imageController.saveAndGetImgPayload(req.file);
  }
  const story = new SuccessStory(data);
  story
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      multer.deleteFile(req.file?.filename);
      res.status(400).send(err);
    });
};

const fetchStoryById = (req, res) => {
  SuccessStory.findOne({ _id: req.params.id })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(400).send("Invalid Story");
    })
    .catch((err) => res.status(400).send(err));
};

const updateStoryById = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.image = await imageController.saveAndGetImgPayload(req.file);
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
  SuccessStory.findByIdAndDelete(req.params.id)
    .then((data) => {
      multer.deleteFile(data.image?.name);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  fetchAllStories,
  fetchStoryById,
  createStory,
  updateStoryById,
  deleteStoryById,
};
