'use strict';

var mongoose = require("mongoose");
var UserToken = mongoose.model('UserToken');
var jwt = require("jsonwebtoken");

const verifyAccessToken = (accessToken) => {
    const privateKey = "SCROLLME_SECRET";

    return new Promise((resolve, reject) => {
        UserToken.findOne({ accessToken: accessToken })
            .then((doc) => {
                if (!doc) {
                    return reject({ error: true, message: "SignIn to fetch user profile!" });
                }
                console.log("user Token found");
                // Verify the token now that we've found it
                jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
                    if (err) {
                        return reject({ error: true, message: "Invalid refresh token" });
                    }
                    return resolve({ user: tokenDetails, error: false, message: "Valid refresh token" });
                });
            })
            .catch((err) => {
                console.log("Error in finding user token:", err);
                return reject({ error: true, message: "Error during token validation" });
            });
    });
};

module.exports = verifyAccessToken;