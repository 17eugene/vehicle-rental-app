const express = require("express");
const router = express.Router();

const { orderCtrls } = require("../../controllers");
const { validation, authentificate } = require("../../middlewares");
const { orderSchema } = require("../../validation-schema");

router.post("/", authentificate, validation(orderSchema), orderCtrls.addOrder);
router.get("/", authentificate, orderCtrls.getUserOrders);

module.exports = router;
