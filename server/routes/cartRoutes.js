const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

// Route to add product to cart
// Route to add product to cart
router.post('/add', async (req, res) => {
  console.log('Received data:', req.body);

  const { username, product_id, price, quantity } = req.body;

  if (!username || !product_id || quantity === undefined || price === undefined) {
    return res.status(400).json({ message: 'Username, product ID, price, and quantity are required' });
  }

  const total = price * quantity; // Calculate the total

  try {
    const existingCart = await Cart.findOne({ username });

    if (existingCart) {
      const productIndex = existingCart.items.findIndex(item => item.product_id === product_id);
      if (productIndex > -1) {
        // Update existing product in cart
        existingCart.items[productIndex].quantity += quantity;
        existingCart.items[productIndex].price = price;
        existingCart.items[productIndex].total = existingCart.items[productIndex].quantity * existingCart.items[productIndex].price;
      } else {
        // Add new product to cart
        existingCart.items.push({
          product_id,
          price,
          quantity,
          total,
        });
      }
      await existingCart.save();
    } else {
      // Create new cart
      const newCart = new Cart({
        username,
        items: [{
          product_id,
          price,
          quantity,
          total,
        }],
      });
      await newCart.save();
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to get cart by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const cart = await Cart.findOne({ username });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Route to update cart item quantity
router.put('/update', async (req, res) => {
  const { username, product_id, quantity, price } = req.body;

  if (!username || !product_id || quantity === undefined) {
    return res.status(400).json({ message: 'Username, product ID, and quantity are required' });
  }

  try {
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product_id === product_id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    item.price = price; // Price remains the same
    item.total = item.price * item.quantity; // Update total price based on new quantity
    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart item:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Route to remove item from cart
router.delete('/remove', async (req, res) => {
  const { username, product_id } = req.body;

  if (!username || !product_id) {
    return res.status(400).json({ message: 'Username and product ID are required' });
  }

  try {
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product_id === product_id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


module.exports = router;
