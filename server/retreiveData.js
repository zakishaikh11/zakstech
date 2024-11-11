const mongoose = require('mongoose');

// MongoDB connection URI
const dbURI = "mongodb+srv://zakishaikh9786:zakishaikh123@cluster0.vqm7f.mongodb.net/zakstechDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');

    // Define the schema for the product collection
    const productSchema = new mongoose.Schema({
      product_id: String,
      title: String,
      price: Number,
      description: String,
      details: String,
      image: String,
      image2: String,
      image3: String,
      image4: String,
      category_id: String,
      specifications: {
        processor: String,
        ram: String,
        storage: String,
        display_size: String,
        operating_system: String,
        weight: String
      }
    });

    // Create a model for the products collection
    const Product = mongoose.model('Product', productSchema);

    // Retrieve and print all products from the collection
    Product.find()
      .then(products => {
        console.log('Retrieved Products:', products);
        mongoose.connection.close(); // Close the connection
      })
      .catch(error => {
        console.error('Error retrieving products:', error.message);
        mongoose.connection.close(); // Close the connection
      });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error.message);
  });
