var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('mysql', mysql);
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use('/', indexRouter);
app.use('/classEnrollment', require('./classEnrollment.js'));
app.use('/dismissProfessor', indexRouter);
app.use('/regStudent', require('./regStudent.js'));
app.use('/regProfessor', require('./regProfessor.js'));
app.use('/regPet', require('./regPet.js'));
app.use('/regWand', require('./regWand.js'));
app.use('/viewWand', require("./viewWand.js"));
app.use('/viewStudent', require('./viewStudent.js'));
app.use('/viewProfessor', require("./viewProfessor.js"));
app.use('/viewPets', require('./viewPet.js'));
app.use('/removeStudentClass', indexRouter);
app.use('/createClass', indexRouter);
app.use('/enrollStudent', indexRouter);

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

