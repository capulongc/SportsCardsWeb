/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    config = require('../config/config'),
    userDB = mongoose.createConnection(config.userDB.uri);

/* Create your schema */
var userSchema = new Schema({
    //Login Information
    email: { type: String, index: { required: true, unique: true, dropDups: true } },
    password: { type: String, required: true },
    admin: Boolean, 
    firstName: String,
    lastName: String,
});

/* Use your schema to instantiate a Mongoose model */
var Users = userDB.model('Users', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Users;
