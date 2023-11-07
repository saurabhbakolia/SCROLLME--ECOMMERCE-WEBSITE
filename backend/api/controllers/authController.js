'use strict';

const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");
const verifyAccessToken = require("../utils/verifyAccessToken");

exports.checkAuthStatus = async (req, res) => {
    try {
        // Assuming the token is sent as an HTTP-only cookie named 'accessToken'
        const accessToken = req.cookies.accessToken;

        // If there's no token, the user is not logged in
        if (!accessToken) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in!',
                data: {
                    isAuthenticated: false
                }
            });
        };

        verifyAccessToken(accessToken)
            .then(async ({ user }) => {
                if (!user) {
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You are not logged in!',
                        data: {
                            isAuthenticated: false
                        }
                    });
                };

                return res.status(200).json({
                    status: 'success',
                    message: 'You are logged in!',
                    data: {
                        isAuthenticated: true,
                        user: user
                    }
                });
            })
            .catch((err) => {
                console.log("Error in finding user token:", err);
                return res.status(401).json({
                    status: 'fail',
                    message: 'You are not logged in!',
                    data: {
                        isAuthenticated: false
                    }
                });
            });
    } catch (error) {
        console.error('Error in checkAuthStatus:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error!',
            data: {
                isAuthenticated: false
            }
        });
    }
};