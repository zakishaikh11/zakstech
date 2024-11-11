const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

// Add a new review
router.post('/add', async (req, res) => {
  const { username, product_id, rating, comment } = req.body;
  try {
    const newReview = new Review({ username, product_id, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Get all reviews for a product and calculate average rating
router.get('/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    const reviews = await Review.find({ product_id });
    
    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0, reviewCount: 0, reviews: [] });
    }

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    const reviewCount = reviews.length;

    res.status(200).json({ averageRating, reviewCount, reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
