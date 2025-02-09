const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: "Email is required",
      trim: true,
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
    },
    active: {
      type: Boolean,
      default: 1,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "user"],
      required: true,
      default: "user",
    },
    buildings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
      },
    ],
    suites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suite",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
