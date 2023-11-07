var jwt = require('jsonwebtoken');
var UserToken = require('../models/userToken');

const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };
        const accessToken = jwt.sign(
            payload,
            'SCROLLME_SECRET',
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            payload,
            'SCROLLME_SECRET',
            { expiresIn: '15d' }
        );

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.deleteOne();

        const newUserToken = new UserToken({ userId: user._id, accessToken: accessToken, refreshToken: refreshToken, isLoggedIn: true });
        newUserToken.save()
            .then(function (userToken) {
                console.log("User token saved successfully");
            })
            .catch(function (err) {
                console.log("Error saving user token");
                throw err;
            });
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = generateTokens;