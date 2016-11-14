var http = require('http');
var port = process.env.port || 8080;
var express = require('express');
var app = express();
global.mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var https = require('https');
var url = require('url');


var port1 = process.env.PORT || 8080; // set our port

// #HOSTING, this was host in cloudlab, please change it
// var host = "cp-1.njstest.nosql-json-pg0.utah.cloudlab.us"
var host = "localhost"
console.log(">>> Hosting application in: " + host);

var router = express.Router;

// configuration ===========================================

// config files
 
var db = require('./config/db');

// connect to our mongoDB database (commented out after you enter in your own credentials)
global.connectionsubject = mongoose.createConnection(db.urlSubjectViews);


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

//routes ==================================================
require('./app/route')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 				    		// expose app

