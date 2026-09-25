"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var pool = require("./config/db");

var productRoutes = require("./routes/productRoutes");

var authRoutes = require("./routes/authRoutes");

var orderRoutes = require("./routes/orderRoutes");

var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/health", function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("SELECT NOW()"));

        case 3:
          result = _context.sent;
          res.json({
            success: true,
            message: "FeyaTech API is running",
            databaseTime: result.rows[0].now
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("DATABASE ERROR:", _context.t0);
          res.status(500).json({
            success: false,
            message: "Database connection failed"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("FeyaTech API running on port ".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
