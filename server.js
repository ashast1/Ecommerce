var express = require("express");
var morgan = require("morgan");

var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res){

	var name = "Amit";
	res.json('My Name is ' + name);
});


app.listen(2000, function(err){
	if (err) throw err;
	console.log("Server is running at port 2000");
})