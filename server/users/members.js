var Member = require('../models/user.server.model.js'),
  bcrypt = require('bcrypt'),
  nodemailer = require('nodemailer'),
  crypto = require('crypto'),
  async = require('async'),
  jwt = require('jsonwebtoken'),
BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

//CREATES A MEMBER (ADMIN)    TODO: Check if member with email already exists, check req for jwt and admin
//    auto generate a memberID
exports.create = (req, res) => {
  async.waterfall([
    function (callback) {
      // generate token
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        }
        console.log("Token Generated " + token);
        callback(null, token);
      });
    },
    function (token, callback) {
      // create member with registrationToken
        let member = new Member({
        password: token,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      member.save((err) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            message: err,
          });
        }
        console.log("Member Created: " + member.email);
        callback(null, member, token);
      });
    },
    function (member, token, callback) {
      // send email with registrationToken url
      if (member) {
        var smtpTrans = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: "strattansportscards",
              pass: "XGJPa8MXNuuNK4bM"
          }
        });
        var mailOptions = {
          to: member.email,
          from: 'Strattan Sports Portfolio',
          subject: 'Verify Your Email Address',
          text: member.firstName+',\n\n' +
          'Thank you for joining Strattan Sports Portfolio! \n' +
          'Please click on the following link to complete the verification process for your account: \n\n' +
          'http://' + req.hostname + '/#/register/' + token + '\n\n'
        };
        smtpTrans.sendMail(mailOptions, function (err) {
          if (err) {
            res.json({
              success: false,
              message: err,
            });
          }
          console.log("Email Sent");
          callback(null);
        });
      }
    }
  ], function () {
    console.log('Member successfully created.');
    res.json({
      success: true,
      message: 'Member successfully created.',
    });
  });

};

//REGISTERS MEMBER USING EMAILED LINK
exports.verify = (req, res) => {
  async.waterfall([
    function (callback) {
      Member.findOne({ password: registerToken }, function (err, member, next) {
        if (!member) {
            console.log("Registration token is invalid.");
            res.end('Registration token is invalid.');
        }
        let registerToken = req.params.registerToken;
        let password = member.password;
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
          .then(hash => {
            member.password = hash;
            member.save(function (err) {
              if (err) {
                res.json({
                  success: false,
                  message: err,
                });
              }
              console.log("Member Password Set");
              callback(null, member)
            });
          });
      });
      }
  ], function () {
    console.log('Verification complete');
    res.json({
      success: true,
      message: 'Verification complete',
    });
  });
};

//LOGS IN MEMBERS   ->  Returns JWT on a successful login
exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Member.find({ email: email })
    .then(member => {
        if (member) {
        bcrypt.compare(password, member[0].password)
          .then(passwordMatch => {
              if (!passwordMatch) {
                  console.log("WRONG PASS");
              res.json({
                success: false,
                message: 'Password is invalid!'
              });
              }
            let token = jwt.sign({ member },
              "sometoken",
              {
                expiresIn: '24h' // expires in 24 hours
              }
            );
            // return the JWT token
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token,
              member: member
            });
          })
          .catch(err => {
            console.log(err);
            res.end(err);
          })
      }
      else {
        res.json({
          success: false,
          message: 'Email is invalid!',
          token: token
        });
      }
    });
};

//LIST ALL MEMBERS
exports.list = (req, res) => {
  Member.find({}, (err, member) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    }
    else
      res.json(member);
    console.log("Member List Retrieved")
  }).sort({ code: 1 });
};

//DISPLAY SINGLE MEMBER'S INFO
exports.info = (req, res) => {
  res.json(req.member);
};

/*TODO:
*       update user info once authorized
*
*/
//UPDATES SINGLE MEMBER'S INFO (ADMIN/THAT MEMBER)
exports.update = (req, res) => {
  //check current user level/memberID
  jwt.verify(req.token, 'super secret key', (err, authData) => {
    if (err) {
      res.status(403);
    }
    else {
      //ADMIN or THAT MEMBER
      if (authData.member.userLevel >= 2 || authData.member.memberID == req.member.memberID) {
        res.json('Authorized Member');
        //~~~~~~UPDATE THE INFO HERE~~~~~~~
        var member = req.member;
        var body = req.body;
        var id = req.params.memberID;
        Member.findByIdAndUpdate(id, body, {new: true}, function(err, update){
          if (err){
            console.log(err);
            res.status(404).send(err);
          }
          else {
           res.json(update);
          }
        });
      }
      else {
        //res.status()
        res.json('Unathorized Member');
      }
    }
  });
};

//MIDDLEWARE - attatches member object to req based on member(path)
exports.memberByID = function (req, res, next, id) {
  Member.findById(id).exec(function (err, member) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.member = member;
      next();
    }
  });
};

//MIDDLEWARE - attatches member object to req based on registerID(path)
exports.registerByID = (req, res, next, id) => {
  Member.findOne({ registerID: id }, (err, member) => {
    if (err) {
      res.status(400).send(err);
    } else {
      req.member = member;
      next();
    }
  });
};

//MIDDLEWARE - attatchhes token to the req object
exports.verifyToken = function (req, res, next) {
  //Token Format
  //Authorization: Bearer <access_token>

  //Get Authorization Header Value
  const bearerHeader = req.headers['authorization'];
  //Check if Bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    //Extract Token
    console.log('here')
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

  }
  else {
    res.json("Authorization Error")
  }
}
