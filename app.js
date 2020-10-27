//dependencies
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/routes');
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
const {error404Handler,error500Handler} = require("./errorHandler");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cache controller
app.use((request,response,next)=>{
  response.setHeader('Cache-Control','public,max-age=600, s-max-age=800');
  next();
});

app.use('/',usersRouter);
app.use(error404Handler);
app.use(error500Handler);
module.exports = app;
