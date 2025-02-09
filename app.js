require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 8080;

const logger = require("./middleware/winston");

const routeModule = require("./helpers/routes");
const setupSwagger = require("./helpers/swagger");

const userController = require("./controllers/user.controller");

// mongoDB connection
try {
  mongoose.connect(process.env.MONGOOSE_URL);
  logger.info("Connected to MongoDB");
} catch (error) {
  logger.error("Error connecting to MongoDB", error);
}

// // Allow all origins
// const corsOptions = {
//   origin: "*",
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
//   optionsSuccessStatus: 204,
// };

const registerCoreMiddleware = () => {
  try {
    app.use(
      session({
        secret: "1234",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
          httpOnly: true,
        },
      })
    );

    app.use(morgan("combined", { stream: logger.stream }));
    // Enable CORS dynamically for any origin
    app.use(
      cors({
        origin: function (origin, callback) {
          callback(null, true);
        },
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true, 
      })
    );

    // Enable preflight requests (for OPTIONS)
    app.options("*", cors());
    setupSwagger(app);

    app.use(helmet());
    app.use(express.json());

    // Redirect root URL to Swagger API docs
    app.get("/", (req, res) => {
      res.redirect("/api-docs");
    });

    app.use(require("./helpers/auth"));

    routeModule.route(app);

    userController.createSuperAdmin();
  } catch (error) {
    logger.error(
      "Error thrown while executing registerCoreMiddleware" +
        JSON.stringify(error, undefined, 2)
    );
  }
};

// handling uncaught exceptions
const handleError = () => {
  // 'process' is a built in object in NodeJS
  // if uncaught exception, then execute this
  // note that we can catch uncaught exceptions from the process object
  process.on("uncaughtException", (err) => {
    logger.error(`UNCAUGHT_EXCEPTION OCCURED : ${JSON.stringify(err.stack)}`);
  });
};

(() => {
  try {
    // register core application level middlewared
    registerCoreMiddleware();

    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on PORT: ${PORT}`);
    });

    handleError();
  } catch (error) {
    logger.error(
      `startup :: Error while booting the application ${JSON.stringify(
        error,
        undefined,
        2
      )}`
    );
    throw error;
  }
})();
module.exports = app; // Export only the Express app
