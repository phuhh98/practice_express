"use strict";
const shortid = require('shortid') //call id generator
const db = require("../db.js");

module.exports.list = function (req, res) {
	// console.log(req);
	res.render("users/user-list.pug", {
		users: db.get("users").value(), 
	});
}

module.exports.search = function(req, res) {
	// console.log(req.query);
	let q = req.query.name;
	let matchedUsers = db.get("users").value().filter(function(value) {
		return value.name.toLowerCase().includes(q.toLowerCase());
	});

	if (matchedUsers.length !== 0) {
		res.render("users/user-list.pug", {
			users: matchedUsers,
		});
	} else {
		res.send("<h2>No such user!?!?!</h2>");
	}	
}

module.exports.create = function (req, res) {
	res.render("users/create-new-user.pug", {
		errors: {},
		values: {}
	});
}

module.exports.postNewUser = function(req, res) {
	let errors = {};
	if (!req.body.name) {
		errors.name = "Name is required";
	}

	if (!req.body.phone) {
		errors.phone = "Phone is required";
	}

	if (errors.name || errors.phone) {
		res.render("users/create-new-user.pug", {
			errors: errors,
			values: req.body,
		});
		return;
	}

	db.get("users").push({name: req.body.name, phone: req.body.phone, id: shortid.generate()}).write();
	res.redirect("/users/list");
}

module.exports.userDetail = function(req, res) {
	let id = req.params.id; 	//assign id with view-button's user-id from .params property (route's parameters) of request __ express
	let user =  db.get("users").value().find(function(curr) {
		return curr.id == id;
	})
	res.render("./users/user-detail.pug", {user: user});
}