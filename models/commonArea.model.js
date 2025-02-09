const mongoose = require("mongoose");

const commanAreaSchema = new mongoose.Schema(
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
    comonType: {
      type: String
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommonArea", commanAreaSchema);
