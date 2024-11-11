// server/routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

router.get('/', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ message: error.message });
    }
  });

// Register a new customer
router.post('/register', async (req, res) => {
    const { username, email, name, phone, password } = req.body;
    
    if (!username || !email || !name || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const customer = new Customer({ username, email, name, phone, password });
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const customer = await Customer.findOne({ username });

        if (!customer || customer.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Send the user data
        res.status(200).json({ user: { name: customer.name, username: customer.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
