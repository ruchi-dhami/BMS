const router = require("express").Router();

const userController = require("../controllers/user.controller");

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
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *               buildings:
 *                 type: array
 *                 items:
 *                   type: string
 *               floors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and get JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dhamiruchi5@gmail.com"
 *               password:
 *                 type: string
 *                 example: "core5234"
 *     responses:
 *       200:
 *         description: Successful authentication
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
 *                     token:
 *                       type: string
 *                       example: "JWT_TOKEN"
 */
router.post("/login", userController.login);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           firstName:
 *                             type: string
 *                           lastName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           role:
 *                             type: string
 *                           buildings:
 *                             type: array
 *                             items:
 *                               type: string
 *                           floors:
 *                             type: array
 *                             items:
 *                               type: string
 */
router.get('/users', userController.listUsers );

module.exports = router;
