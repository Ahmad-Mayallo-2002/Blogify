const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      default: "admin",
      enum: ["user", "admin"],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

const User = model("User", UserSchema);

module.exports = { User };
