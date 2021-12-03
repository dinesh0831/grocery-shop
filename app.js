var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("./connection")
var productsRouter = require('./routes/Products');
var products=require("./routes/productHome")
var usersRouter = require('./routes/users');
var cartRouter= require("./routes/Cart");
var auth=require("./middleware")
var cors=require('cors')

var order=require("./routes/order")
require('dotenv').config()
var app = express();
mongoose.connect()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/photo",express.static(path.join(__dirname, 'cover')))
app.use(express.static(path.join(__dirname, 'public')));



app.use("/product",products)
app.use('/users', usersRouter);
app.use(auth.authtoken)
app.use('/products', productsRouter);
app.use("/cart",cartRouter)
app.use("/order",order)

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
