// Require mongoose Schema and helper methos fns to format date
const { Schema, Types } = require('mongoose');
const { fns } = require("../utils/helpres");

// Schema for reaction
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;