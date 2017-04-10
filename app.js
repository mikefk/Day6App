var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var validator=require("express-validator");
var index = require('./routes/index');
var users = require('./routes/users');
var contactus=require("./routes/contactus");
var thankyou=require("./routes/thankyou");

const session = require('cookie-session')
var csrf = require('csurf');

var app = express();

// view engine setup
app.set("env","production");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("strict routing",true);
app.set("x-powered-by",false);
app.set("case sensitive routing",true);

app.set("trust proxy",true);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());
app.use(session({ secret: 'secret' }));
app.use(csrf());

app.set("query parser",true);


app.use('/', index);
app.use('/users',bodyParser.urlencoded({ extended: false }), users);
app.use("/contactus",contactus);
app.use("/thankyou",thankyou);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(4000);
module.exports = app;
