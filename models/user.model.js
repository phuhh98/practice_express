const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	// _id: mongoose.ObjectId, // chi nen khai bao khi muon kiem soat dau vao id (hoac co dung ma hoa)
	name: String,
	phone: String,
	email: String,
	password: String,
	avatar: {
		mimetype: String,
		base64: String,
		size: Number
	}
})

const User = mongoose.model('User', userSchema);

module.exports = User;