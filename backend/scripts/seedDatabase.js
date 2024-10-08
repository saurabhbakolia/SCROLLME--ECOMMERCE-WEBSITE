require('dotenv').config();
const seedProducts = require('./products/seedProducts');
const seedUsers = require('./users/seedUsers');

const seedAll = async () => {
  try {
    await seedProducts(); // Seed products
    await seedUsers(); // Seed Users
    console.log('All data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedAll();
