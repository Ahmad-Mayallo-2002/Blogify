const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { collection: "posts", timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = { Post };
