const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware — should be before routes
app.use(cors());
app.use(express.json()); // Important to parse req.body

// ✅ Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// ✅ Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
