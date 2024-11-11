// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

router.post('/submit', async (req, res) => {
  const { name, email, message, description } = req.body;
  console.log(req.body);
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      message,
      description,
    });

    await newContact.save();

    res.status(200).json({ message: 'Thank you for contacting us!' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ message: 'An error occurred while saving your message.' });
  }
});

module.exports = router;
