const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:  { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  lineTotal: { type: Number, required: true, min: 0 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cuponId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' },
  items:   { type: [OrderItemSchema], required: true, validate: v => v.length > 0 },
  subtotal:{ type: Number, required: true, min: 0 },
  discount:{ type: Number, required: true, min: 0 },
  total:   { type: Number, required: true, min: 0 },
  status:  { type: String, enum: ['PENDING','PAID','CANCELED'], default: 'PENDING' },
  paidAt:  { type: Date }
});

module.exports = mongoose.model('Order', OrderSchema);
