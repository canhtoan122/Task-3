var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
serverRouter = require("./routes/server");
let signInRouter = require('./routes/signIn/index');
let loginRouter = require('./routes/login/index');
let notificationRouter = require('./routes/conversations/setting/notification');
let conversationsHiddenRouter = require('./routes/conversations/hidden/index');
let statusMessageRouter = require('./routes/users/setting/status-message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/server", serverRouter);
app.use("/signIn", signInRouter);
app.use("/login", loginRouter);
app.use("/conversations/setting/notification", notificationRouter);
app.use("/conversations/hidden", conversationsHiddenRouter);
app.use("/users/setting/status-message", statusMessageRouter);

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
