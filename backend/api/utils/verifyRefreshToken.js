const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(401).json({ message: 'No refresh token provided' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid refresh token');
    req.user = decoded; // Add user data to request object
    next();
  });
};

module.exports = verifyRefreshToken;

// var mongoose = require("mongoose");
// var UserToken = mongoose.model('UserToken');
// var jwt = require("jsonwebtoken");

// const verifyRefreshToken = (refreshToken) => {
//     const privateKey = "SCROLLME_SECRET";

//     return new Promise((resolve, reject) => {
//         UserToken.findOne({ refreshToken: refreshToken })
//             .then((doc) => {
//                 if (!doc) {
//                     console.log("user token not found");
//                     return reject({ error: true, message: "Authorization failed!" });
//                 }
//                 console.log("user Token found");
//                 // Verify the token now that we've found it
//                 jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
//                     if (err) {
//                         return reject({ error: true, message: "Invalid refresh token" });
//                     }
//                     return resolve({ user: tokenDetails, error: false, message: "Valid refresh token" });
//                 });
//             })
//             .catch((err) => {
//                 console.log("Error in finding user token:", err);
//                 return reject({ error: true, message: "Error during token validation" });
//             });
//     });
// };

// module.exports = verifyRefreshToken;
