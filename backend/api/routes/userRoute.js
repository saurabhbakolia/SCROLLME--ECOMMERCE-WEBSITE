'use strict';

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes
router.post('/register', userController.register);
router.post('/sign_in', userController.sign_in);
router.get('/user_profile', userController.profile);

module.exports = router;

// module.exports = function(app){
//     var userHandlers = require('../controllers/userController');
//     app.route('/auth/register')
//         .post(userHandlers.register);

//     app.route('/auth/sign_in')
//         .post(userHandlers.sign_in);
    
//     app.route('/auth/user_profile')
//         .get(userHandlers.profile);
// }