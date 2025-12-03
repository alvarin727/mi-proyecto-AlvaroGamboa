const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  discount: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
