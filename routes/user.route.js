"use strict";
const express = require("express");

const controller = require("../controllers/user.controller.js");

const router = express.Router();

router.use(express.static('public'))	//make public folder available

//user-list
router.get("/list", controller.list);

//search users
router.get("/search", controller.search);


//user create
router.get("/create", controller.create);

//push new user
router.post("/create-new-user", controller.postNewUser);

//user's detail - view
router.get("/:id", controller.userDetail);


module.exports = router;