var config = require('./config'),
    mongoose = require('mongoose'),
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  port = 5000;
  app.listen(port, function() { //process.env.PORT
    console.log('App listening on port');
  });
};
