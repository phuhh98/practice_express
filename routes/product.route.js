"use strict";
const express = require("express");

const controller = require("../controllers/product.controller.js");

const router = express.Router();

router.get("/", controller.itemSearch, controller.productPagination, controller.pageRender);

// router.get("/search",  controller.productPagination, controller.pageRender);

module.exports = router;
