const User = require("../models/user.model");

const fetchAllUser = (req, res) => {
  const query = User.find();
  query.select("-tokens");
  query
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const fetchUserById = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid user");
    })
    .catch((err) => res.status(400).send(err));
};

const createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      // create jwt token and store in user collection
      // create login session
      res.status(201).send(data);
    })
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const hasData = Object.keys(req.body).length > 0;
  if (hasData) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        data ? res.status(200).send(data) : res.status(404).send("Invalid user");
      })
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(400).send("Bad request");
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount ? res.status(200).send(data) : res.status(404).send("Invalid user");
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
