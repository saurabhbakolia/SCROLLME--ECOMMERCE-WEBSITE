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
            return res.json(user);
        })
        .catch(function (err) {
            return res.status(400).send({
                message: err
            });
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