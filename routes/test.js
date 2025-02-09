const router = require("express").Router();

const testController = require("../controllers/test.controller");

router.get("/tests", testController.getTestData);

module.exports = router;
