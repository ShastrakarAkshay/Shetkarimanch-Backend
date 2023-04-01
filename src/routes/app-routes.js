const router = require("express").Router();
const rolesRoutes = require("./roles.routes");
const usersRoutes = require("./users.routes");
const blogsRoutes = require("./blogs.routes");

// default
router.get("/", (req, res) => res.send("Hey, Your API works !!"));

// Roles Routes
router.use("/roles", rolesRoutes);

// Users Routes
router.use("/user", usersRoutes);

// Blogs Rotues
router.use("/blogs", blogsRoutes);

module.exports = router;
