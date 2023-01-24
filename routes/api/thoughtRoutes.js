const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
  getAllReactions,
} = require("../../controllers/thoughtController");

// /api/thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thought/:id
router.route("/:id").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/reaction
router.route("/reaction").get(getAllReactions);

// /api/thought/:thoughtId/reaction
router.route("/:id/reaction").post(createReaction);

// /api/thought/:thoughtId/reactions/reactionId
router.route("/:id/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
