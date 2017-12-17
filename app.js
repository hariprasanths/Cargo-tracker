var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const models = require('./models');


var app = express();

const socketIO = require('socket.io');
var http = require('http');
var server = http.createServer(app);
var io = socketIO(server);

var authcheck=require('./routes/middleware/authcheck')
var index = require('./routes/index');
var truckLogin = require('./routes/truckLogin');
var track = require('./routes/track');
var userLogin = require('./routes/userLogin');
var startJourney = require('./routes/startJourney')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authcheck)
app.use('/api', index);
app.use('/truckLogin', truckLogin);
app.use('/api/track', track);
app.use('/userLogin', userLogin);
app.use('/api/startJourney', startJourney);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function(socket) {
	console.log("New user Connected");

  socket.on('appLoc',(appObj)=>{
    let sendObj={};
    models.driver_detail.find({where: {driver_id: appObj.driver_id}}).then((result)=>{
      let product_id=result.product_id;
      models.package_detail.find({where: {product_id}}).then((result)=>{
        sendObj['lat']=appObj.clat;
        sendObj['long']=appObj.clong;
        sendObj['dest']={
          dlat: appObj.dlat,
          dlong: appObj.dlong
        }
        models.package_detail.update({clat: sendObj.lat, clong: sendObj.long,dlat: sendObj['dest'].dlat, dlong: sendObj['dest'].dlong}, {where: {product_id}}).then((updated)=>{
          console.log("updated", updated);
        });
        // Will save dlat and dlong in db later
        console.log(sendObj);
      })
    }).catch((e)=>{
      console.log(e);
    });
  });

  socket.on('startSend', (obj)=>{
    models.package_detail.find({where: {user_id: obj.user_id}}).then((result)=>{
      socket.emit('webLoc', result);
    }).catch((e)=>{
      console.log(e);
    });
  });

});
server.listen(3000);
console.log("Server running on 3000");
module.exports = app; 