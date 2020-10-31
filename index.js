const express = require("express");
const app = express();
const port = 5000;

app.get('/', function(req, res) {
	console.log(req);
	res.send("hello");
})

app.listen(port, function() {
	console.log("server listening at port" + port);
})