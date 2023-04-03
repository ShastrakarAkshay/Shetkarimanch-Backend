const router = require("express").Router();
const authRoutes = require("./auth.routes");
const rolesRoutes = require("./roles.routes");
const usersRoutes = require("./users.routes");
const blogsRoutes = require("./blogs.routes");
const successStoryRoutes = require("./success-stories.routes");

// default
router.get("/", (req, res) => res.send("Hey, Your API works !!"));

// Auth
router.use("/auth", authRoutes);

// Roles Routes
router.use("/roles", rolesRoutes);

// Users Routes
router.use("/user", usersRoutes);

// Blogs Rotues
router.use("/blog", blogsRoutes);

// Success Stories
router.use("/success-story", successStoryRoutes);

module.exports = router;
