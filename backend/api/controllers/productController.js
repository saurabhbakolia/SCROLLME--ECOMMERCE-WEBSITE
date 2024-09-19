const Product = require("../models/productModel");

// Controller to add a new product
exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            message: "Product added successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to add product"
        });
    }
};

// Controller to list all products
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: "Failed to list products"
        });
    }
};

// Controller to get details of a product by its ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get product"
        });
    }
};

// Controller to update a product by its ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update product"
        });
    }
};

// Controller to delete a product by its ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete product"
        });
    }
};