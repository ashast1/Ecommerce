var express = require("express");
var morgan = require("morgan");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jade = require('jade');
var session = require('express-session');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');


var User = require('./models/user');


mongoose.connect('mongodb://root:india123@ds035740.mlab.com:35740/ecommerce', function(err){

	if (err) {
		console.log(err);
	} else {
		console.log("database is connected");
	}
})

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'jade');
app.use(flash());
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: "Ashish@234"
}))

var mainRoute = require('./routes/main');
var userroute = require('./routes/user');

app.use(mainRoute);
app.use(userroute);







app.listen(2000, function(err){
	if (err) throw err;
	console.log("Server is running at port 2000");
});