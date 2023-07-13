const router = require("express").Router();
const authRoutes = require("./routes/auth.routes");
const rolesRoutes = require("./routes/roles.routes");
const usersRoutes = require("./routes/users.routes");
const blogsRoutes = require("./routes/blogs.routes");
const successStoryRoutes = require("./routes/success-stories.routes");
const registerRoutes = require("./routes/register.routes");
const loginRoutes = require("./routes/login.routes");
const imageRoutes = require("./routes/image.routes");
const grievienceRoutes = require("./routes/grievience.routes");
const departmentRoutes = require("./routes/department.routes");
const designationRoutes = require("./routes/designation.routes");
const categoryRoutes = require("./routes/category.routes");

// default
router.get("/", (req, res) => res.send("Hey, Your API works !!"));

// Auth
router.use("/auth", authRoutes);

// Register
router.use("/register", registerRoutes);

// Login
router.use("/login", loginRoutes);

// Roles Routes
router.use("/roles", rolesRoutes);

// Users Routes
router.use("/user", usersRoutes);

// Blogs Rotues
router.use("/blog", blogsRoutes);

// Success Stories
router.use("/success-story", successStoryRoutes);

// Images
router.use("/image", imageRoutes);

// Grievience
router.use("/grievience", grievienceRoutes);

// Department
router.use("/department", departmentRoutes);

// Designation
router.use("/designation", designationRoutes);

// Category
router.use("/category", categoryRoutes);

module.exports = router;
