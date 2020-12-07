const Product = require("../models/product.model.js");
const Session = require("../models/session.model.js");

module.exports.addItemToCart = async function(req, res, next) {
	// console.log(req);
	let originUrl = req.headers.referer;
	let productId = req.params.productId;
	if (!req.signedCookies.sessionId) {
		res.redirect(originUrl);
		return
	}

	let sessionId = req.signedCookies.sessionId;

	
	// let session = db.get("sessions").find( {id: sessionId} );
	let session = await Session.findById(sessionId);
	let cart = session.cart || {};
	let itemCount = cart[productId];
	if (!itemCount) {
		cart[productId] = 1;
	} else {
		cart[productId] = ++itemCount;
	}
	await Session.update({_id: sessionId}, {cart: cart})
	res.redirect(originUrl);
}