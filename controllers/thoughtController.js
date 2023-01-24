const { User, Thought } = require("../models");

module.exports = {
  //------------------Thoughts Section-------------
  // Get all thoughts (/api/thought)
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought (/api/thought/:id )
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((thought) => {
  //       res.json(thought);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  // Create a thought
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        // !Thought
        res.status(404).json({ message: "No thought with that ID" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })
      .then((thought) =>
        !thought ? res.status(404).json({ message: "No thought with this id!" }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //------------------Reaction Section-------------

  //Get all reactions
  getAllReactions(req, res) {
    Thought.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    console.log(req.body, req.params);
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        console.log(thought);
        !thought ? res.status(404).json({ message: "No thought found with this id!" }) : res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        console.log(thought);
        if (!thought) {
          return res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
