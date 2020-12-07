const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	// _id: mongoose.ObjectId, // phai dat dung kieu ObjectId tren MongoDB hay dat mongoose.ObjectId de mongoose dich qua ObjectId cua MongoDB
	cart: {}
})

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;