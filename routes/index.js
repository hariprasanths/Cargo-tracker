var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var models=require('../models');
var sendResponse=require('./sendRes');
const socketIO = require('socket.io');
var http = require('http');
var server = http.createServer(app);
var io = socketIO(server);
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'../views/index.pug'));
});
app.post('/',function(req,res){
	console.log(req.body);
	models.user_detail.find({where: {user_id: req.body.user_id}}).then(function(obj){
		console.log(obj);
		if(obj.password==req.body.password){
			req.session.user_id=obj.user_id;
			sendResponse(res,200,"Logged In");
		}
	})
	.catch(function(err){
		console.log(err);
	});
});
module.exports=app;


// var http = require('http');
// var server = http.createServer(app);
// var io = socketIO(server);
