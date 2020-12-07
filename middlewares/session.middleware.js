const shortid = require('shortid') //call id generator
const db = require("../db.js");
const Session = require("../models/session.model.js");

module.exports.checkSessionId = async function(req, res, next) {

	var sessionId = req.signedCookies.sessionId;
	if (!sessionId) {
		// sessionId = shortid.generate();
		// db.get("sessions").push({id: sessionId, cart: {}}).write();
		let session = await Session.create({ cart: {}});
		console.log(session);
		sessionId = session._id;
		res.cookie("sessionId", session._id, {
			signed: true
		})
	}

	// let session = db.get("sessions")
	// 	.find({ id: sessionId}).value();
	let session = await Session.findById(sessionId);
	let cartCount = 0;
	if (session.cart) {
			for (let product in session.cart) {
				cartCount += parseInt(session.cart[product]) || cartCount;
		}
	}



	res.locals.cartCount = cartCount;
	next();
}