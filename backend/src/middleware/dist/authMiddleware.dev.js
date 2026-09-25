"use strict";

var jwt = require("jsonwebtoken");

var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required."
    });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

module.exports = authenticateToken;
//# sourceMappingURL=authMiddleware.dev.js.map
