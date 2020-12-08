const Image = require("../models/image.model.js");

module.exports.test = async function(req, res, next) {
	let image = await Image.find({description: "none"});  // gui request len mongodb tim anh
	// console.log(Buffer.isBuffer(image[0].data), Buffer.isEncoding("base64"));
	console.log(image[0]);

	let img = {
		data: image[0].data.toString("base64") // chuyen tu buffer sang string co { encoding: "base64"} de
																					//browser co the doc duoc file anh tu dang buffer
	}
	res.locals.image = img;		// set local variable image la object chua buffer da encode sang tring base64
	res.render("test/index.pug")
}