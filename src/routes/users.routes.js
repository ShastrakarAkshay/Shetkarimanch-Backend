const User = require("../models/user.model");
const router = require("express").Router();

const fetchUsers = (req, res) => {
  User.find()
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
      data ? res.status(200).send(data) : res.status(404).send("Invalid user.");
    })
    .catch((err) => res.status(400).send(err));
};

const createUser = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((data) => {
      data ? res.status(200).send(data) : res.status(404).send("Invalid user.");
    })
    .catch((err) => res.status(400).send(err));
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      data && data.deletedCount
        ? res.status(200).send(data)
        : res.status(404).send("Invalid user.");
    })
    .catch((err) => res.status(400).send(err));
};

router.post("/", createUser);
router.get("/list", fetchUsers);
router.get("/:id", fetchUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
