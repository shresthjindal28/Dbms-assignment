const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const mockAuth = require('../middlewares/mockAuth');

// Analytics routes
router.get('/analytics', mockAuth, adminController.getAnalytics);
router.get('/product-stats', mockAuth, adminController.getProductStats);

// Product management routes
router.get('/products', mockAuth, adminController.getAllProducts);
router.get('/products/:id', mockAuth, adminController.getProductById);
router.post('/products', mockAuth, adminController.createProduct);
router.put('/products/:id', mockAuth, adminController.updateProduct);
router.delete('/products/:id', mockAuth, adminController.deleteProduct);

module.exports = router;
