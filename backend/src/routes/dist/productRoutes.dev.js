"use strict";

var express = require("express");

var _require = require("../controllers/productController"),
    getProducts = _require.getProducts,
    getProductById = _require.getProductById;

var router = express.Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
module.exports = router;
//# sourceMappingURL=productRoutes.dev.js.map
