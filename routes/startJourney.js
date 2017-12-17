var express = require('express');
console.log("Hi");
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var models=require('../models');
var sendResponse=require('./sendRes');
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/',function(req,res){
	console.log(req.body);
	// .catch(function(err){
	// 	console.log(err);
	// });
});
module.exports=app;