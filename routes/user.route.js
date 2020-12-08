"use strict";
const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

const controller = require("../controllers/user.controller.js");
const validate = require("../validate/user.validate.js");

const router = express.Router();

//user-list
router.get("/", controller.list);

//search users
router.get("/search", controller.search);


//user create
router.get("/create/", controller.create);

//push new user
router.post("/create/", upload.single('avatar'), validate.postNewUser, controller.postNewUser);

//user's detail - view
router.get("/view/:id", controller.userDetail);

//delete use
router.get("/delete/:id", controller.deleteUser);


module.exports = router;