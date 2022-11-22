const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },

    email: {
      type: String,
      required: [true, "E-mail address is required!"],
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
