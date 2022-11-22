const Joi = require("joi");

const EMAIL_RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const authSchema = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RE),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,24}$"))
    .min(6)
    .max(24),
});

module.exports = authSchema;