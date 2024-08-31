const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = (req, res, next) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  next();
};

const validateRegistration = (req, res, next) => {
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegistration,
};
