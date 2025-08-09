const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Mock products data
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
  },
  {
    _id: '4',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    stock: 100,
    views: 0
  },
  {
    _id: '5',
    name: 'USB-C Laptop Charger',
    description: '65W fast charging USB-C adapter for laptops and mobile devices.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400',
    stock: 75,
    views: 0
  },
  {
    _id: '6',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with customizable switches and macro keys.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
    stock: 20,
    views: 0
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Solo Seller Marketplace API - Simple Server' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});
