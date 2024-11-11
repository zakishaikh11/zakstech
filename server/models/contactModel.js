// models/contactModel.js
const mongoose = require('mongoose');

// Define the schema for the contact form
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;