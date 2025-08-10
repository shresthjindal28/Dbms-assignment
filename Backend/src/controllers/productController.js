const Product = require('../models/Product');
const { getRedis } = require('../config/redis');

exports.getProducts = async (req, res) => {
  try {
    const redis = getRedis();
    if (redis) {
      const cached = await redis.get('products');
      if (cached) return res.json(JSON.parse(cached));
    }
    
    const products = await Product.find();
    
    if (redis) {
      await redis.set('products', JSON.stringify(products), 'EX', 60);
    }
    
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    product.views++;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const productData = { ...req.body, stock: 1 };
    const product = new Product(productData);
    await product.save();
    const redis = getRedis();
    if (redis) {
      await redis.del('products');
    }
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body, stock: 1 };
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    const redis = getRedis();
    if (redis) {
      await redis.del('products');
    }
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    const redis = getRedis();
    if (redis) {
      await redis.del('products');
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
