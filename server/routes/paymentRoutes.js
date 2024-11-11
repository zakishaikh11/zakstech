const express = require('express');
const router = express.Router()
const Payment = require('../models/paymentModel');


// POST: Add new payment
router.post('/add', async (req, res) => {
  try {
    const { username, totalAmount, cardNumber, expiryDate, cvv } = req.body;

    // Simple validation
    if (!username || !totalAmount || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save the payment
    const newPayment = new Payment({
      username,
      totalAmount,
      cardNumber,
      expiryDate,
      cvv
    });
    await newPayment.save();

    res.status(201).json({ message: 'Payment recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
