const User = require("../models/user.model");
const { Response, Message } = require("../common/errors.const");

const fetchAllUser = (req, res) => {
  const query = User.find();
  query.select("-tokens");
  query
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(Response.error(Message.somethingWentWrong));
    });
};

const fetchUserById = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send(Response.error(Message.userDoesNotExists));
    })
    .catch((err) => res.status(400).send(err));
};

// should deprecate
const createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        data ? res.status(200).send(data) : res.status(404).send(Response.error(Message.somethingWentWrong));
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send(Response.error(Message.badRequest));
  }
};

const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  fetchAllUser,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
};
