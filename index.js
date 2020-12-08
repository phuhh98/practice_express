"use strict";
require("dotenv").config(); // require dotenv module to call in .env file to set process.env variables
const express = require("express");	//call express package
const bodyParser = require('body-parser');	//call body-parser package to translate client request (readability)
const cookieParser = require('cookie-parser'); // call cookie-parser package to read cookie
const mongoose = require('mongoose'); //access to mongodb via mongoose
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
mongoose.set('debug', true);

const port = 5000;
const app = express(); //create express app instance

const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js");
const authRouter = require("./routes/auth.route.js");
const cartRouter = require("./routes/cart.route.js");
const apiProductRouter = require("./api/routes/product.route.js");	//call product api router in ./api/routes

const authMiddleware = require("./middlewares/auth.middleware.js");
const sessionMiddleware = require("./middlewares/session.middleware.js");

app.use(bodyParser.urlencoded({ extended: false }));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json
app.use(cookieParser(process.env.SESSION_SECRET));	//using environment variable SESSION_SECRET as sign secret key of cookie
app.use(sessionMiddleware.checkSessionId);

app.set("view engine", "pug");	//define view engine for rendering
app.set("views", "./views");	//define view folder

app.use("/auth", authRouter); // authenticator
app.use("/users", authMiddleware.requireAuth, userRouter); //use router for /users/
app.use("/products", authMiddleware.requireAuth, productRouter);
app.use("/cart", cartRouter);
app.use("/api/products", apiProductRouter);

app.use("/public", express.static('public'));	//make public folder available
app.use("/uploads", express.static('uploads'));	//make public folder available


//homepage
app.get('/', function(req, res) {
	res.render("index.pug");	//send response to client as rendered by view pug
})


//start app and listen at port's value
const server = app.listen(port,function() {				//set server = ... initialize server object.
	console.log("Server is ready at port", port)
});


// test receiving process signal from -- kill -s SIGTERM pid from terminal
// use __ pidof processName __ to find its process id
process.on("SIGTERM", function () {
	server.close(() => {
		console.log("Process terminate");
	})
})