var config = require('./config'),
    mongoose = require('mongoose'),
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  var port = process.env.PORT || 8080
  app.listen(port, function() { //process.env.PORT
    console.log('App listening on port');
  });
};
