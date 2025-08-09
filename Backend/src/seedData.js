const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Helper to generate random products
// List of specific products with relevant names, images, and descriptions
const productTemplates = [
  {
    "id": 1,
    "name": "Eco-friendly Paintings Coaster",
    "description": "This eco-friendly coaster is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 2,
    "name": "Elegant Woodcraft Lamp",
    "description": "This elegant lamp is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/2081203/pexels-photo-2081203.jpeg?auto=compress&w=600&h=600&fit=crop", // Painting 5
  },
  {
    "id": 3,
    "name": "Luxury Woodcraft Bag",
    "description": "This luxury bag is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/461436/pexels-photo-461436.jpeg?auto=compress&w=600&h=600&fit=crop", // Coaster 3
  },
  {
    "id": 4,
    "name": "Vintage Resin Art Wallet",
    "description": "This vintage wallet is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/1799436/pexels-photo-1799436.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 5,
    "name": "Modern Woodcraft Scarf",
    "description": "This modern scarf is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/461437/pexels-photo-461437.jpeg?auto=compress&w=600&h=600&fit=crop", // Bowl 4
  },
  {
    "id": 6,
    "name": "Bohemian Glass Art Bowl",
    "description": "This bohemian bowl is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 7,
    "name": "Rustic Resin Art Painting",
    "description": "This rustic painting is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/1374128/pexels-photo-1374128.jpeg?auto=compress&w=600&h=600&fit=crop", // Bracelet 4
  },
  {
    "id": 8,
    "name": "Luxury Knitted Clothing Lamp",
    "description": "This luxury lamp is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 9,
    "name": "Minimalist Leather Goods Lamp",
    "description": "This minimalist lamp is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
  "image": "https://images.pexels.com/photos/271818/pexels-photo-271818.jpeg?auto=compress&w=600&h=600&fit=crop", // Lamp 3
  },
  {
    "id": 10,
    "name": "Elegant Glass Art Scarf",
    "description": "This elegant scarf is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Scarf",
    "stock": 1
  },
  {
    "id": 11,
    "name": "Bohemian Paintings Painting",
    "description": "This bohemian painting is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 12,
    "name": "Luxury Home Decor Coaster",
    "description": "This luxury coaster is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/1799439/pexels-photo-1799439.jpeg?auto=compress&w=600&h=600&fit=crop", // Wallet 4
  },
  {
    "id": 13,
    "name": "Artisan Embroidery Bowl",
    "description": "This artisan bowl is a one-of-a-kind embroidery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 14,
    "name": "Unique Resin Art Bowl",
    "description": "This unique bowl is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 15,
    "name": "Minimalist Leather Goods Bracelet",
    "description": "This minimalist bracelet is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bracelet",
    "stock": 1
  },
  {
    "id": 16,
    "name": "Vintage Ceramic Pottery Lamp",
    "description": "This vintage lamp is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/934072/pexels-photo-934072.jpeg?auto=compress&w=600&h=600&fit=crop", // Scarf 3
  },
  {
    "id": 17,
    "name": "Rustic Woodcraft Bracelet",
    "description": "This rustic bracelet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bracelet",
    "stock": 1
  },
  {
    "id": 18,
    "name": "Luxury Knitted Clothing Vase",
    "description": "This luxury vase is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=600&h=600&fit=crop",
  "image": "https://images.pexels.com/photos/1191534/pexels-photo-1191534.jpeg?auto=compress&w=600&h=600&fit=crop", // Necklace 4
  },
  {
    "id": 19,
    "name": "Luxury Home Decor Vase",
    "description": "This luxury vase is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 20,
    "name": "Luxury Glass Art Painting",
    "description": "This luxury painting is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 21,
    "name": "Vintage Embroidery Bracelet",
    "description": "This vintage bracelet is a one-of-a-kind embroidery item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/1374125/pexels-photo-1374125.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 22,
    "name": "Luxury Resin Art Vase",
    "description": "This luxury vase is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 23,
    "name": "Minimalist Glass Art Painting",
    "description": "This minimalist painting is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 24,
    "name": "Bohemian Leather Goods Bowl",
    "description": "This bohemian bowl is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 25,
    "name": "Modern Paintings Bag",
    "description": "This modern bag is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 26,
    "name": "Eco-friendly Glass Art Coaster",
    "description": "This eco-friendly coaster is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Coaster",
    "stock": 1
  },
  {
    "id": 27,
    "name": "Luxury Woodcraft Wallet",
    "description": "This luxury wallet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/1799436/pexels-photo-1799436.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 28,
    "name": "Modern Home Decor Bag",
    "description": "This modern bag is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 29,
    "name": "Modern Woodcraft Scarf",
    "description": "This modern scarf is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 30,
    "name": "Eco-friendly Woodcraft Wallet",
    "description": "This eco-friendly wallet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 31,
    "name": "Bohemian Home Decor Necklace",
    "description": "This bohemian necklace is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/1191535/pexels-photo-1191535.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 32,
    "name": "Artisan Leather Goods Bracelet",
    "description": "This artisan bracelet is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bracelet",
    "stock": 1
  },
  {
    "id": 33,
    "name": "Unique Handmade Jewelry Bracelet",
    "description": "This unique bracelet is a one-of-a-kind handmade jewelry item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/1374129/pexels-photo-1374129.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 34,
    "name": "Unique Home Decor Bag",
    "description": "This unique bag is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 35,
    "name": "Rustic Embroidery Painting",
    "description": "This rustic painting is a one-of-a-kind embroidery item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/2081204/pexels-photo-2081204.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 36,
    "name": "Minimalist Woodcraft Bag",
    "description": "This minimalist bag is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 37,
    "name": "Bohemian Leather Goods Necklace",
    "description": "This bohemian necklace is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 38,
    "name": "Eco-friendly Leather Goods Necklace",
    "description": "This eco-friendly necklace is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  },
  {
    "id": 39,
    "name": "Bohemian Paintings Bowl",
    "description": "This bohemian bowl is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/461438/pexels-photo-461438.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 40,
    "name": "Rustic Ceramic Pottery Scarf",
    "description": "This rustic scarf is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Scarf",
    "stock": 1
  },
  {
    "id": 41,
    "name": "Elegant Home Decor Scarf",
    "description": "This elegant scarf is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/934073/pexels-photo-934073.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 42,
    "name": "Eco-friendly Resin Art Painting",
    "description": "This eco-friendly painting is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 43,
    "name": "Artisan Glass Art Bag",
    "description": "This artisan bag is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/322211/pexels-photo-322211.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 44,
    "name": "Minimalist Handmade Jewelry Bowl",
    "description": "This minimalist bowl is a one-of-a-kind handmade jewelry item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 45,
    "name": "Rustic Leather Goods Painting",
    "description": "This rustic painting is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/2081205/pexels-photo-2081205.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 46,
    "name": "Modern Home Decor Vase",
    "description": "This modern vase is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 47,
    "name": "Eco-friendly Ceramic Pottery Bag",
    "description": "This eco-friendly bag is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/322212/pexels-photo-322212.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 48,
    "name": "Bohemian Woodcraft Bracelet",
    "description": "This bohemian bracelet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/1374125/pexels-photo-1374125.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 49,
    "name": "Modern Home Decor Bracelet",
    "description": "This modern bracelet is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/1374130/pexels-photo-1374130.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 50,
    "name": "Vintage Woodcraft Lamp",
    "description": "This vintage lamp is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://images.pexels.com/photos/322213/pexels-photo-322213.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 51,
    "name": "Bohemian Glass Art Painting",
    "description": "This bohemian painting is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 52,
    "name": "Luxury Home Decor Bowl",
    "description": "This luxury bowl is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 53,
    "name": "Eco-friendly Home Decor Necklace",
    "description": "This eco-friendly necklace is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
  "image": "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&w=600&h=600&fit=crop",
    "stock": 1
  },
  {
    "id": 54,
    "name": "Modern Knitted Clothing Bowl",
    "description": "This modern bowl is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 55,
    "name": "Unique Glass Art Wallet",
    "description": "This unique wallet is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 56,
    "name": "Artisan Glass Art Bowl",
    "description": "This artisan bowl is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 57,
    "name": "Modern Leather Goods Necklace",
    "description": "This modern necklace is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  },
  {
    "id": 58,
    "name": "Modern Glass Art Bag",
    "description": "This modern bag is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 59,
    "name": "Artisan Resin Art Bowl",
    "description": "This artisan bowl is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 60,
    "name": "Eco-friendly Resin Art Lamp",
    "description": "This eco-friendly lamp is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 61,
    "name": "Unique Woodcraft Lamp",
    "description": "This unique lamp is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 62,
    "name": "Vintage Ceramic Pottery Lamp",
    "description": "This vintage lamp is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 63,
    "name": "Vintage Leather Goods Bowl",
    "description": "This vintage bowl is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 64,
    "name": "Unique Leather Goods Painting",
    "description": "This unique painting is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 65,
    "name": "Modern Home Decor Bag",
    "description": "This modern bag is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 66,
    "name": "Artisan Glass Art Painting",
    "description": "This artisan painting is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 67,
    "name": "Unique Home Decor Coaster",
    "description": "This unique coaster is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Coaster",
    "stock": 1
  },
  {
    "id": 68,
    "name": "Minimalist Home Decor Vase",
    "description": "This minimalist vase is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 69,
    "name": "Rustic Leather Goods Bag",
    "description": "This rustic bag is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 70,
    "name": "Bohemian Leather Goods Painting",
    "description": "This bohemian painting is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 71,
    "name": "Unique Resin Art Wallet",
    "description": "This unique wallet is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 72,
    "name": "Artisan Resin Art Bowl",
    "description": "This artisan bowl is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 73,
    "name": "Vintage Ceramic Pottery Lamp",
    "description": "This vintage lamp is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 74,
    "name": "Bohemian Knitted Clothing Wallet",
    "description": "This bohemian wallet is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 75,
    "name": "Minimalist Glass Art Scarf",
    "description": "This minimalist scarf is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Scarf",
    "stock": 1
  },
  {
    "id": 76,
    "name": "Unique Resin Art Lamp",
    "description": "This unique lamp is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 77,
    "name": "Rustic Leather Goods Bag",
    "description": "This rustic bag is a one-of-a-kind leather goods item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 78,
    "name": "Bohemian Woodcraft Wallet",
    "description": "This bohemian wallet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 79,
    "name": "Unique Woodcraft Wallet",
    "description": "This unique wallet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 80,
    "name": "Modern Home Decor Coaster",
    "description": "This modern coaster is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Coaster",
    "stock": 1
  },
  {
    "id": 81,
    "name": "Modern Paintings Vase",
    "description": "This modern vase is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 82,
    "name": "Unique Glass Art Vase",
    "description": "This unique vase is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 83,
    "name": "Bohemian Knitted Clothing Painting",
    "description": "This bohemian painting is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Painting",
    "stock": 1
  },
  {
    "id": 84,
    "name": "Luxury Woodcraft Bracelet",
    "description": "This luxury bracelet is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bracelet",
    "stock": 1
  },
  {
    "id": 85,
    "name": "Vintage Handmade Jewelry Wallet",
    "description": "This vintage wallet is a one-of-a-kind handmade jewelry item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 86,
    "name": "Luxury Knitted Clothing Wallet",
    "description": "This luxury wallet is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Wallet",
    "stock": 1
  },
  {
    "id": 87,
    "name": "Elegant Embroidery Necklace",
    "description": "This elegant necklace is a one-of-a-kind embroidery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  },
  {
    "id": 88,
    "name": "Luxury Handmade Jewelry Necklace",
    "description": "This luxury necklace is a one-of-a-kind handmade jewelry item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  },
  {
    "id": 89,
    "name": "Luxury Paintings Vase",
    "description": "This luxury vase is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 90,
    "name": "Luxury Knitted Clothing Bowl",
    "description": "This luxury bowl is a one-of-a-kind knitted clothing item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 91,
    "name": "Eco-friendly Paintings Scarf",
    "description": "This eco-friendly scarf is a one-of-a-kind paintings item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Scarf",
    "stock": 1
  },
  {
    "id": 92,
    "name": "Eco-friendly Ceramic Pottery Necklace",
    "description": "This eco-friendly necklace is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  },
  {
    "id": 93,
    "name": "Vintage Ceramic Pottery Bag",
    "description": "This vintage bag is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 94,
    "name": "Luxury Resin Art Bowl",
    "description": "This luxury bowl is a one-of-a-kind resin art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 95,
    "name": "Rustic Handmade Jewelry Bowl",
    "description": "This rustic bowl is a one-of-a-kind handmade jewelry item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bowl",
    "stock": 1
  },
  {
    "id": 96,
    "name": "Minimalist Woodcraft Lamp",
    "description": "This minimalist lamp is a one-of-a-kind woodcraft item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Lamp",
    "stock": 1
  },
  {
    "id": 97,
    "name": "Rustic Ceramic Pottery Vase",
    "description": "This rustic vase is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Vase",
    "stock": 1
  },
  {
    "id": 98,
    "name": "Artisan Home Decor Bag",
    "description": "This artisan bag is a one-of-a-kind home decor item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bag",
    "stock": 1
  },
  {
    "id": 99,
    "name": "Artisan Ceramic Pottery Bracelet",
    "description": "This artisan bracelet is a one-of-a-kind ceramic pottery item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Bracelet",
    "stock": 1
  },
  {
    "id": 100,
    "name": "Artisan Glass Art Necklace",
    "description": "This artisan necklace is a one-of-a-kind glass art item, handcrafted with attention to detail and quality materials.",
    "image": "https://source.unsplash.com/600x600/?Necklace",
    "stock": 1
  }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function generateProductFromTemplate(template) {
  return {
    name: template.name,
    description: template.description,
    price: parseFloat((getRandomInt(10, 1000) + Math.random()).toFixed(2)),
    image: template.image,
    stock: getRandomInt(1, 100),
    views: getRandomInt(0, 1000),
    category: template.category,
    brand: template.brand,
    isActive: true
  };
}

// Generate products from templates, repeat templates if less than 100
const sampleProducts = Array.from({ length: 100 }, (_, i) => {
  const template = productTemplates[i % productTemplates.length];
  // Optionally, add a suffix to name/description for uniqueness if repeated
  const product = generateProductFromTemplate(template);
  if (i >= productTemplates.length) {
    product.name += ` (${i + 1})`;
    product.description += ` (Batch item ${i + 1})`;
  }
  return product;
});

const seedDatabase = async () => {
  try {
    // Connect to MongoDB Atlas using env variable
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert 100 dummy products
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
