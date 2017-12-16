var express = require('express');
console.log("Hi");
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var models=require('../models');
var sendResponse=require('./sendRes');
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/userLogin.html'));
});
app.post('/',function(req,res){
	console.log(req.body);
	models.user_detail.find({where: {user_id: req.body.user_id}}).then(function(obj){
		console.log(obj);
		if(obj.password==req.body.password){
			sendResponse(res,200,"Logged In");
		}
	})
	.catch(function(err){
		console.log(err);
	});
});
module.exports=app;