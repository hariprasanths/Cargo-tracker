var express = require('express');
console.log("Hi");
var app = express();
var path=require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'../public/track.html'));
});
app.post('/setUser', (req, res)=>{
  console.log(req.session.user_id);
  res.send(req.session.user_id);
});
module.exports=app;