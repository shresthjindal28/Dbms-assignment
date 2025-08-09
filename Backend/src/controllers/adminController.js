const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAnalytics = async (req, res) => {
  try {
    const totalSales = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalViews = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const mostViewed = await Product.find().sort({ views: -1 }).limit(1);
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } }).countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({ 
      totalSales, 
      totalProducts,
      totalViews: totalViews[0]?.total || 0,
      totalRevenue: totalRevenue[0]?.total || 0,
      lowStockProducts,
      mostViewed: mostViewed[0] 
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      updatedAt: new Date()
    };
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      updatedAt: new Date()
    };
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      productData, 
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10 } });
    const outOfStockProducts = await Product.countDocuments({ stock: 0 });
    const totalViews = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);

    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      totalViews: totalViews[0]?.total || 0,
      categoryStats
    });
  } catch (err) {
    console.error('Error fetching product stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
