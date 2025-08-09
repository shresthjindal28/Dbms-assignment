require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const { connectRedis } = require('./config/redis');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

// CORS configuration - allow only https://solo-seller.netlify.app
app.use(cors({
  origin: 'https://solo-seller.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Connect to databases with fallback
try {
  connectDB();
  connectRedis();
} catch (error) {
  console.warn('Database connection failed, continuing without database:', error.message);
}

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

// Mock products endpoint for testing without database
app.get('/api/products/mock', (req, res) => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      stock: 50,
      views: 0
    },
    {
      _id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with heart rate monitoring, GPS, and sleep tracking.',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      stock: 25,
      views: 0
    },
    {
      _id: '3',
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery.',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      stock: 30,
      views: 0
    }
  ];
  res.json(mockProducts);
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Solo Seller Marketplace API');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
