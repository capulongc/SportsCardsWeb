var member = require('./members'),
    express = require('express'),
    router = express.Router();



router.route('/register')
    .post(member.create);                        //registers a member

router.route('/register/:registerToken')
    .post(member.verify);     //registers a member

//Might need to protect this somehow?
router.route('/login')
    .post(member.login);        //login for member

router.route('/')
    .get(member.list);          //displays all members

router.route('/:memberID')
    .get(member.info)                            //displays this members info (if member level high enough display memberlevel)
    .patch(member.verifyToken, member.update)           //allow this member to update their info (memberID same or member level high enough)
//.get(attendance.eventList)                        //displays this members event list
//.patch(member.verifyToken, attendance.update);   //updates this members attendance status (memberID same or member level high enough)


//Middleware to pass memberID to the route
router.param('memberID', member.memberByID);
//Middleware to pass registerID to route
router.param('registerID', member.registerByID);

module.exports = router;