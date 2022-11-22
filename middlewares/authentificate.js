const { User } = require("../models");
const jwt = require("jsonwebtoken");

const authentificate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      const error = new Error("Signature not exist");
      error.status = 400;
      throw error;
    }

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    try {
      const { id } = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(id);

      if (!user) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }

      if (!user.token) {
        const error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }

      req.user = user;
      next();
    } catch (error) {
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentificate;
