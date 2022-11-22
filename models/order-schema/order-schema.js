const { model, Schema } = require("mongoose");

const bookedCarSchema = Schema(
  {
    car: {
      type: String,
      required: [true, "The car require in the order"],
    },

    totalDays: {
      type: Number,
      required: [true, "Total days value is required"],
      minlength: [1, "Minimum value is 1"],
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
  },
  { _id: false }
);

const orderSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    comment: {
      type: String,
    },

    dateStart: {
      type: String,
      required: [true, "Start date is required"],
    },

    dateEnd: {
      type: String,
      required: [true, "End date is required"],
    },

    orderedCar: bookedCarSchema,

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
