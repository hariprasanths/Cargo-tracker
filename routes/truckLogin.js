var express=require('express');
var models=require('../models');
var sendResponse=require('./sendRes')
var path=require('path');
var md5=require('md5');
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var app=express();
app.get('/',(req, res)=>{
	res.sendFile(path.join(__dirname,'../public/truckLogin.html'));
});
app.post('/',function(req,res){
	console.log(req.body);
	models.driver_detail.find({where: {driver_id: req.body.driver_id}}).then(function(obj){
		if(obj.password==req.body.password){
			req.session.driver_id=obj.driver_id;
			sendResponse(res,200,"Logged In");
		}
	})
	.catch(function(err){
		console.log(err);
	});
});
app.post('/app', (req, res)=>{
	console.log("app");
	let sendObj={};
	models.driver_detail.find({where: {driver_id: req.body.driver_id}}).then((obj)=>{
		if(obj.password==req.body.password) {
			models.driver_detail.update({driver_token: md5(obj.driver_id+Date.now())},{where: {driver_id: req.body.driver_id}}).then((result)=>{
				models.package_detail.find({where: {product_id: obj.product_id}}).then((package)=>{
					sendObj['address']=package.destination;
					models.user_detail.find({where: {user_id: package.user_id}}).then((user)=>{
						sendObj['user_name']=user.user_name;
						sendObj['driver_id']=req.body.driver_id;
						console.log(sendObj);
						res.setHeader('Content-Type', 'application/json');
						sendResponse(res, 200, sendObj);
					})
				})
			}).catch((e)=> {
				sendResponse(res, 500, "Server Error");
				console.log(e);
			 });
		}
	});
});
module.exports=app;
