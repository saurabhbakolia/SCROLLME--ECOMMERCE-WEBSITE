const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

// Route to add a new product (only for admins)
router.post('/add', authMiddleware, productController.addProduct);

// Route to get a list of all products
router.get('/list', productController.listProducts);

// Route to get details of a specific product by its ID
router.get('/:productId', productController.getProductById);

// Route to update a product (only for admins)
router.put(
  '/update/:productId',
  // authMiddleware,
  productController.updateProduct
);

// Route to delete a product (only for admins)
router.delete(
  '/delete/:productId',
  authMiddleware,
  productController.deleteProduct
);

// Export the router
module.exports = router;
module.exports = router;