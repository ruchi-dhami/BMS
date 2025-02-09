const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    buildingType: {
      type: String,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
        required: true,
      },
      coordinates: {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
      },
    },
    metrics: {
      totalFloors: {
        type: Number,
        required: true,
      },
      totalZones: {
        type: Number,
        required: true,
      },
      occupancyStatus: {
        current: {
          type: Number,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
        },
      },
      energyStatus: {
        currentConsumption: {
          type: Number,
          required: true,
        },
        dailyTotal: {
          type: Number,
          required: true,
        },
        efficiency: {
          type: Number,
          required: true,
        },
      },
      temperature: {
        current: {
          type: Number,
          required: true,
        },
        efficiency: {
          type: Number,
          required: true,
        },
      },
      airQualityStatus: {
        type: String,
        enum: ["good", "moderate", "poor"],
        required: true,
        default: "good",
      },
      airQuality: {
        index: { type: Number },
        satisfaction: { type: Number },
      },
      energyDistribution: {
        hvac: { type: Number },
        lighting: { type: Number },
        equipment: { type: Number },
        other: { type: Number },
      },
      occupancyDistribution: {
        office: { type: Number },
        meeting: { type: Number },
        common: { type: Number },
        other: { type: Number },
      },
    },
    alerts: [
      {
        type: { type: String }, // "occupancy", "energy", "temperature", "airQuality"
        message: { type: String },
        severity: { type: String },
        timestamp: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
    floors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor",
      },
    ],
    system: {
      hvac: {
        status: {
          type: String,
          default: "operational",
        },
        lastMaintenance: {
          type: Date,
        },
        nextMaintenance: {
          type: Date,
        },
      },
      electrical: {
        status: {
          type: String,
          default: "operational",
        },
        lastMaintenance: {
          type: Date,
        },
        nextMaintenance: {
          type: Date,
        },
      },
      plumbing: {
        status: {
          type: String,
          default: "operational",
        },
        lastMaintenance: {
          type: Date,
        },
        nextMaintenance: {
          type: Date,
        },
      },
    },
    systems: [{
      name: { type: String },
      status: { type: String },
      metrics: {
        temperature: { type: Number },
        waterLevel: { type: Number },
        uptime: { type: Number },
        voltage: { type: Number },
      },
    }],
    history: [{
      type: { type: String }, // "energy", "occupancy"
      timestamp: { type: String },
      value: { type: Number },
    }],
    contact: {
      primaryPhone: { type: String, required: true },
      emergencyPhone: { type: String, required: true },
      email: { type: String, required: true },
    },
    emergencyContacts: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        role: {
          type: String,
          enum: ["primary", "security", "maintenance", "other"],
          required: true,
          default: "primary",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Building", buildingSchema);
