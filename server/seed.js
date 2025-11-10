const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Laptop - Dell XPS 13',
    description: 'High-performance ultrabook with 11th Gen Intel Core i7 processor, 16GB RAM, 512GB SSD. Perfect for professionals and students.',
    price: 85000,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    stock: 15,
    ratings: 4.5,
    numReviews: 120
  },
  {
    name: 'Wireless Mouse - Logitech MX Master 3',
    description: 'Ergonomic wireless mouse with advanced tracking, customizable buttons, and long battery life.',
    price: 8500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    stock: 50,
    ratings: 4.7,
    numReviews: 85
  },
  {
    name: 'Mechanical Keyboard - Keychron K2',
    description: 'Compact 75% wireless mechanical keyboard with RGB backlight and hot-swappable switches.',
    price: 7500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 30,
    ratings: 4.6,
    numReviews: 64
  },
  {
    name: 'Smartphone - OnePlus 11',
    description: '5G smartphone with Snapdragon 8 Gen 2, 120Hz AMOLED display, 50MP camera, 8GB RAM, 128GB storage.',
    price: 56999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    stock: 25,
    ratings: 4.4,
    numReviews: 200
  },
  {
    name: 'Wireless Earbuds - Sony WF-1000XM4',
    description: 'Premium noise-canceling earbuds with Hi-Res audio, 24-hour battery life, and IPX4 water resistance.',
    price: 19990,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    stock: 40,
    ratings: 4.8,
    numReviews: 156
  },
  {
    name: 'Smart Watch - Apple Watch Series 8',
    description: 'Advanced health and fitness tracker with always-on Retina display, ECG, and crash detection.',
    price: 45900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    stock: 20,
    ratings: 4.7,
    numReviews: 312
  },
  {
    name: 'Men\'s Cotton T-Shirt',
    description: 'Premium quality 100% cotton round-neck t-shirt. Available in multiple colors. Comfortable and breathable.',
    price: 599,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 100,
    ratings: 4.2,
    numReviews: 45
  },
  {
    name: 'Women\'s Denim Jeans',
    description: 'Stylish high-waist denim jeans with stretch fabric for comfort. Perfect for casual wear.',
    price: 1499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    stock: 60,
    ratings: 4.3,
    numReviews: 78
  },
  {
    name: 'Running Shoes - Nike Air Zoom',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily runs.',
    price: 8999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 45,
    ratings: 4.6,
    numReviews: 142
  },
  {
    name: 'Yoga Mat - Premium Quality',
    description: 'Non-slip eco-friendly yoga mat with extra cushioning. Includes carrying strap. 6mm thickness.',
    price: 1299,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 75,
    ratings: 4.4,
    numReviews: 56
  },
  {
    name: 'Coffee Maker - French Press',
    description: 'Classic French press coffee maker with heat-resistant borosilicate glass. Makes 4 cups of rich coffee.',
    price: 1899,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 35,
    ratings: 4.5,
    numReviews: 89
  },
  {
    name: 'Indoor Plant - Money Plant',
    description: 'Beautiful air-purifying money plant in ceramic pot. Easy to maintain and perfect for home decor.',
    price: 499,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500',
    stock: 80,
    ratings: 4.7,
    numReviews: 34
  },
  {
    name: 'Book - Atomic Habits',
    description: 'Bestselling self-help book by James Clear. Learn how to build good habits and break bad ones.',
    price: 399,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    stock: 150,
    ratings: 4.9,
    numReviews: 523
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with 3 brightness levels and USB charging port. Energy-efficient and eye-friendly.',
    price: 2499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    stock: 55,
    ratings: 4.3,
    numReviews: 67
  },
  {
    name: 'Backpack - Travel & Laptop',
    description: 'Spacious 30L backpack with padded laptop compartment, multiple pockets, and water-resistant material.',
    price: 2999,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 40,
    ratings: 4.5,
    numReviews: 91
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${sampleProducts.length} products`);

    // Display products
    const products = await Product.find();
    console.log('\n📦 Seeded Products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();