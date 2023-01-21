const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtController");

// /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thought/:id
router.route("/:id").get(getSingleThought).put(updateThought).delete(deleteThought);

module.exports = router;
