const Sendresponse = require('../sendRes');
const Sequelize = require('sequelize');
const models = require(__dirname +'/../../models/');


const authCheck = (req,res,next) => {
	console.log(req.cookies);
	if(req.cookies.session){
		next();
	}
	else if(req.body.user_token){
		let user_id = req.body.user_id;
		let user_token = req.body.user_token;
		models.user_detail.findOne({where: {user_id: user_id,user_token: user_token},raw:true,logging:false})
		.then(function(user) {
			if(user){
				next();
			}
			else{
				Sendresponse(res,401,"Unauthorized access");	
			}
		})
		.catch(function (err) {
			status_code = 500;
			message = err.message;
			Sendresponse(res,status_code,message);
		});

	}
	else{
		Sendresponse(res,401,"Unauthorized access");
	}
};

module.exports = authCheck;