const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
