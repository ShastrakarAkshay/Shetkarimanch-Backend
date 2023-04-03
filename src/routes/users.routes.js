const router = require("express").Router();
const {
  fetchAllUser,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.post("/", createUser);
router.get("/list", fetchAllUser);
router.get("/:id", fetchUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
