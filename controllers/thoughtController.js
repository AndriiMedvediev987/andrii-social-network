const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      const thoughtObj = {
        thought,
      };

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: new ObjectId(req.params.thoughtId),
      }).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new thought
  async createThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const newID = new ObjectId();
      const data = {
        _id: newID,
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      };

      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: new ObjectId(req.params.thoughtId),
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new ObjectId(req.params.thoughtId) },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //create new reaction
  async createReaction(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      const thought = await Thought.findOneAndUpdate(
        { _id: new ObjectId(req.params.thoughtId) },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new ObjectId(req.params.thoughtId) },
        { $pull: { reactions: req.params.reactionId } },
        { runValidators: true, new: true }
      );

      res.json({ message: "reaction successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
