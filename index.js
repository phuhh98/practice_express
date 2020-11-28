"use strict";
const express = require("express");	//call express package
const bodyParser = require('body-parser');	//call body-parser package to translate client request (readability)

const port = 8000;	//server port
const app = express(); //create express app instance
const userRouter = require("./routes/user.route.js");

app.use(bodyParser.urlencoded({ extended: false }));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json

app.set("view engine", "pug");	//define view engine for rendering
app.set("views", "./views");	//define view folder

app.use("/users", userRouter); //use router for /users/

app.use(express.static('public'))	//make public folder available

//homepage
app.get('/', function(req, res) {
	res.render("index.pug");	//send response to client as rendered by view pug
})


//start app and listen at port's value
app.listen(port,function() {
	console.log("Server is ready at ", port)
});