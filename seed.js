// server/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

dotenv.config();

const products = [
  {
    title: "iPhone 14 Pro",
    description: "Apple smartphone with A16 Bionic chip.",
    price: 129999,
    image: "https://via.placeholder.com/200x200.png?text=iPhone+14+Pro"
  },
  {
    title: "Samsung Galaxy S24",
    description: "Samsung flagship phone with stunning display.",
    price: 99999,
    image: "https://via.placeholder.com/200x200.png?text=Galaxy+S24"
  },
  {
    title: "OnePlus 12",
    description: "Fast and smooth Android phone.",
    price: 69999,
    image: "https://via.placeholder.com/200x200.png?text=OnePlus+12"
  }
];

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  await Product.deleteMany();
  console.log('🗑️ Cleared existing products');

  await Product.insertMany(products);
  console.log('🎉 Dummy products inserted!');

  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Error inserting products:', err);
});
