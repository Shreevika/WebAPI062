const userControllers = require("../controllers/user.controller");

module.exports = (router, validate, middleware) => {
  router.post(
    "/register",
    validate.validateRegistration,
    userControllers.register
  );

  router.post("/login", validate.validateLogin, userControllers.login);

  return router;
};
