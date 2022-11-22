const { Car } = require("../../models");

const addCar = async (req, res, next) => {
  try {
    const car = await Car.create(req.body);

    res.status(201).json({
      status: "Successfully added",
      code: 201,
      car,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addCar;
