const userRoutes = require("./user.route");
const locationRoutes = require("./train.route");

module.exports = [
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/train",
    router: locationRoutes,
  },
];
