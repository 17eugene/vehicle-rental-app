const { Car } = require("../../models");

const deleteCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Car.findByIdAndRemove(id);

    if (!car) {
      const error = new Error("Car not exist!");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Successfully deleted",
      code: 200,
      car,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteCar;
