const router = require("express").Router();
const {
  fetchAllUser,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  approveUser,
  rejectUser,
} = require("../controller/user.controller");

// router.post("/", createUser);
router.get("/list", fetchAllUser);
router.get("/:id", fetchUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);

module.exports = router;
