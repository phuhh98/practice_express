const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	// _id: mongoose.ObjectId, // chi nen khai bao khi kiem soat id dau vao
	description: String,
	image: String,
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;