const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const userSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      const error = new Error("Invalid user data!");
      error.status = 401;
      throw error;
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(202).json({
      message: "Successfully logged in",
      code: 202,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignIn;
