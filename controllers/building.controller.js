const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const Building = require("../models/building.model");
const Floor = require("../models/floor.model");
const Suite = require("../models/suites.model");
const Room = require("../models/rooms.model");
const Device = require("../models/device.model");
const CommonArea = require("../models/commonArea.model");

const { SUPER_ADMIN, ADMIN } = require("../constants/role");

const createBuilding = async (req, res) => {
  try {
    const { role, id } = req.user;

    if (role !== SUPER_ADMIN)
      return res
        .status(403)
        .json({ error: "Super admin only has access to this API." });

    const buildingData = {
      name: faker.company.name(),
      buildingType: faker.helpers.arrayElement([
        "residential",
        "commercial",
        "mixed",
      ]),
      location: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
      },
      metrics: {
        totalFloors: faker.number.int({ min: 1, max: 10 }),
        totalZones: faker.number.int({ min: 1, max: 5 }),
        occupancyStatus: {
          current: faker.number.int({ min: 0, max: 100 }),
          capacity: 100,
          percentage: faker.number.float({ min: 0, max: 100 }),
        },
        energyStatus: {
          currentConsumption: faker.number.int({ min: 50, max: 500 }),
          dailyTotal: faker.number.int({ min: 1000, max: 5000 }),
          efficiency: faker.number.float({ min: 0, max: 1 }), // Adding efficiency for energy usage
        },
        temperature: {
          current: faker.number.float({ min: 15, max: 30 }), // Temperature in Celsius
          efficiency: faker.number.float({ min: 0, max: 1 }), // Temperature efficiency, e.g., HVAC efficiency
        },
        airQuality: {
          index: faker.number.int({ min: 1, max: 100 }), // Air quality index
          satisfaction: faker.number.float({ min: 0, max: 5 }), // Air quality satisfaction (scale of 1-5)
        },
        energyDistribution: {
          hvac: faker.number.float({ min: 0, max: 1 }), // Energy distribution for HVAC
          lighting: faker.number.float({ min: 0, max: 1 }), // Energy distribution for Lighting
          equipment: faker.number.float({ min: 0, max: 1 }), // Energy distribution for Equipment
          other: faker.number.float({ min: 0, max: 1 }), // Energy distribution for Other usage
        },
        occupancyDistribution: {
          office: faker.number.int({ min: 0, max: 100 }),
          meeting: faker.number.int({ min: 0, max: 100 }),
          common: faker.number.int({ min: 0, max: 100 }),
          other: faker.number.int({ min: 0, max: 100 }),
        },
      },
      alerts: [
        {
          type: "occupancy",
          message: faker.lorem.sentence(),
          severity: faker.helpers.arrayElement(["low", "medium", "high"]),
          timestamp: faker.date.recent().toISOString(),
        },
        {
          type: "energy",
          message: faker.lorem.sentence(),
          severity: faker.helpers.arrayElement(["low", "medium", "high"]),
          timestamp: faker.date.recent().toISOString(),
        },
        {
          type: "temperature",
          message: faker.lorem.sentence(),
          severity: faker.helpers.arrayElement(["low", "medium", "high"]),
          timestamp: faker.date.recent().toISOString(),
        },
        {
          type: "airQuality",
          message: faker.lorem.sentence(),
          severity: faker.helpers.arrayElement(["low", "medium", "high"]),
          timestamp: faker.date.recent().toISOString(),
        },
      ],
      systems: [
        {
          name: "hvac",
          status: faker.helpers.arrayElement(["active", "inactive"]),
          metrics: {
            temperature: faker.number.float({ min: 18, max: 30 }), // Temperature setpoint for HVAC
            uptime: faker.number.float({ min: 0, max: 100 }), // Uptime in percentage
          },
        },
        {
          name: "sprinkler",
          status: faker.helpers.arrayElement(["active", "inactive"]),
          metrics: {
            waterLevel: faker.number.float({ min: 0, max: 100 }), // Percentage of water level
          },
        },
        {
          name: "network",
          status: faker.helpers.arrayElement(["active", "inactive"]),
          metrics: {
            uptime: faker.number.int({ min: 0, max: 100 }), // Uptime in percentage
          },
        },
        {
          name: "power",
          status: faker.helpers.arrayElement(["active", "inactive"]),
          metrics: {
            voltage: faker.number.float({ min: 100, max: 240 }), // Voltage in volts
          },
        },
      ],
      system: {
        hvac: {
          lastMaintenance: faker.date.past(),
          nextMaintenance: faker.date.future(),
        },
        electrical: {
          lastMaintenance: faker.date.past(),
          nextMaintenance: faker.date.future(),
        },
        plumbing: {
          lastMaintenance: faker.date.past(),
          nextMaintenance: faker.date.future(),
        },
      },
      history: [
        {
          type: "energy",
          timestamp: faker.date.past().toISOString(),
          value: faker.number.int({ min: 50, max: 500 }),
        },
        {
          type: "occupancy",
          timestamp: faker.date.past().toISOString(),
          value: faker.number.int({ min: 0, max: 100 }),
        },
      ],
      contact: {
        primaryPhone: faker.phone.number(),
        emergencyPhone: faker.phone.number(),
        email: faker.internet.email(),
      },
      emergencyContacts: Array.from({ length: 2 }).map(() => ({
        name: faker.person.fullName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement([
          "primary",
          "security",
          "maintenance",
          "other",
        ]),
      })),
    };

    const floorsData = Array.from(
      { length: buildingData.metrics.totalFloors },
      (_, index) => ({
        floorNumber: index + 1,
        name: `Floor ${index + 1}`,
        totalArea: faker.number.float({ min: 500, max: 5000 }),
      })
    );
    
    const building = new Building(buildingData);
    const savedBuilding = await building.save();
    console.log("Building created: ", savedBuilding);

    const floorPromises = floorsData.map((floorData) => {
      const floor = new Floor({
        ...floorData,
        buildingId: savedBuilding._id,
      });
      return floor.save();
    });

    const savedFloors = await Promise.all(floorPromises);
    console.log("Floors created: ", savedFloors);

    savedBuilding.floors = savedFloors.map((floor) => floor._id);
    await savedBuilding.save();

    //Create suites
    const suitesPromise = savedFloors.flatMap((floor) => {
      return Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(
        async () => {
          const suite = await Suite.create({
            name: faker.company.name(),
            status: faker.helpers.arrayElement(["empty", "occupied", "other"]),
            suiteType: faker.helpers.arrayElement([
              "residential",
              "commercial",
            ]),
            totalArea: faker.number.float({ min: 500, max: 5000 }),
            buildingId: floor.buildingId,
            floorId: floor._id,
          });
          return suite;
        }
      );
    });
    const suites = await Promise.all(suitesPromise);
    console.log("Suites created: ", suites);

    //create rooms
    const roomPromise = suites.flatMap((suite) => {
      return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(
        async () => {
          const room = await Room.create({
            name: faker.word.noun(),
            area: faker.number.float({ min: 100, max: 500 }),
            metrics: {
              currentOccupancy: faker.number.int({ min: 0, max: 10 }),
              maxOccupancy: faker.number.int({ min: 5, max: 20 }),
              temperature: faker.number.float({ min: 15, max: 30 }),
              humidity: faker.number.float({ min: 30, max: 70 }),
            },
            suitId: suite._id,
            floorId: suite.floorId,
            buildingId: suite.buildingId,
          });
          return room;
        }
      );
    });

    const rooms = await Promise.all(roomPromise);
    console.log("Rooms created: ", rooms);

    // Create Devices
    const devicePromise = rooms.flatMap((room) => {
      return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
        async () => {
          const device = await Device.create({
            name: faker.commerce.productName(),
            manufacturer: faker.company.name(),
            model: faker.string.alphanumeric(8),
            serialNumber: faker.string.alphanumeric(12),
            installationDate: faker.date.past(),
            lastMaintenanceDate: faker.date.past(),
            nextMaintenanceDate: faker.date.future(),
            metrics: {
              batteryLevel: faker.number.int({ min: 10, max: 100 }),
              signalStrength: faker.number.int({ min: 1, max: 5 }),
              errorRate: faker.number.float({ min: 0, max: 0.1 }),
            },
            roomId: room._id,
            suitId: room.suitId,
            floorId: room.floorId,
            buildingId: room.buildingId,
          });
          return device;
        }
      );
    });

    const devices = await Promise.all(devicePromise);

    console.log("Room's Devices created: ", devices);

    // Create Common Areas

    const commonAreaPromise = savedFloors.flatMap((floor) => {
      return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
        async () => {
          const area = await CommonArea.create({
            name: faker.word.noun(),
            status: faker.helpers.arrayElement(["active", "inactive"]),
            commonType: faker.helpers.arrayElement([
              "lobby",
              "gym",
              "cafeteria",
            ]),
            totalArea: faker.number.float({ min: 500, max: 2000 }),
            buildingId: floor.buildingId,
            floorId: floor._id,
          });
          return area;
        }
      );
    });
    const areas = await Promise.all(commonAreaPromise);

    console.log("Common Areas created: ", areas);

    // Create Common Devices
    const commonDevicePromise = areas.flatMap((area) => {
      return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
        async () => {
          const device = await Device.create({
            name: faker.commerce.productName(),
            manufacturer: faker.company.name(),
            model: faker.string.alphanumeric(8),
            serialNumber: faker.string.alphanumeric(12),
            installationDate: faker.date.past(),
            lastMaintenanceDate: faker.date.past(),
            nextMaintenanceDate: faker.date.future(),
            metrics: {
              batteryLevel: faker.number.int({ min: 10, max: 100 }),
              signalStrength: faker.number.int({ min: 1, max: 5 }),
              errorRate: faker.number.float({ min: 0, max: 0.1 }),
            },
            roomId: area._id,
            floorId: area.floorId,
            buildingId: area.buildingId,
          });
          return device;
        }
      );
    });

    const deviceAreas = await Promise.all(commonDevicePromise);
    console.log("Common Area devices created: ", deviceAreas);

    return res.status(200).json({ status: "success", data: { building } });
  } catch (error) {
    console.log("Error creating user", error);
    return res.status(500).json({ error: error.message });
  }
};

const listBuilding = async (req, res) => {
  const { role } = req.user;

  if (role !== SUPER_ADMIN)
    return res
      .status(403)
      .json({ error: "Super admin only has access to this API." });
  try {
    const buildings = await Building.find({})
      .select("name location.address location.coordinates metrics.totalFloors")
      .exec();
    return res.status(200).json({ status: "success", data: { buildings } });
  } catch (error) {
    console.error("Error listings buildings: ", error);
    return res.status(500).json({ error: "error in fetching" });
  }
};

const getBuilding = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;

  if (role !== SUPER_ADMIN && role !== ADMIN)
    return res
      .status(403)
      .json({ error: `Tenant doesn't has access for this API.` });

  try {
    const building = await Building.findOne({ _id: id })
      .select(
        `_id name 
      location.coordinates 
      location.address 
      metrics.totalFloors
      metrics.occupancyStatus
      metrics.energyStatus
      metrics.temperature
      metrics.airQuality
      metrics.energyDistribution
      metrics.occupancyDistribution
      alerts
      systems
      history
      `
      )
      .populate("floors")
      .exec();
    return res.status(200).json({ status: "success", data: { building } });
  } catch (error) {
    console.error("Error listings buildings: ", error);
    return res.status(500).json({ error: "error in fetching" });
  }
};

const getFloorsByBuilding = async (req, res) => {
  try {
    const { id } = req.params;

    const floors = await Floor.aggregate([
      {
        $match: { buildingId: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "devices",
          localField: "_id",
          foreignField: "floorId",
          as: "devices",
        },
      },
      {
        $project: {
          _id: 1,
          floorNumber: 1,
          name: 1,
          floorType: 1,
          status: 1,
          totalArea: 1,
          deviceCount: { $size: "$devices" },
        },
      },
    ]);

    return res.status(200).json({ status: "success", data: { floors } });
  } catch (error) {
    console.error("Error fetching floors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRoomsByFloor = async (req, res) => {
  try {
    const { id } = req.params; // Floor ID from URL

    // Fetch rooms
    const rooms = await Room.find({ floorId: id })
      .select("_id name status metrics area")
      .lean();

    // Fetch Common Areas
    const commonAreas = await CommonArea.find({ floorId: id })
      .select("_id name status comonType totalArea")
      .lean();

    return res.status(200).json({
      status: "success",
      data: {
        rooms,
        commonAreas,
      },
    });
  } catch (error) {
    console.error("Error fetching floor details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDevicesByRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findOne({ _id: id })
      .select("_id name status metrics area")
      .lean();

    if (!room) {
      return res
        .status(404)
        .json({ status: "error", message: "Room not found" });
    }

    const devices = await Device.find({ roomId: id })
      .select(
        `
          _id,
          name
          manufacturer
          model
          serialNumber
          status
          installationDate
          lastMaintenanceDate
          nextMaintenanceDate
          metrics`
      )
      .lean();

    return res.status(200).json({
      status: "success",
      data: {
        room,
        devices,
      },
    });
  } catch (error) {
    console.error("Error fetching devices for the room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDevicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findOne({ _id: id })
      .select(
        `
        _id,
        name
        manufacturer
        model
        serialNumber
        status
        installationDate
        lastMaintenanceDate
        nextMaintenanceDate
        metrics`
      )
      .lean();

    return res.status(200).json({
      status: "success",
      data: {
        device,
      },
    });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBuilding,
  listBuilding,
  getBuilding,
  getFloorsByBuilding,
  getRoomsByFloor,
  getDevicesByRoom,
  getDevicesById,
};
