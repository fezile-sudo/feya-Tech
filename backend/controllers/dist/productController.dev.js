"use strict";

var pool = require("../config/db");

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
};

module.exports = {
  getProducts: getProducts
};
//# sourceMappingURL=productController.dev.js.map
