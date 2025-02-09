const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
    area: {
      type: Number,
    },
    metrics: {
      currentOccupancy: {
        type: Number,
      },
      maxOccupancy: {
        type: Number,
      },
      temperature: {
        type: Number,
      },
      humidity: {
        type: Number,
      },
    },
    suitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suite",
      required: true,
    },
    floorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      required: true,
    },
    buildingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Building",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
