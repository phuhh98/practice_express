"use strict";
const ObjectId = require("mongoose").ObjectId; 
const User = require("../models/user.model.js");
const md5 = require("md5");

module.exports.list = async function (req, res) {
	let userList = await User.find();
	res.locals.lastSearch = req.query.name;
	res.render("users/user-list.pug", {
		users: userList, 
	});
}

module.exports.search = async function(req, res) {
	let q = req.query.name;

	try {
		var userList =  await User.find();
	} catch(err) {
		console.log(err);
	}

	let matchedUsers = userList.filter((user) => {
		return user.name.toLowerCase().includes(q.toLowerCase());
	})
	
	res.locals.lastSearch = q;
	if (matchedUsers.length !== 0) {
		res.render("users/user-list.pug", {
			users: matchedUsers,
		});
	} else {
		res.render("users/user-list.pug", {
			users: {}
		});
	}	
}

module.exports.create = function (req, res) {
	console.log(req);
	res.render("users/create-new-user.pug", {
		errors: {},
		values: {}
	});
}

module.exports.postNewUser = async function(req, res) {
	let user = req.body;
	user.password = md5(req.body.password);
	user.avatar = "";


	if (req.file) {
		user.avatar = req.file.path;		
	}

	try {
		let result = await User.create(user);
	} catch(err) {
		console.log(err);
	}
	
	res.redirect("/users/");
}

module.exports.userDetail = async function(req, res) {
	let id = req.params.id; 	//assign id with view-button's user-id from .params property (route's parameters) of request __ express
	let user =  await User.findById(id);
	res.render("./users/user-detail.pug", {user: user});
}

module.exports.deleteUser = async function (req, res) {
	let id = req.params.id;
	let originUrl = req.headers.referer;
	let user = await User.findById(id);
	try {
		console.log(await User.deleteOne(user));
	} catch(err) {
		console.log(err);
	}
	res.redirect(originUrl);
}