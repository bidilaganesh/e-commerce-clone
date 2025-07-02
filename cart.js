const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Save or update cart
router.post('/save', async (req, res) => {
  const { userId, items } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { upsert: true, new: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cart' });
  }
});

// Example cart route
router.get('/', (req, res) => {
  res.json({ message: 'Cart route working' });
});

module.exports = router;

module.exports = router;
