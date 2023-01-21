const { User, Thought } = require("../models");

module.exports = {
  // Get all users (/api/users)
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single User (/api/users/:id )
  getSingleUser(req, res) {
    console.log(req.params.id);
    User.findOne({ _id: req.params.id })
      .populate({ path: "thoughts" })
      .populate({ path: "friends" })
      // .select("-__v")
      .then((user) => {
        console.log(user);
        return !user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user);
      })
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
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      // .then((user) =>
      //   !user
      //     ? res.status(404).json({ message: "No user with that ID" })
      //     : Thought.deleteMany({ _id: { $in: course.students } })
      // )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateCourse(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with this id!" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
};
