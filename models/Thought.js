// Require mongoose Schema, helper methos fns to format date, and reaction schema.
const { Schema, model } = require("mongoose");
const { fns } = require("../utils/helpres");
const reactionSchema = require("./Reaction");

//Schema for thought
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) {
          return fns.format(date, "yyyy-MM-dd");
        }
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
