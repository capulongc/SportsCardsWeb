var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen(process.env.PORT, function() { //process.env.PORT
    console.log('App listening on port', process.env.PORT);
  });
};
