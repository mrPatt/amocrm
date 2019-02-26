var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.config = require('./config/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./controller/registration');
var lead = require('./routes/lead');
var axios = require('./axios/axios');
var mail = require('./mail/mailer');
var excel = require('./controller/excel');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header("Access-Control-Expose-Headers", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/leads', lead);
app.use('/axios', axios);
app.use('/mail', mail);
app.use('/excel', excel);

	
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log(Error);
  	next(createError(404));
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

module.exports = app;
