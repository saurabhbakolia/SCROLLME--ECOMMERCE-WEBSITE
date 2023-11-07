'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var UserToken = require('../models/userToken');
var generateTokens = require("../controllers/generateTokenController");
var verifyRefreshToken = require("../utils/verifyRefreshToken");
var verifyAccessToken = require("../utils/verifyAccessToken");

exports.register = async function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({
            message: "Passwords do not match"
        });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    await User({ ...req.body, password: hashedPassword }).save()
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
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
            console.log(verifyPassword);
            console.log(user);
            if (!verifyPassword) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid username or password!'
                });
            }

            const { accessToken, refreshToken } = await generateTokens(user);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true, // set to true if using https
                sameSite: 'none', // adjust according to your needs
                maxAge: 15 * 60 * 1000, // token expiration time in milliseconds
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true, // set to true if using https
                sameSite: 'none', // adjust according to your needs
                maxAge: 7 * 24 * 60 * 60 * 1000, // token expiration time in milliseconds
            });
            return res.status(200).json({
                status: 'success',
                message: 'Logged in successfully!',
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

exports.profile = function (req, res) {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                message: "Authorization header is required"
            });
        }

        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!accessToken) {
            return res.status(401).json({
                message: "Bearer token is required"
            });
        }

        verifyAccessToken(accessToken)
            .then(async ({ user }) => {
                const payload = { _id: user._id, roles: user.roles };
                const userDetails = await getUserDetails(user._id)
                    .then(data => {
                        res.status(200).json({
                            status: 'success',
                            message: 'User Profile fetched successfully!',
                            data: {
                                user: {
                                    _id: user._id,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    username: data.username,
                                    email: data.email,
                                    roles: data.roles
                                }
                            }
                        });
                    })
                    .catch(err => {
                        console.log("Error fetching user:", err);
                        return res.status(500).json({
                            message: "Error fetching user details: " + err.message
                        });
                    });
            })
            .catch(err => {
                console.log("Error signing access token");
                return res.status(401).json({
                    message: err.message
                });
            });

    } catch (error) {
        console.log("Error fetching user:", error);
        return res.status(500).json({
            message: "Error fetching user details: " + error.message
        });
    }
};


exports.logOut = ("/", async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({
                message: "Authorization header is required"
            });
        }

        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                message: "Bearer token is required"
            });
        }

        const userToken = await UserToken.findOne({ accessToken: token });
        if (!userToken) {
            return res.status(401).json({
                message: "Invalid token!"
            });
        }
        await userToken.deleteOne();
        res.status(200).json({
            status: 'success',
            message: 'User logged out successfully!'
        });
    } catch (error) {
        console.log("Error logging out user:", error);
        return res.status(500).json({
            message: "Error logging out user"
        });
    }
});

const getUserDetails = async (_id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: _id })
            .then(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    reject(null);
                }
            })
            .catch(function (err) {
                reject(err);
            });
    });
};