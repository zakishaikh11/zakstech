const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  details: { type: String },
  image: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  featured: { type: Boolean, default: false },
  brand: { type: String },
  category_name: { type: String }, 
  stock: { type: Number, required: true },
  specifications: { type: Map, of: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;