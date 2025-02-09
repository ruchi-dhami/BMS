"use strict";

const directory = require("require-dir");
const path = require("path");

const route = (app) => {
  try {
    const routes = directory(path.join(__dirname, "../routes"));

    for (const routeName in routes) {
      if (routes.hasOwnProperty(routeName)) {
        app.use("/v1", routes[routeName]);
      }
    }

  } catch (error) {
    console.error("Error loading routes: ", error);
  }
};

module.exports = {
  route
};
