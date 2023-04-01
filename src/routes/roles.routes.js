const Roles = require("../models/roles.model");
const router = require("express").Router();

const fetchRoles = (req, res) => {
  Roles.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

router.get("/", fetchRoles);

module.exports = router;
