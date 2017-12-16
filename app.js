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


var index = require('./routes/index');
var truckLogin = require('./routes/truckLogin');
var track = require('./routes/track');
var userLogin = require('./routes/userLogin');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/truckLogin', truckLogin);
app.use('/track', track);
app.use('/userLogin', userLogin);

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
});
server.listen(3000);
console.log("Server runnin on 3000");
module.exports = app;