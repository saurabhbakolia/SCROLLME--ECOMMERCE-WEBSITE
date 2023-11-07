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
    credentials: true,
};
var port = process.env.PORT || 8080;
app.use(cors(corsOptions));


dbConnect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
