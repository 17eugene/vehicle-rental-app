const { Car } = require("../../models");

const updateCar = async (req, res, next) => {
  try {
    const id = req.params.id;

    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });

    if (!car) {
      const error = new Error("Car not exist!");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Updated successfully",
      code: 200,
      car,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateCar;
