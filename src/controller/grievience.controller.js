const Grievience = require("../models/grievience.model");
const multer = require("../utils/multer.util");
const imageController = require("./image.controller");

const fetchAllGrieviences = (req, res) => {
  const { talukaId, departmentId, designationId, subject } = req.query;
  let filters = {};
  if (talukaId) {
    filters.talukaId = { $eq: talukaId };
  }
  if (departmentId) {
    filters.departmentId = { $eq: departmentId };
  }
  if (designationId) {
    filters.designationId = { $eq: designationId };
  }
  if (subject) {
    filters.subject = { $eq: subject };
  }
  Grievience.find(filters)
    .limit(req.query?.limit || 0)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const fetchGrievienceById = (req, res) => {
  Grievience.findOne({ grievienceId: req.params.id })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send("Invalid data");
      }
    })
    .catch((err) => res.status(400).send(err));
};

const createGrievience = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.document = await imageController.saveAndGetImgPayload(req.file);
  }
  data.status = 1;
  const grievience = new Grievience(data);
  grievience
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      multer.deleteFile(req.file?.filename);
      res.status(400).send(err);
    });
};

const updateGrievienceById = async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.document = await imageController.saveAndGetImgPayload(req.file);
  } else {
    delete data.document;
  }
  Grievience.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid blog");
    })
    .catch((err) => res.status(400).send(err));
};

const deleteGrievienceById = (req, res) => {
  Grievience.findByIdAndDelete(req.params.id)
    .then((data) => {
      multer.deleteFile(data.document?.name);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  createGrievience,
  fetchAllGrieviences,
  fetchGrievienceById,
  updateGrievienceById,
  deleteGrievienceById,
};
