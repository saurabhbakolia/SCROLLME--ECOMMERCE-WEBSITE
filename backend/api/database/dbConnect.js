const mongoose = require("mongoose");
<<<<<<< Updated upstream
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    // reconnectTries: 30000
};
=======
>>>>>>> Stashed changes
require('dotenv').config();

const option = {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
};

const MONGODB_URI = process.env.MONGODB_URI;

<<<<<<< Updated upstream
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

=======
const dbConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, option);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
>>>>>>> Stashed changes
};

module.exports = dbConnect;