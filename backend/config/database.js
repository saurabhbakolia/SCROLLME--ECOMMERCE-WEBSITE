// To connect to the mondoDB Atlas database
const mongoose = require('mongoose');

connect().catch(err => console.log(`Error while connecting to the database!`,err));

async function connect() {
    await mongoose.connect('mongodb+srv://saurabhbakolia2002:I8oxPmg1AcWAq3lz@scrollmewebstorecluster.c9kdhwt.mongodb.net/');
};

console.log(`Connected to the database!`);

