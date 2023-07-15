const Designation = require("../models/designation.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllDesignation = (req, res) => {
  const query = Designation.find({
    isDeleted: {
      $eq: false,
    },
  });
  query
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    });
};

const fetchDesignationById = (req, res) => {
  Designation.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const fetchDesignationByDept = (req, res) => {
  Designation.find({ departmentId: req.params.id })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createDesignation = (req, res) => {
  const { designationList } = req.body;
  const payload = designationList.map((item) => ({
    ...item,
    isDeleted: false,
  }));
  Designation.insertMany(payload)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateDesignation = (req, res) => {
  if (req.body) {
    Designation.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((data) => {
        data
          ? res.status(200).send(data)
          : res.status(404).send(Response.error(Message.somethingWentWrong));
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send(Response.error(Message.badRequest));
  }
};

const deleteDesignation = (req, res) => {
  Designation.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
    .then((data) => {
      res
        .status(200)
        .send(Response.success(Message.DesignationDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

module.exports = {
  fetchAllDesignation,
  fetchDesignationById,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  fetchDesignationByDept,
};
