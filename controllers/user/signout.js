const { User } = require("../../models");

const userSignOut = async (req, res, next) => {
  try {
    const id = req.user._id;
    console.log(req.user)

    await User.findByIdAndUpdate(id, { token: null });
    
    res.status(204).json({
      message: "Successfully signed out",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignOut;
