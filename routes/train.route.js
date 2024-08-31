const locationController = require("../controllers/train.controller");

module.exports = (router, validate, middleware) => {
  router.get(
    "/getAll",
    middleware.validJWTNeeded(["user"]),
    locationController.getTrainLocation
  );

  router.get(
    "/",
    middleware.validJWTNeeded(["user"]),
    locationController.getTrainLocationById
  );

  router.get("/trainList", locationController.getTrainsList);

  return router;
};
