require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("node:fs");
const path = require("node:path");

// MongoDB URI
const uri = "mongodb://127.0.0.1:27017/scrollme";
if (!uri) {
	throw new Error("MONGODB_URI is not defined");
}

// Database and Collection names
const dbName = "scrollme";
const collectionName = "brands";

// Path to the brands.json file
const brandsFilePath = path.join(__dirname, "brands.json");

// Function to seed the database
async function seedBrands() {
	// Create a new MongoDB client
	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB client
		await client.connect();
		console.log("Connected to MongoDB");

		// Select the database and collection
		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		// Read the brands.json file
		const brandsData = fs.readFileSync(brandsFilePath, "utf-8");
		console.log("brandsData", brandsData);

		// Parse the JSON data
		const brands = JSON.parse(brandsData);

		// Insert the brands into the MongoDB collection
		const result = await collection.insertMany(brands);
		console.log(`${result.insertedCount} brands inserted successfully!`);
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		// Close the MongoDB connection
		await client.close();
		console.log("MongoDB connection closed");
	}
}

// Run the seed function
seedBrands();
