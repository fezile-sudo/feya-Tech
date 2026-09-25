"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pool = require("../config/db"); // Create order


var createOrder = function createOrder(req, res) {
  var client, userId, _req$body, customer_name, customer_email, phone, address, city, province, postal_code, country, payment_method, items, subtotal, orderItems, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, productResult, product, quantity, price, itemTotal, vat, shipping, total, orderNumber, orderResult, order, _i, _orderItems, _item;

  return regeneratorRuntime.async(function createOrder$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pool.connect());

        case 2:
          client = _context.sent;
          _context.prev = 3;
          userId = req.user.userId;
          _req$body = req.body, customer_name = _req$body.customer_name, customer_email = _req$body.customer_email, phone = _req$body.phone, address = _req$body.address, city = _req$body.city, province = _req$body.province, postal_code = _req$body.postal_code, country = _req$body.country, payment_method = _req$body.payment_method, items = _req$body.items;

          if (!(!items || !Array.isArray(items) || items.length === 0)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Order must contain at least one product."
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(client.query("BEGIN"));

        case 10:
          subtotal = 0;
          orderItems = []; // Check products and stock

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 15;
          _iterator = items[Symbol.iterator]();

        case 17:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 37;
            break;
          }

          item = _step.value;
          _context.next = 21;
          return regeneratorRuntime.awrap(client.query("\n        SELECT\n          id,\n          title,\n          price,\n          stock\n        FROM products\n        WHERE id = $1\n        FOR UPDATE\n        ", [item.product_id]));

        case 21:
          productResult = _context.sent;

          if (!(productResult.rows.length === 0)) {
            _context.next = 24;
            break;
          }

          throw new Error("Product ".concat(item.product_id, " not found."));

        case 24:
          product = productResult.rows[0];
          quantity = Number(item.quantity);

          if (!(!Number.isInteger(quantity) || quantity <= 0)) {
            _context.next = 28;
            break;
          }

          throw new Error("Invalid quantity for product ".concat(product.id, "."));

        case 28:
          if (!(product.stock < quantity)) {
            _context.next = 30;
            break;
          }

          throw new Error("Insufficient stock for ".concat(product.title, "."));

        case 30:
          price = Number(product.price);
          itemTotal = price * quantity;
          subtotal += itemTotal;
          orderItems.push({
            product_id: product.id,
            quantity: quantity,
            price: price
          });

        case 34:
          _iteratorNormalCompletion = true;
          _context.next = 17;
          break;

        case 37:
          _context.next = 43;
          break;

        case 39:
          _context.prev = 39;
          _context.t0 = _context["catch"](15);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 43:
          _context.prev = 43;
          _context.prev = 44;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 46:
          _context.prev = 46;

          if (!_didIteratorError) {
            _context.next = 49;
            break;
          }

          throw _iteratorError;

        case 49:
          return _context.finish(46);

        case 50:
          return _context.finish(43);

        case 51:
          // VAT = 15%
          vat = subtotal * 0.15; // Current shipping rule

          shipping = 0;
          total = subtotal + vat + shipping;
          orderNumber = "ORD-".concat(Date.now()); // Create order

          _context.next = 57;
          return regeneratorRuntime.awrap(client.query("\n      INSERT INTO orders (\n        user_id,\n        order_number,\n        customer_name,\n        customer_email,\n        phone,\n        address,\n        city,\n        province,\n        postal_code,\n        country,\n        payment_method,\n        subtotal,\n        shipping,\n        vat,\n        total,\n        status\n      )\n      VALUES (\n        $1,\n        $2,\n        $3,\n        $4,\n        $5,\n        $6,\n        $7,\n        $8,\n        $9,\n        $10,\n        $11,\n        $12,\n        $13,\n        $14,\n        $15,\n        $16\n      )\n      RETURNING *;\n      ", [userId, orderNumber, customer_name, customer_email, phone, address, city, province, postal_code, country, payment_method, subtotal, shipping, vat, total, "pending"]));

        case 57:
          orderResult = _context.sent;
          order = orderResult.rows[0]; // Create order items and reduce stock

          _i = 0, _orderItems = orderItems;

        case 60:
          if (!(_i < _orderItems.length)) {
            _context.next = 69;
            break;
          }

          _item = _orderItems[_i];
          _context.next = 64;
          return regeneratorRuntime.awrap(client.query("\n        INSERT INTO order_items (\n          order_id,\n          product_id,\n          quantity,\n          price\n        )\n        VALUES ($1, $2, $3, $4);\n        ", [order.id, _item.product_id, _item.quantity, _item.price]));

        case 64:
          _context.next = 66;
          return regeneratorRuntime.awrap(client.query("\n        UPDATE products\n        SET stock = stock - $1\n        WHERE id = $2;\n        ", [_item.quantity, _item.product_id]));

        case 66:
          _i++;
          _context.next = 60;
          break;

        case 69:
          _context.next = 71;
          return regeneratorRuntime.awrap(client.query("COMMIT"));

        case 71:
          res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order: order
          });
          _context.next = 80;
          break;

        case 74:
          _context.prev = 74;
          _context.t1 = _context["catch"](3);
          _context.next = 78;
          return regeneratorRuntime.awrap(client.query("ROLLBACK"));

        case 78:
          console.error("CREATE ORDER ERROR:", _context.t1);
          res.status(500).json({
            success: false,
            message: _context.t1.message || "Failed to create order."
          });

        case 80:
          _context.prev = 80;
          client.release();
          return _context.finish(80);

        case 83:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 74, 80, 83], [15, 39, 43, 51], [44,, 46, 50]]);
}; // Get user's orders


var getOrders = function getOrders(req, res) {
  var userId, result;
  return regeneratorRuntime.async(function getOrders$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT *\n      FROM orders\n      WHERE user_id = $1\n      ORDER BY created_at DESC\n      ", [userId]));

        case 4:
          result = _context2.sent;
          res.json({
            success: true,
            orders: result.rows
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("GET ORDERS ERROR:", _context2.t0);
          res.status(500).json({
            success: false,
            message: "Failed to get orders."
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get one user's order


var getOrderById = function getOrderById(req, res) {
  var userId, orderId, orderResult, order, itemsResult;
  return regeneratorRuntime.async(function getOrderById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.userId;
          orderId = Number(req.params.id);

          if (Number.isInteger(orderId)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid order ID."
          }));

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT *\n      FROM orders\n      WHERE id = $1\n      AND user_id = $2\n      ", [orderId, userId]));

        case 7:
          orderResult = _context3.sent;

          if (!(orderResult.rows.length === 0)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Order not found."
          }));

        case 10:
          order = orderResult.rows[0];
          _context3.next = 13;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT\n        order_items.id,\n        order_items.product_id,\n        order_items.quantity,\n        order_items.price,\n        products.title\n      FROM order_items\n      JOIN products\n        ON order_items.product_id = products.id\n      WHERE order_items.order_id = $1\n      ORDER BY order_items.id\n      ", [orderId]));

        case 13:
          itemsResult = _context3.sent;
          res.json({
            success: true,
            order: _objectSpread({}, order, {
              items: itemsResult.rows
            })
          });
          _context3.next = 21;
          break;

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.error("GET ORDER ERROR:", _context3.t0);
          res.status(500).json({
            success: false,
            message: "Failed to get order."
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports = {
  createOrder: createOrder,
  getOrders: getOrders,
  getOrderById: getOrderById
};
//# sourceMappingURL=orderController.dev.js.map
