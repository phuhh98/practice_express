const User = require('../models/user.model.js');

module.exports.requireAuth = async function (req, res, next) {

	if (req.originalUrl == "/users/create") { // pass qua khi tro den tao user moi
		next();
		return;
	}

	if (req.signedCookies.userId) {
		let user = await User.findById(req.signedCookies.userId);
		if (user) {
			res.locals.user = user;
			next();
		} else {
			res.clearCookie();
			res.redirect("/auth/login");
			return;
		}
	} else {
		res.redirect("/auth/login");
		return;
	}
}