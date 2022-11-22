const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const error = new Error("User already exist!");
      error.status = 409;
      throw error;
    }

    const newUser = new User({
      email,
      name,
    });

    if (email === "admin@gmail.com") {
      newUser.role = "ADMIN";
    } else {
      newUser.role = "USER";
    }

    newUser.setPassword(password);
    await newUser.save();

    const payload = {
      id: newUser._id,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_KEY);

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      message: "Successfully created",
      code: 201,
      userData: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
        token
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = userSignUp;
