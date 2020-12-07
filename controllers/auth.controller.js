const md5 =  require("md5"); //sử dụng hàm hash md5 để encode mật khẩu nhập vào

const User = require("../models/user.model.js");


module.exports.login = function(req, res, next) {
	let value = {
		email: res.locals.email || "",
		password: res.locals.password || "",
	}
	res.render("auth/auth.login.pug",{
		errors: {},
		value: value,
	});
}

module.exports.postLogin = async function(req, res, next) {
	let email = req.body.email;
	let password = req.body.password;
	let errors = {};
	let user = await User.findOne({ email: email});

	if (!user) {
		errors.email = "Email does not exist!";
		res.render("auth/auth.login.pug", {
			errors: errors,
			value: req.body,
		})
	} else {
		// console.log(md5(password.toString()), user);
		if (md5(password.toString()) == user.password) {
			res.cookie("userId", user._id, {
				signed: true,
			});
			res.redirect("/users");
		} else {
			errors.password = "Wrong password";
			res.render("auth/auth.login.pug", {
				errors: errors,
				value: req.body,
			})
		}
	}
}