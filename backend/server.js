'use strict';

var express = require('express');
var cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors());

var port = process.env.PORT || 8080;

var User = require('./api/models/userModel');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');

const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
};

const mongooseURI = process.env.MONGODB_URI;
mongoose.connect('mongodb://127.0.01:27017/scrollme', option).then(function () {
    console.log('connected to db');
}, function (err) {
    console.log(err);
});

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

var routes = require('./api/routes/userRoute.js');
routes(app);

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + 'not found'
    })
});

app.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
