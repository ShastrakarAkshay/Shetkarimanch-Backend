const User = require("../models/user.model");

const validateUserExistence = (req, res) => {
  User.findOne({ mobile: Number(req.params.mobile) })
    .then((data) => {
      data ? res.status(200).send(true) : res.status(404).send(false);
    })
    .catch(() => res.status(404).send(false));
};

module.exports = {
  validateUserExistence,
};
