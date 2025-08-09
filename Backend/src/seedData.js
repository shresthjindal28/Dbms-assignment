const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 50,
    views: 0,
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS navigation, sleep analysis, and 7-day battery life. Water-resistant and compatible with all smartphones.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 25,
    views: 0,
    category: 'Wearables',
    brand: 'FitTech'
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree surround sound, 20-hour battery life, and built-in microphone for hands-free calls. Perfect for outdoor adventures.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    stock: 30,
    views: 0,
    category: 'Electronics',
    brand: 'SoundWave'
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. 15W fast charging, LED indicator, and sleek design. Charges phones, earbuds, and smartwatches.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    stock: 100,
    views: 0,
    category: 'Accessories',
    brand: 'ChargePro'
  },
  {
    name: 'USB-C Laptop Charger',
    description: '65W fast charging USB-C adapter for laptops and mobile devices. Compact design, multiple safety protections, and universal compatibility.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400',
    stock: 75,
    views: 0,
    category: 'Accessories',
    brand: 'PowerTech'
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with customizable switches, macro keys, and premium build quality. Perfect for gaming and productivity with tactile feedback.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
    stock: 20,
    views: 0,
    category: 'Gaming',
    brand: 'GameMaster'
  },
  {
    name: '4K Ultra HD Smart TV',
    description: '55-inch 4K Ultra HD Smart TV with HDR, built-in streaming apps, and voice control. Crystal clear picture quality and immersive sound experience.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    stock: 15,
    views: 0,
    category: 'Electronics',
    brand: 'VisionTech'
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with 25K DPI sensor, customizable RGB lighting, and 70-hour battery life. Perfect for competitive gaming.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    stock: 35,
    views: 0,
    category: 'Gaming',
    brand: 'GameMaster'
  },
  {
    name: 'Smart Home Security Camera',
    description: '1080p HD security camera with night vision, motion detection, and two-way audio. Connects to your smartphone for remote monitoring.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    stock: 40,
    views: 0,
    category: 'Smart Home',
    brand: 'SecureHome'
  },
  {
    name: 'Portable Power Bank',
    description: '20,000mAh portable power bank with fast charging, multiple USB ports, and LED display. Charges phones, tablets, and laptops on the go.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=400',
    stock: 60,
    views: 0,
    category: 'Accessories',
    brand: 'PowerTech'
  },
  {
    name: 'Bluetooth Earbuds',
    description: 'True wireless earbuds with active noise cancellation, 24-hour battery life, and premium sound quality. Perfect for workouts and daily use.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    stock: 45,
    views: 0,
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    name: 'Gaming Headset',
    description: '7.1 surround sound gaming headset with noise-canceling microphone, RGB lighting, and comfortable memory foam ear cushions.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
    stock: 30,
    views: 0,
    category: 'Gaming',
    brand: 'GameMaster'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/solo-seller-marketplace', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
