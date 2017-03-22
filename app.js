'use strict';

const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const newsRouter = require('./middlewares/News');
const cronRss = require('./crons/NewsCron');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/news', newsRouter);
app.use(function(req, res){
    res.status(404).end('404!');
});

//const schedule = require('node-schedule');
//const getNewsJob = schedule.scheduleJob('*/1 * * * *', function() {
    //cronRss.getNewsNaiz();
//});

mongoose.connect(config.db.uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to db!");
});


//Express application will listen to port mentioned in our configuration
app.listen(config.port, function(err){
  if(err) throw err;
  console.log("App listening on port " + config.port);
});
