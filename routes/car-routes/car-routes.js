const express = require("express");
const router = express.Router();

const { carCtrls } = require("../../controllers");
const { carSchema } = require("../../validation-schema");
const { validation } = require("../../middlewares");

router.get("/", carCtrls.getAllCars);
router.post("/", validation(carSchema), carCtrls.addCar);
router.delete("/:id", carCtrls.deleteCar);
router.put("/:id", validation(carSchema), carCtrls.updateCar);

module.exports = router;
