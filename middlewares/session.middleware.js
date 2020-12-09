const Session = require("../models/session.model.js");

module.exports.checkSessionId = async function(req, res, next) {

	try {
		var sessionId = req.signedCookies.sessionId;
		if (!sessionId) {
			let session = await Session.create({ cart: {}});
			// console.log(session);
			sessionId = session._id;
			res.cookie("sessionId", session._id, {
				signed: true
			})
			
		}

		let session = await Session.findById(sessionId);
		let cartCount = 0;
		if (session) {
			if (session.cart) {
					for (let product in session.cart) {
						cartCount += parseInt(session.cart[product]) || cartCount;
				}
			}
		} else {
			res.clearCookie();
			res.redirect(req.originalUrl);
		}


		res.locals.cartCount = cartCount;
	} catch(err) {
		console.error(err);
	}
	next();
}