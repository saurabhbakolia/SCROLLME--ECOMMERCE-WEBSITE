const mongoose = require("mongoose");
require('dotenv').config();
const option = {
    socketTimeoutMS: 30000,
};

const MONGODB_URI = process.env.MONGODB_URI;
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, option);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

module.exports = dbConnect;