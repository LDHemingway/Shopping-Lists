require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var landingRouter = require('./routes/landing');
var usersRouter = require('./routes/users');
var shoppingListsRouter = require('./routes/shopping-lists')
var itemsRouter = require('./routes/items')
var methodOverride = require('method-override')
const mongoose = require('mongoose')
var app = express();

mongoose.connect('mongodb://localhost/shopping-lists', { useNewUrlParser: true })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/', landingRouter);
app.use('/users', usersRouter);
app.use('/users/:userId/lists', shoppingListsRouter)
app.use('/users/:userId/lists/:id', itemsRouter)

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
