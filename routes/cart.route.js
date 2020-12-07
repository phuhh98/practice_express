const express = require('express');

const router = express.Router();
const controller = require("../controllers/cart.controller.js");

router.get("/:productId", controller.addItemToCart);

module.exports = router;