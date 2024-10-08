const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../api/models/userModel'); // Assuming your schema file is saved in models/User.js
const fs = require('node:fs');
const path = require('node:path');

// Load user data from JSON file
const usersData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8')
);

const uri = 'mongodb://127.0.0.1:27017/scrollme';

// Function to seed users into the database
const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);

    // Clear the User collection
    await User.deleteMany({});

    // Hash the passwords and create users
    const users = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert the users into the database
    await User.insertMany(users);

    console.log('Users successfully seeded!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding users:', err);
    mongoose.connection.close();
  }
};

// Run the seed function
module.exports = seedUsers;
