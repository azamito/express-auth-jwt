const Joi = require('joi');

// Validation for Register
const regValid = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  return schema.validate(data);
}


// Validation for Login
const logValid = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  });

  return schema.validate(data);
}

module.exports = { regValid, logValid }