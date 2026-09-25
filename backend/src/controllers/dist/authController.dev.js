"use strict";

var pool = require("../config/db");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken"); // Register


var register = function register(req, res) {
  var _req$body, name, email, password, existingUser, passwordHash, result, user, token;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;

          if (!(!name || !email || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Name, email and password are required."
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.query("SELECT id FROM users WHERE email = $1", [email]));

        case 6:
          existingUser = _context.sent;

          if (!(existingUser.rows.length > 0)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            success: false,
            message: "Email already exists."
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 11:
          passwordHash = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(pool.query("\n      INSERT INTO users\n        (name, email, password_hash)\n      VALUES\n        ($1, $2, $3)\n      RETURNING id, name, email, created_at\n      ", [name, email, passwordHash]));

        case 14:
          result = _context.sent;
          user = result.rows[0]; // Create JWT

          token = jwt.sign({
            userId: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          });
          res.status(201).json({
            success: true,
            message: "Registration successful.",
            user: user,
            token: token
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.error("REGISTER ERROR:", _context.t0);
          res.status(500).json({
            success: false,
            message: "Registration failed."
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
}; // Login


var login = function login(req, res) {
  var _req$body2, email, password, result, user, passwordMatch, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Email and password are required."
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(pool.query("\n      SELECT\n        id,\n        name,\n        email,\n        password_hash,\n        created_at\n      FROM users\n      WHERE email = $1\n      ", [email]));

        case 6:
          result = _context2.sent;

          if (!(result.rows.length === 0)) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid email or password."
          }));

        case 9:
          user = result.rows[0]; // Compare password with hash

          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password_hash));

        case 12:
          passwordMatch = _context2.sent;

          if (passwordMatch) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid email or password."
          }));

        case 15:
          // Create JWT
          token = jwt.sign({
            userId: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: "7d"
          }); // Don't send password hash to React

          delete user.password_hash;
          res.json({
            success: true,
            message: "Login successful.",
            user: user,
            token: token
          });
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](1);
          console.error("LOGIN ERROR:", _context2.t0);
          res.status(500).json({
            success: false,
            message: "Login failed."
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

module.exports = {
  register: register,
  login: login
};
//# sourceMappingURL=authController.dev.js.map
