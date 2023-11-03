'use strict';

module.exports = function(app){
    var userHandlers = require('../controllers/userController');
    app.route('/auth/register')
        .post(userHandlers.register);

    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    
    app.route('/auth/user_profile')
        .get(userHandlers.profile);
}