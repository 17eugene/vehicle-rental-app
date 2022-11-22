const { Order } = require("../../models");

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ owner: req.user._id });

    res.status(200).json({
      message: "Success",
      code: 200,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserOrders;
