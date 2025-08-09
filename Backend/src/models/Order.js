const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true }
  }],
  userEmail: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
  paymentId: String,
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    postalCode: String
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
