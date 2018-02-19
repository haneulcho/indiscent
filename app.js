var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// 하늘 추가
var expressHbs = require('express-handlebars');

var routes = require('./routes/index');
var applicationRoutes = require('./routes/application');

var app = express();

// 몽구스 서버 설정
require('./lib/connection');

// view engine setup

// 하늘 추가
app.engine('.hbs', expressHbs({ defaultLayout: 'default', extname: '.hbs' }));
app.set('view engine', '.hbs');

// app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/application', applicationRoutes);
app.use('/', routes);

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

if (process.env.NODE_ENV == 'development') {
  console.log('개발 모드 접속 완료!');
} else {
  console.log('프로덕션 모드 접속 완료!');
}

module.exports = app;
