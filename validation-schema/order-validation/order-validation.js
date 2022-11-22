const Joi = require("joi");

const EMAIL_RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const orderSchema = Joi.object({
  email: Joi.string().required().pattern(EMAIL_RE),
  phone: Joi.string().required().min(13).max(13),
  comment: Joi.string().min(0).max(500),
  dateStart: Joi.string().required(),
  dateEnd: Joi.string().required(),
  orderedCar: Joi.object({
    car: Joi.string().required().error(new Error("Required field")),
    totalDays: Joi.number()
      .required()
      .error(new Error("Requred field!"))
      .min(1)
      .error(new Error("Minimum 1 day")),
    totalPrice: Joi.number().required().error(new Error("Requred field!")),
  }).required().error(new Error("Ordered car information is required!")),
});

module.exports = orderSchema;
