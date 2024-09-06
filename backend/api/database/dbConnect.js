'use strict';


const mongoose = require("mongoose");
const option = {
    socketTimeoutMS: 30000,
    // keepAlive: true,
    // reconnectTries: 30000, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = () => {
    mongoose.connect(MONGODB_URI, option)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));
};

module.exports = dbConnect;