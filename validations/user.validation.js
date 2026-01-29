const Joi = require('joi');

const registerSchema = Joi.object({
  nickname: Joi.string()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .max(150)
    .required(),

  password: Joi.string()
    .min(8)
    .max(50)
    .required(),

  phone: Joi.string()
    .max(20)
    .optional()
    .allow(null, '')
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()
});

module.exports = {
  registerSchema,
  loginSchema
};
