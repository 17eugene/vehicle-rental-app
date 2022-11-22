const { Car } = require("../../models");

const getAllCars = async (_, res, next) => {
  try {
    const cars = await Car.find({});

    res.status(200).json({
      message: "Success",
      code: 200,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllCars;
