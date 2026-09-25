const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById
} = require("../controllers/orderController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// Create order
router.post("/", authenticateToken, createOrder);


// Get user's orders
router.get("/", authenticateToken, getOrders);


// Get one user's order
router.get( "/:id", authenticateToken, getOrderById);


module.exports = router;
