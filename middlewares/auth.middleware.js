const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.validJWTNeeded = (levels) => (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send({ status: false, data: "Unauthorized" });
      } else {
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
        if (req.jwt && levels.includes(req.jwt.userLevel)) {
          return next();
        } else {
          return res.status(401).json({ status: false, data: "Unauthorized" });
        }
      }
    } catch (err) {
      return res.status(401).send({ status: false, data: "Unauthorized" });
    }
  } else {
    return res.status(401).send({ status: false, data: "Unauthorized" });
  }
};
