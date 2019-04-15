var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    memberRouter = require('../users/routes'),
    listingsRouter = require('../routes/listings.server.routes');


const fileRoutes = require('../routes/imageUpload');

module.exports.init = function () {
    mongoose.Promise = global.Promise;
    //connect to database
    var mailDB = mongoose.createConnection(config.mailDB.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  /**TODO
  Serve static files */
  app.use('/', express.static('client'))
  
  /**TODO 
  Use the listings router for requests to the api */
  app.use('/api/listings', listingsRouter);
  app.use('/members', memberRouter);
  app.use("/api/v1/", fileRoutes);

  /**TODO
  Go to homepage for all routes not specified */ 
  app.all('*', function(req, res) {
    res.redirect("/home.html");
  });

  return app;
};  
