'use strict';

var express = require('express');
const dbConnect = require('./api/database/dbConnect.js');
var cors = require('cors');
require('dotenv').config();
var User = require('./api/models/userModel');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
var userRoute = require('./api/routes/userRoute.js');
var refreshTokenRoute = require('./api/routes/refreshTokenRoute.js');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
var port = process.env.PORT || 8080;
app.use(cors());


dbConnect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            jsonwebtoken.verify(parts[1], 'SCROLLME_SECRET', function (err, decode) {
                if (err) {
                    // If the token is not valid, send a 401 Unauthorized response
                    res.status(401).json({ message: 'Authentication failed. Invalid token.' });
                } else {
                    // If the token is valid, set the user info in req.user and proceed
                    req.user = decode;
                    next();
                }
            });
        } else {
            // If the format of the Authorization header is not correct, send a 401 response
            res.status(401).json({ message: 'Authentication failed. Token format is not correct.' });
        }
    } else {
        // If there is no Authorization header, proceed without setting req.user
        // This allows routes that do not require authentication to be accessed
        next();
    }
});


// Use Routes
app.use('/auth/user', userRoute);
app.use('/auth', refreshTokenRoute);

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + 'not found'
    })
});

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
