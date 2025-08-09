const Order = require('../models/Order');
const Product = require('../models/Product');
const { getRedis } = require('../config/redis');
const dummyPaymentService = require('../services/dummyPaymentService');

// Create cart order (with stock lock and dummy payment)
exports.createOrder = async (req, res) => {
  const { items, userEmail, shippingAddress } = req.body;
  const redis = getRedis();
  try {
    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }
    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ error: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }
    // Create dummy payment
    const payment = await dummyPaymentService.createOrder(totalAmount);
    // Do NOT update stock here. Stock will be updated after payment verification.
    // Create order
    const order = new Order({
      items: orderItems,
      userEmail,
      totalAmount,
      paymentId: payment.id,
      shippingAddress
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Order failed' });
  }
};

// Verify payment and set product out of stock
exports.verifyPaymentAndSetOutOfStock = async (req, res) => {
  const { orderId, paymentId } = req.body;
  const redis = getRedis();
  try {
    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    // Verify payment (dummy always success)
    const paymentResult = await dummyPaymentService.verifyPayment(paymentId, orderId);
    if (paymentResult.status !== 'success') {
      return res.status(400).json({ error: 'Payment verification failed' });
    }
    // Set stock = 0 for each product in the order
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock = 0;
        await product.save();
      }
    }
    // Clear cache
    await redis.del('products');
    // Optionally update order status
    order.status = 'Processing';
    await order.save();
    res.json({ success: true, message: 'Payment verified and product set out of stock.' });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

// Track order
exports.trackOrder = async (req, res) => {
  const { orderId, email } = req.query;
  try {
    const order = await Order.findOne({ _id: orderId, userEmail: email }).populate('items.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('Fetching orders for email:', email);
    const orders = await Order.find({ userEmail: { $regex: `^${email}$`, $options: 'i' } })
      .populate('items.product')
      .sort({ createdAt: -1 });
    console.log('Orders found:', orders.length);
    if (orders.length > 0) {
      console.log('Order emails:', orders.map(o => o.userEmail));
    }
    res.json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
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
