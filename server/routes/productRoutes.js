const express = require('express');
const Product = require('../models/productModel');
const router = express.Router();

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  const { price_min, price_max, category, brand, sort, featured, ratings } = req.query;

  let filter = {};

  if (price_min || price_max) {
    filter.price = {};
    if (price_min) filter.price.$gte = parseFloat(price_min);
    if (price_max) filter.price.$lte = parseFloat(price_max);
  }

  if (category) filter.category_name = category;
  if (brand) filter.brand = brand;
  if (featured) filter.featured = featured === 'true';
  if (ratings) filter.ratings = { $gte: parseFloat(ratings) }; // Assuming ratings are stored

  let sortOption = {};
  if (sort === 'price_asc') sortOption.price = 1;
  else if (sort === 'price_desc') sortOption.price = -1;
  else if (sort === 'newest') sortOption.createdAt = -1;
  else if (sort === 'oldest') sortOption.createdAt = 1;
  else if (sort === 'best_sellers') sortOption.sales = -1; // Assuming sales field exists

  try {
    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const {
    product_id, title, price, description, details, image,
    image2, image3, image4, featured, category_name, specifications,
    brand, stock
  } = req.body;

  // Validate required fields
  if (!product_id || !title || !price || !category_name || !brand) {
    return res.status(400).json({ message: 'Product ID, title, price, category name, and brand are required' });
  }

  try {
    // Check if a product with the same product_id already exists
    const existingProduct = await Product.findOne({ product_id });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product ID already exists' });
    }

    const product = new Product({
      product_id, title, price, description, details, image,
      image2, image3, image4, featured, category_name, specifications,
      brand, stock
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific product by product_id
router.get('/:product_id', async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.product_id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:product_id', async (req, res) => {
  const { product_id } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ product_id: product_id });
    if (!deletedProduct) {
      console.log(`Product not found: ${product_id}`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`Deleted product: ${deletedProduct}`);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;