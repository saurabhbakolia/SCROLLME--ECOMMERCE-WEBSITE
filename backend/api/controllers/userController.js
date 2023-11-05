'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.register = function (req, res) {
    var newUser = new User(req.body);
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }
    newUser.password = bcrypt.hashSync(req.body.password, 10); // we are hashing the password
    newUser.save()
        .then(function (user) {
            user.password = undefined;
            return res.status(201).json({
                success: true,
                message: 'User registration successful!',
                data: user
            })
        })
        .catch(function (err) {
            if (err.code === 11000) {
                // Extract the field from the error message
                const field = err.message.split("index:")[1].split(" dup key")[0].split("_1")[0].trim();
                return res.status(409).json({
                    message: `An account with that ${field} already exists.`
                });
            } else {
                // If it's not a duplicate key error, send a generic error message
                return res.status(400).send({
                    message: 'There was a problem registering the user.'
                });
            }
        });
};


exports.sign_in = function (req, res) {
    User.findOne({ username: req.body.username })
        .then(function (user) {
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid username or password!'
                });
            }
            return res.json({
                message: 'user login successful!',
                token: jwt.sign({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user.id
                }, 'SCROLLME_SECRET')
            });
        })
        .catch(function (err) {
            throw err;
        })
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized user!'
        })
    }
};

exports.profile = function (req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            message: 'Unauthorized user!'
        });
    }

    res.json({
        message: 'Welcome to your profile',
        user: req.user
    });
};