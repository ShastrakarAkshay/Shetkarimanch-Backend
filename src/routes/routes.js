const express = require("express");
const bodyParser = require("body-parser");
const { fetchRoles } = require("./roles.routes");
const { fetchUsers, createUser, updateUser } = require("./users.routes");

const router = express.Router();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// default
router.get("/", (req, res) => res.send("Successfully listening requests."));

// Roles Routes
router.get("/roles", fetchRoles);

// Users Routes
router.get("/users", fetchUsers);
router.post("/user", jsonParser, createUser);
router.put("/user", updateUser);

module.exports = router;
