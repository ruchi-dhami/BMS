const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema(
  {
    floorNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    floorType: {
      type: String,
      enum: ["mixed", "notmixed"],
      required: true,
      default: "mixed",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
    totalArea: {
      type: Number,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Floor", floorSchema);
