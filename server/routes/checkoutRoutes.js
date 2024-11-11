const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const { username, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const newOrder = new Order({
      order_id: generateOrderId(), // Assuming you have a function for this
      username,  // Use username instead of customer_id
      cartItems,
      total_amount: totalPrice,
      shippingAddress,
      paymentMethod
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch cart details for a user
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
