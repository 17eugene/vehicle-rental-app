const Joi = require("joi");

const carSchema = Joi.object({
  brand: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  model: Joi.string().required(),
  year: Joi.string()
    .required()
    .pattern(/^[0-9]+$/),
  engineDisplacement: Joi.string(),
  transmission: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
  fuel: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .min(1)
    .max(25),
  vehicleClass: Joi.string().required(),
  bodyType: Joi.string().required(),
  price: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  imageURL: Joi.string().required(),
});

module.exports = carSchema;
