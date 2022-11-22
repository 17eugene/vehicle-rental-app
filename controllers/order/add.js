const { Order } = require("../../models");

const addOrder = async (req, res, next) => {
  try {
    const order = await Order.create({ ...req.body, owner: req.user._id });

    res.status(201).json({
      message: "Successfully added",
      code: 201,
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addOrder;
