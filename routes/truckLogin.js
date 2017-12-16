var express=require('express');
var models=require('../models');
var sendResponse=require('./sendRes')
var path=require('path');

var app=express();
app.get('/',(req, res)=>{
	res.sendFile(path.join(__dirname,'../public/truckLogin.html'))
});
app.post('/',function(req,res){
	console.log("here");
	models.driver_detail.find({where: {driver_id: req.body.driver_id}}).then(function(obj){
		if(obj.password==req.body.password){
			sendResponse(res,200,"Logged In");
		}
	})
	.catch(function(err){
		console.log(err);
	});
});
module.exports=app;