'use strict';

const jwt = require("jsonwebtoken");
const UserToken = require("../models/userToken");
const verifyAccessToken = require("../utils/verifyAccessToken");
const verifyRefreshToken = require("../utils/verifyRefreshToken");

exports.checkAuthStatus = async (req, res) => {
    try {
        // Assuming the token is sent as an HTTP-only cookie named 'accessToken'
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        // If there's no token, the user is not logged in
        if (!accessToken && refreshToken) {
            verifyRefreshToken(refreshToken)
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
                    const payload = { _id: user._id, roles: user.roles };
                    const accessToken = jwt.sign(
                        payload,
                        'SCROLLME_SECRET',
                        { expiresIn: '15m' }
                    );
                    await UserToken.findOneAndUpdate(
                        { userId: user._id },
                        { accessToken: accessToken },
                    );
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                        maxAge: 15 * 60 * 1000, // token expiration time in milliseconds
                    });
                    res.status(200).json({
                        status: 'success',
                        message: 'New access token generated successfully!',
                        data: {
                            isAuthenticated: true,
                            user: user
                        }
                    });
                })
                .catch(err => {
                    console.log("Error signing access token");
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You are not logged in!',
                        data: {
                            isAuthenticated: false
                        }
                    });
                })
        } else if (!accessToken && !refreshToken) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in!',
                data: {
                    isAuthenticated: false
                }
            });
        } else {
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
                    console.log("Error verifying access token");
                    return res.status(401).json({
                        status: 'fail',
                        message: 'You are not logged in!',
                        data: {
                            isAuthenticated: false
                        }
                    });
                });
        }


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