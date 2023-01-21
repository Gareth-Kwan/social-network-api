const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateCourse,
  deleteUser,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id
router.route("/:id").get(getSingleUser).put(updateCourse).delete(deleteUser);

module.exports = router;
