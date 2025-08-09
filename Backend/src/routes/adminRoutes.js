const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const clerkAuth = require('../middlewares/auth');

// Analytics routes
router.get('/analytics', clerkAuth, adminController.getAnalytics);
router.get('/product-stats', clerkAuth, adminController.getProductStats);

// Product management routes
router.get('/products', clerkAuth, adminController.getAllProducts);
router.get('/products/:id', clerkAuth, adminController.getProductById);
router.post('/products', clerkAuth, adminController.createProduct);
router.put('/products/:id', clerkAuth, adminController.updateProduct);
router.delete('/products/:id', clerkAuth, adminController.deleteProduct);

module.exports = router;
