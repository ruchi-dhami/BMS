const router = require("express").Router();

const weatherController = require("../controllers/weather.controller");


router.get('/weathers', weatherController.getOutsideWeather );

module.exports = router;
