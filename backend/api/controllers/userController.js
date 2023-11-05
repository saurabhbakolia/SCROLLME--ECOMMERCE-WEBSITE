'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var generateTokens = require("../controllers/generateTokenController");

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
                status: "success",
                message: 'User registration successful!',
            });
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


exports.sign_in = async function (req, res) {
    User.findOne({ username: req.body.username })
        .then(async function (user) {
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid username or password!'
                });
            }

            const { accessToken, refreshToken } = await generateTokens(user);
            return res.status(200).json({
                status: 'success',
                message: 'Logged in successfully!',
                data: { accessToken, refreshToken }
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