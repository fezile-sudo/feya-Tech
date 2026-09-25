"use strict";

var express = require("express");

var _require = require("../controllers/orderController"),
    createOrder = _require.createOrder,
    getOrders = _require.getOrders,
    getOrderById = _require.getOrderById;

var authenticateToken = require("../middleware/authMiddleware");

var router = express.Router(); // Create order

router.post("/", authenticateToken, createOrder); // Get user's orders

router.get("/", authenticateToken, getOrders); // Get one user's order

router.get("/:id", authenticateToken, getOrderById);
module.exports = router;
//# sourceMappingURL=orderRoutes.dev.js.map
