require("dotenv").config();
const mongoose = require('mongoose'); //access to mongodb via mongoose
const fs = require("fs");
const util = require('util');
const db = process.env.MONGODB_URL;

const Product = require("./models/product.model.js"); // model to upload
const connectDB = async () => {
  try {
    await mongoose.connect(db,  {
      // useUnifiedTopology: true,
      // useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const readFile = util.promisify(fs.readFile);  // change fs.readFile from call back to return promise for using async function

const run = async function() {
	await connectDB();
	let products = await readFile("./db.json")		//read stream from file path
	.then( data => JSON.parse(data.toString("ascii")).products )		// return buffer data, encode to ascii charater and parse to object
	.catch( err => console.error(err) );
	await console.log(products);
	for (let product of products) {
		await Product.create(product);			// upload to mongodb
	}

	console.log("Upload product complete");

}
run()

