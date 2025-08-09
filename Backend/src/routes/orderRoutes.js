const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.post('/verify-payment', orderController.verifyPaymentAndSetOutOfStock);
router.get('/track', orderController.trackOrder);
router.get('/user', orderController.getUserOrders);
router.get('/', orderController.getOrders); // Admin
router.put('/:id/status', orderController.updateOrderStatus); // Admin

module.exports = router;
