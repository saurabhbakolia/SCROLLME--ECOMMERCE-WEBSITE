'use strict';

var jwt = require("jsonwebtoken");
var verifyRefreshToken = require("../utils/verifyRefreshToken");


exports.newAccessToken = async (req, res) => {
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
    verifyRefreshToken(token)
        .then(({ user }) => {
            const payload = { _id: user._id, roles: user.roles };
            const accessToken = jwt.sign(
                payload,
                'SCROLLME_SECRET',
                { expiresIn: '15m' }
            );

            res.status(200).json({
                status: 'success',
                message: 'New access token generated successfully!',
                data: { accessToken }
            });
        })
        .catch(err => {
            console.log("Error signing access token");
            return res.status(401).json({
                message: err.message
            });
        });
};
