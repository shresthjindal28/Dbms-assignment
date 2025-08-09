const Order = require('../models/Order');
const Product = require('../models/Product');
const { getRedis } = require('../config/redis');
const dummyPaymentService = require('../services/dummyPaymentService');

// Create order (with stock lock and dummy payment)
exports.createOrder = async (req, res) => {
  const { productId, userEmail } = req.body;
  const redis = getRedis();
  try {
    // Stock lock: atomic decrement
    const lockKey = `lock:product:${productId}`;
    const isLocked = await redis.set(lockKey, 1, 'NX', 'EX', 10);
    if (!isLocked) return res.status(409).json({ error: 'Product is being purchased by someone else' });
    const product = await Product.findById(productId);
    if (!product || product.stock < 1) {
      await redis.del(lockKey);
      return res.status(400).json({ error: 'Out of stock' });
    }
    // Dummy payment: always success
    const payment = await dummyPaymentService.createOrder(product.price || 100); // fallback price
    // Mark product as sold
    product.stock = 0;
    await product.save();
    await redis.del('products');
    const order = new Order({
      product: productId,
      userEmail,
  paymentId: payment.id,
    });
    await order.save();
    await redis.del(lockKey);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order failed' });
  }
};

// Track order
exports.trackOrder = async (req, res) => {
  const { orderId, email } = req.query;
  try {
    const order = await Order.findOne({ _id: orderId, userEmail: email }).populate('product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};
