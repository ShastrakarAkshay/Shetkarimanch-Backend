const User = require("../models/user.model");
const { Response, Message } = require("../common/errors.const");
const { USER_STATUS } = require("../common/common.const");

const fetchAllUser = (req, res) => {
  let filters = {};
  if (req.query.roleId) {
    filters.roleId = {
      $in: req.query.roleId,
    };
  }
  User.find(filters)
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
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.userDoesNotExists));
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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

const updateStatus = (req, res, status) => {
  User.findOneAndUpdate({ _id: req.params.id }, { status }, { new: true })
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const deleteUser = (req, res) => {
  updateStatus(req, res, USER_STATUS.Deteted);
};

const approveUser = (req, res) => {
  updateStatus(req, res, USER_STATUS.Approved);
};

const rejectUser = (req, res) => {
  updateStatus(req, res, USER_STATUS.Rejected);
};

module.exports = {
  fetchAllUser,
  fetchUserById,
  updateUser,
  deleteUser,
  approveUser,
  rejectUser,
};
