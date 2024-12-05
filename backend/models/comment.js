const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "comments", timestamps: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = { Comment };
