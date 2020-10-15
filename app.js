//dependencies
const {errorHandler}=require("./configurations/auth/errorHandler");
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const cors=require('cors');
const queue=require('express-queue');
const app = express();


//use middle-ware
app.use(cors({origin:true}));
//app.use('/',errorHandler)
// activeLimit - max request to process simultaneously
// queuedLimit - max requests in queue until reject (-1 means do not reject)
app.use(queue({activeLimit:2,queuedLimit:-1}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cache controller
app.use((request,response,next)=>{
  response.setHeader('Cache-Control','public,max-age=600, s-max-age=800');
  next();
});

app.use('/',usersRouter);
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
  err.option='Check url or method';
  res.status(err.status || 500).json({error:err});

});

module.exports = app;
