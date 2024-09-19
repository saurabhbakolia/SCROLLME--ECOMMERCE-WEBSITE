const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

// Apply authMiddleware to protect the cart routes
router.use(authMiddleware);

// Route to add items to the cart
router.post("/add", cartController.addToCart);

// Route to view the cart
router.get("/view", cartController.viewCart);

// Route to update an item in the cart
router.put("/update", cartController.updateCartItem);

// Route to delete an item from the cart
router.delete("/delete", cartController.deleteCartItem);

// Route to clear the cart
router.delete("/clear", authMiddleware, cartController.clearCart);

module.exports = router;
