const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		trim: true,
	},
	stock: {
		type: Number,
		default: 0,
	},
	imageUrl: {
		type: String,
		trim: true,
	},
	brand: {
		type: String,
		trim: true,
	},
	weight: {
		type: Number,
		default: 0,
	},
	dimensions: {
		length: {
			type: Number,
			default: 0,
		},
		width: {
			type: Number,
			default: 0,
		},
		height: {
			type: Number,
			default: 0,
		},
	},
	material: {
		type: String,
		trim: true,
	},
	color: {
		type: String,
		trim: true,
	},
	ratings: {
		averageRating: {
			type: Number,
			default: 0,
		},
		numberOfReviews: {
			type: Number,
			default: 0,
		},
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// Middleware to update `updatedAt` before saving
ProductSchema.pre("save", function (next) {
	this.updatedAt = Date.now();
	next();
});

// Create and export the Product model
module.exports = mongoose.model("Product", ProductSchema);
