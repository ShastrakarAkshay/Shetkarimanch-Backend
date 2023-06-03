const User = require("../models/user.model");

const validateUserExistence = (req, res) => {
  User.findOne({ mobile: Number(req.params.mobile) })
    .then((data) => {
      data ? res.status(200).send(true) : res.status(404).send(false);
    })
    .catch(() => res.status(404).send(false));
};

const validateUserSession = async (req, res) => {
  const userID = req.params.userID;
  try {
    const user = await User.findById(userID);
    if (user) {
      const token = await user.verifyAuthToken();
      res.status(200).send(token ? true : false);
    } else {
      res.status(200).send(false);
    }
  } catch (err) {
    res.status(200).send(false);
  }
};

module.exports = {
  validateUserExistence,
  validateUserSession,
};
