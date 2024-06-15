const jwt = require("jsonwebtoken");
const constants = require("./../constants/constants.json");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, constants.jwtAuth);
    req.admin = decoded.admin;
  } catch (err) {
    return res.status(401).send({ success: false, message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
