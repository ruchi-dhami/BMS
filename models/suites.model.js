const mongoose = require("mongoose");

const suiteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["empty", "occupied", "other"],
      required: true,
      default: "empty",
    },
    suiteType: {
      type: String,
      enum: ["commercial", "residential"],
    },
    totalArea: {
      type: Number,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
    floorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Suite", suiteSchema);
