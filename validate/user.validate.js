module.exports.postNewUser = function(req, res, next) {
	let errors = {};
	let userInfo = req.body;
	for (let key in userInfo) {
		if (!userInfo[key]) {
			let missingField= key.slice(0,1).toUpperCase() + key.slice(1);
			errors[key] = `${missingField} is required`;
		}
	}

	if (Object.keys(errors).length > 0) {
		res.render("users/create-new-user.pug", {
			errors: errors,
			values: req.body,
		});
		return;
	}
	next();
}