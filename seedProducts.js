const mongoose = require('mongoose');
const Product = require('../models/product');
const inserted = await Product.insertMany(sampleProducts);
console.log('✅ Inserted products:', inserted);


const MONGO_URL = 'mongodb://127.0.0.1:27017/ecommerce_clone';
 // or from your .env
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    price: 1999,
    image: 'https://via.placeholder.com/200x150.png?text=Headphones',
  },
  {
    name: 'Smart Watch',
    price: 2999,
    image: 'https://via.placeholder.com/200x150.png?text=Smart+Watch',
  },
  {
    name: 'Bluetooth Speaker',
    price: 1499,
    image: 'https://via.placeholder.com/200x150.png?text=Speaker',
  },
  {
    name: 'USB Charger',
    price: 499,
    image: 'https://via.placeholder.com/200x150.png?text=Charger',
  },
];

const seedDB = async () => {
  await Product.deleteMany();
  await Product.insertMany(sampleProducts);
  console.log('✅ Sample products inserted');
  mongoose.disconnect();
};

seedDB();
