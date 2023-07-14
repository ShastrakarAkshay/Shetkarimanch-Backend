const User = require("../models/user.model");
const { Response, Message } = require("../common/errors.const");

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

// should deprecate
const createUser = (req, res) => {
  // const user = new User(req.body);
  // user
  //   .save()
  //   .then((data) => {
  //     res.status(201).send(data);
  //   })
  //   .catch((err) => res.status(400).send(err));
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

const deleteUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { isDeleted: true },
    { new: true },
  )
    .then((data) => {
      res.status(200).send(Response.success(Message.userDeletedSuccessfully));
    })
    .catch((err) =>
      res.status(400).send(Response.error(Message.somethingWentWrong)),
    );
};

const approveUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { isApproved: true },
    { new: true },
  )
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

const rejectUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { isApproved: false, isRejected: true },
    { new: true },
  )
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(404).send(Response.error(Message.somethingWentWrong));
    })
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  fetchAllUser,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
  rejectUser,
};
