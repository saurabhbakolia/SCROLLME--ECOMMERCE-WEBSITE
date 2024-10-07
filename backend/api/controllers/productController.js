const Product = require('../models/productModel');

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to add product',
    });
  }
};


// Controller to list all products
exports.listProducts = async (req, res) => {
  try {
    // Get page and limit from the query parameters, default to page 1 and limit 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of products to skip
    const skip = (page - 1) * limit;

    // Fetch products with limit and skip for pagination
    const products = await Product.find().skip(skip).limit(limit);

    // Count total number of products to provide pagination info
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to list products',
    });
  }
};

// Controller to get details of a product by its ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product)
      return res.status(404).json({
        error: 'Product not found',
      });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to get product',
    });
  }
};

// Controller to update a product by its ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    if (!product)
      return res.status(404).json({
        error: 'Product not found',
      });

    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to update product',
    });
  }
};

// Controller to delete a product by its ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product)
      return res.status(404).json({
        error: 'Product not found',
      });

    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Failed to delete product',
    });
  }
};
