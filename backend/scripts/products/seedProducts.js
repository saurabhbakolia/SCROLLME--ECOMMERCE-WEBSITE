require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('node:fs');
const path = require('node:path');

// MongoDB URI
const uri = 'mongodb://127.0.0.1:27017/scrollme';
if (!uri) throw new Error('MONGODB_URI is not defined');

// Database and Collection names
const dbName = 'scrollme';
const collectionName = 'products';

// Path to the products.json file
const productsFilePath = path.join(__dirname, 'generatedProducts.json');

// Function to seed the database
async function seedProducts() {
  // Create a new MongoDB client
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log('Connected to MongoDB');

    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read the products.json file
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');

    // Parse the JSON data
    const products = JSON.parse(productsData);

    // Insert the products into the MongoDB collection
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products inserted successfully!`);
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seed function
module.exports = seedProducts;
