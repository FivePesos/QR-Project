const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.getOrders);

router.post("/", orderController.createOrder);

router.put("/:id/payment", orderController.updatePayment);

module.exports = router;