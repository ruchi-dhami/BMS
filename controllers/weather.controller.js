const axios = require("axios");

const getOutsideWeather = async (req, res) => {
  const { lat, lon } = req.query;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5541e5f9433e803b10a16a888654e95a`;

  try {
    const response = await axios.get(url);

    return res.status(200).json({ status: "success", data:  response.data  });
  } catch (error) {
    console.log("Error fetching weather", error);
    return res.status(500).json({ error: "Error fetching weather" });
  }
};

module.exports = {
  getOutsideWeather,
};
