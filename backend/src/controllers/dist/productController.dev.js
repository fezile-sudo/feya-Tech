"use strict";

var pool = require("../config/db"); // Get all products


var getProducts = function getProducts(req, res) {
  var result;
  return regeneratorRuntime.async(function getProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT\n        p.id,\n        p.title,\n        p.description,\n        p.price,\n        p.stock,\n        p.image_url,\n        c.name AS category\n      FROM products p\n      JOIN categories c\n        ON p.category_id = c.id\n      ORDER BY p.id;\n    "));

        case 3:
          result = _context.sent;
          res.json(result.rows);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("GET PRODUCTS ERROR:", _context.t0);
          res.status(500).json({
            success: false,
            message: "Failed to fetch products"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get one product


var getProductById = function getProductById(req, res) {
  var id, result;
  return regeneratorRuntime.async(function getProductById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT\n        p.id,\n        p.title,\n        p.description,\n        p.price,\n        p.stock,\n        p.image_url,\n        c.name AS category\n      FROM products p\n      JOIN categories c\n        ON p.category_id = c.id\n      WHERE p.id = $1;\n    ", [id]));

        case 4:
          result = _context2.sent;

          if (!(result.rows.length === 0)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Product not found"
          }));

        case 7:
          res.json(result.rows[0]);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error("GET PRODUCT ERROR:", _context2.t0);
          res.status(500).json({
            success: false,
            message: "Failed to fetch product"
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

module.exports = {
  getProducts: getProducts,
  getProductById: getProductById
};
//# sourceMappingURL=productController.dev.js.map
