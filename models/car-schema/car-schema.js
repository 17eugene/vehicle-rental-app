const { Schema, model } = require("mongoose");

const carSchema = Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand name is required!"],
    },

    model: {
      type: String,
      required: [true, "Model name is required!"],
    },

    year: {
      type: String,
      required: [true, "Year of production is required!"],
    },

    engineDisplacement: {
      type: String,
    },

    transmission: {
      type: String,
      required: [true, "Transmission type is required!"],
    },

    fuel: {
      type: String,
      required: [true, "Fuel type is required!"],
    },

    vehicleClass: {
      type: String,
      required: [true, "Class is required!"],
    },

    bodyType: {
      type: String,
      required: [true, "Body type is required!"]
    },

    price: {
      type: String,
      required: [true, "Price is required!"]
    },

    imageURL: {
      type: String,
      required: [true, "Image URl is required!"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Car = model("Car", carSchema);

module.exports = Car;
