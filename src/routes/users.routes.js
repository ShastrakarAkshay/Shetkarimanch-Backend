const User = require("../models/user.model");

const fetchUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const filter = { name: "Jean-Luc Picard" };
  const update = { age: 59 };
  User.findOneAndUpdate(filter, update)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
};

module.exports = { fetchUsers, createUser, updateUser };
