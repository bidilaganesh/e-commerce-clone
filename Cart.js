const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // 1 cart per user
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
