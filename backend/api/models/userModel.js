'use strict'; // now javascript will execute in strict mode ( if x is not declared, and we are using it to assign something, it will throw an error)

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


// User Schema Object
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'Please enter your first name'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Please enter your last name'
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please enter a username'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please enter your email address'
    },
    password: {
        type: String,
        required: 'Please enter a password'
    },
    roles: {
        type: [String],
        enum: ["user", "admin", "super_admin"],
        default: ["user"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.compareUsername = function (username) {
    if (username === this.username) {
        return true;
    }
};



const User = mongoose.model('User', UserSchema); // we are registering the UserSchema as a model called User. This will allow us to access the User model from anywhere in our application by calling mongoose.model('User')
module.exports = User; // we are exporting the User model for use in other files.