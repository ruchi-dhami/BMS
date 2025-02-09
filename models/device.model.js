const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
    installationDate: {
      type: Date,
      default: Date.now,
    },
    lastMaintenanceDate: {
      type: Date,
      default: Date.now,
    },
    nextMaintenanceDate: {
      type: Date,
      default: Date.now,
    },
    metrics: {
      batteryLevel: {
        type: Number,
      },
      signalStrength: {
        type: Number,
      },
      errorRate: {
        type: Number,
      },
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    },
    suitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suite"
    },
    commonAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommonArea"
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

module.exports = mongoose.model("Device", deviceSchema);
