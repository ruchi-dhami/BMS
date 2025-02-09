const router = require("express").Router();

const buildingController = require("../controllers/building.controller");


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: Bearer
 *       bearerFormat: JWT
 *   security:
 *     - bearerAuth: [] 
 * /buildings:
 *   post:
 *     summary: Create a new building (Super Admin only)
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Building successfully created
 */

router.post("/buildings", buildingController.createBuilding);

/**
 * @swagger
 * /buildings:
 *   get:
 *     summary: Get all buildings (Super Admin only)
 *     security:
 *       - bearerAuth: []  
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: List of buildings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     buildings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           location:
 *                             type: object
 *                             properties:
 *                               address:
 *                                 type: string
 *                               coordinates:
 *                                 type: object
 *                                 properties:
 *                                   latitude:
 *                                     type: number
 *                                   longitude:
 *                                     type: number
 *                           metrics:
 *                             type: object
 *                             properties:
 *                               totalFloors:
 *                                 type: number
 */
router.get("/buildings", buildingController.listBuilding);



/**
 * @swagger
 * /buildings/{id}:
 *   get:
 *     description: Get details of a building by ID.
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved building details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     building:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "679a406cd104cb959d94b42c"
 *                         name:
 *                           type: string
 *                           example: "Nitzsche - Oberbrunner"
 *                         location:
 *                           type: object
 *                           properties:
 *                             coordinates:
 *                               type: object
 *                               properties:
 *                                 latitude:
 *                                   type: number
 *                                   example: 69.1357
 *                                 longitude:
 *                                   type: number
 *                                   example: -42.8275
 *                             address:
 *                               type: string
 *                               example: "25009 Araceli Plains"
 *                         alerts:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               type:
 *                                 type: string
 *                                 example: "occupancy"
 *                               message:
 *                                 type: string
 *                                 example: "Turpis adhaero delibero nemo omnis confugo."
 *                               severity:
 *                                 type: string
 *                                 example: "low"
 *                               timestamp:
 *                                 type: string
 *                                 format: date-time
 *                                 example: "2025-01-28T16:34:14.215Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Building not found
 */
router.get("/buildings/:id", buildingController.getBuilding)


/**
 * @swagger
 * /buildings/{id}/floors:
 *   get:
 *     summary: Get floors by building ID
 *     description: Get the list of floors for a specific building.
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the building
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved list of floors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     floors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "679a406cd104cb959d94b43a"
 *                           floorNumber:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Floor 1"
 *                           totalArea:
 *                             type: number
 *                             example: 2559.4069
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Building not found
 */
router.get("/buildings/:id/floors", buildingController.getFloorsByBuilding)

/**
 * @swagger
 * /floors/{id}/rooms:
 *   get:
 *     summary: Get room details for a specific floor
 *     description: Retrieve a list of rooms for a given floor.
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the floor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved room details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rooms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "679a406cd104cb959d94b45f"
 *                           name:
 *                             type: string
 *                             example: "quit"
 *                           status:
 *                             type: string
 *                             example: "active"
 *                           area:
 *                             type: number
 *                             example: 206.73
 *                           metrics:
 *                             type: object
 *                             properties:
 *                               currentOccupancy:
 *                                 type: integer
 *                                 example: 8
 *                               maxOccupancy:
 *                                 type: integer
 *                                 example: 11
 *                               temperature:
 *                                 type: number
 *                                 example: 26.02
 *                               humidity:
 *                                 type: number
 *                                 example: 50.13
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Floor not found
 */
router.get("/floors/:id/rooms", buildingController.getRoomsByFloor)

/**
 * @swagger
 * /rooms/{id}/devices:
 *   get:
 *     summary: "Get Devices by Room ID"
 *     description: "Fetches all devices associated with a specific room by room ID."
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "ID of the room"
 *         required: true
 *         schema:
 *           type: string
 *           example: "6797a14d7dd7527fd2baa1d2"
 *     responses:
 *       200:
 *         description: "Successfully retrieved devices for the room."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     room:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "679a406cd104cb959d94b45f"
 *                         name:
 *                           type: string
 *                           example: "quit"
 *                         status:
 *                           type: string
 *                           example: "active"
 *                         area:
 *                           type: number
 *                           example: 206.7320571908466
 *                         metrics:
 *                           type: object
 *                           properties:
 *                             currentOccupancy:
 *                               type: integer
 *                               example: 8
 *                             maxOccupancy:
 *                               type: integer
 *                               example: 11
 *                             temperature:
 *                               type: number
 *                               example: 26.017526626405612
 *                             humidity:
 *                               type: number
 *                               example: 50.12775545683258
 *                     devices:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "679a406dd104cb959d94b4af"
 *                           name:
 *                             type: string
 *                             example: "Awesome Metal Salad"
 *                           manufacturer:
 *                             type: string
 *                             example: "Robel LLC"
 *                           model:
 *                             type: string
 *                             example: "KHx8T98S"
 *                           serialNumber:
 *                             type: string
 *                             example: "aGQzE9ceOuCX"
 *                           status:
 *                             type: string
 *                             example: "active"
 *                           installationDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-13T19:50:49.786Z"
 *                           lastMaintenanceDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-09-05T08:41:16.962Z"
 *                           nextMaintenanceDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-09-29T19:26:56.488Z"
 *                           metrics:
 *                             type: object
 *                             properties:
 *                               batteryLevel:
 *                                 type: integer
 *                                 example: 73
 *                               signalStrength:
 *                                 type: integer
 *                                 example: 2
 *                               errorRate:
 *                                 type: number
 *                                 format: float
 *                                 example: 0.027953660590854437
 */
router.get("/rooms/:id/devices", buildingController.getDevicesByRoom)

/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: "Get Device Details"
 *     description: "Retrieve detailed information about a device."
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         description: "ID of the device"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Details of the specified device"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     device:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "679a406dd104cb959d94b4af"
 *                         name:
 *                           type: string
 *                           example: "Awesome Metal Salad"
 *                         manufacturer:
 *                           type: string
 *                           example: "Robel LLC"
 *                         model:
 *                           type: string
 *                           example: "KHx8T98S"
 *                         serialNumber:
 *                           type: string
 *                           example: "aGQzE9ceOuCX"
 *                         status:
 *                           type: string
 *                           example: "active"
 *                         installationDate:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-11-13T19:50:49.786Z"
 *                         lastMaintenanceDate:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-09-05T08:41:16.962Z"
 *                         nextMaintenanceDate:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-09-29T19:26:56.488Z"
 *                         metrics:
 *                           type: object
 *                           properties:
 *                             batteryLevel:
 *                               type: integer
 *                               example: 73
 *                             signalStrength:
 *                               type: integer
 *                               example: 2
 *                             errorRate:
 *                               type: number
 *                               format: float
 *                               example: 0.027953660590854437
 */
router.get("/devices/:id", buildingController.getDevicesById)

module.exports = router;
