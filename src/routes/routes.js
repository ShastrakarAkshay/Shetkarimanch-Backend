const express = require("express");
const { fetchRoles } = require("./roles.routes");
const {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./users.routes");

const router = express.Router();

// default
router.get("/", (req, res) => res.send("Hey, Your API works !!"));

// Roles Routes
router.get("/roles", fetchRoles);

// Users Routes
router.get("/users", fetchUsers);
router.post("/user", createUser);
router.get("/user/:id", fetchUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
