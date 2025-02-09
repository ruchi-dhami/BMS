const jwt = require("jsonwebtoken");

const { unauthorized } = require("../constants/statusCodes");

const whiteListedUrl = ["/v1/login"];

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (whiteListedUrl.includes(req.path)) {
      return next();
    }

    // Ensure the Authorization header exists
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(unauthorized)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();

  } catch (error) {
    return res.status(unauthorized).json({ message: "Invalid token" });
  }

};

module.exports = verifyToken;
