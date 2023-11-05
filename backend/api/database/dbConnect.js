'use strict';


const mongoose = require("mongoose");
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
};
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = () => {
    mongoose.connect(MONGODB_URI, option);
    mongoose.connection.on("connected", () => {
        console.log("Connected to DB successfully!");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error while connecting to DB: ", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from DB");
    });

};

module.exports = dbConnect;