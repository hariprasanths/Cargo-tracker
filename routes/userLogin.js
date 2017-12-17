var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
var models=require('../models');
var sendResponse=require('./sendRes');
app.use(bodyParser.urlencoded({ extended: true}));

const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
app.set('trust proxy', 1); 
app.use(cookieSession({
	name: 'session',
	keys: ['key1', 'key2']
}));


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/userLogin.html'));
});
app.post('/',function(req,res){
	console.log(req.body);
	models.user_detail.find({where: {user_id: req.body.user_id}}).then(function(obj){
		console.log(obj);
		if(obj.password==req.body.password){
			req.session.user_id=obj.user_id;
			console.log(req.session);
			sendResponse(res,200,"Logged In");
		}
	})
	.catch(function(err){
		console.log(err);
	});
});
module.exports=app;