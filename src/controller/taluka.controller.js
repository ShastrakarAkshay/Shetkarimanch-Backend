const Taluka = require("../models/taluka.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllTaluka = (req, res) => {
  const query = Taluka.find({
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

const fetchTalukaById = (req, res) => {
  Taluka.findById(req.params.id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const createTaluka = (req, res) => {
  const { talukaList } = req.body;
  const payload = talukaList.map((dept) => ({
    talukaName: dept,
    isDeleted: false,
  }));
  Taluka.insertMany(payload)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateTaluka = (req, res) => {
  if (req.body.talukaName) {
    Taluka.findOneAndUpdate(
      { _id: req.params.id },
      { talukaName: req.body.talukaName },
      { new: true },
    )
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

const deleteTaluka = (req, res) => {
  Taluka.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true })
    .then((data) => {
      res.status(200).send(Response.success(Message.TalukaDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

module.exports = {
  fetchAllTaluka,
  fetchTalukaById,
  createTaluka,
  updateTaluka,
  deleteTaluka,
};
