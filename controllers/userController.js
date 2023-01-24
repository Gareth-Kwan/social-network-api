const { User, Thought } = require("../models");

module.exports = {
  // Get all users (/api/user)
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single User (/api/user/:id )
  getSingleUser(req, res) {
    console.log(req.params.id);
    User.findOne({ _id: req.params.id })
      // .populate("thoughts")
      // .populate("friends")
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Create a user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((user) => {
        console.log(user);
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with this id!" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user (and associated thoughts)
  deleteUser({ params }, res) {
    Thought.deleteMany({ _id: params.id })
      .then(() => {
        User.findOneAndDelete({ _id: params.id }).then((user) => {
          if (!user) {
            res.status(404).json({ message: "No User found with this id!" });
            return;
          }
          res.json(user);
        });
      })
      .catch((err) => res.json(err));
  },

  //------------------Reaction Section-------------

  //Add friend
    addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  //Delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};
