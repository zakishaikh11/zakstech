import React, { useState } from 'react';
import {Link} from 'react-router-dom';
const AdminProductForm = () => {
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [featured, setFeatured] = useState(false);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      product_id: productId,
      title,
      price,
      description,
      details,
      image,
      image2,
      image3,
      image4,
      featured,
      brand,
      category_name: category, // Changed from category to category_name
      stock,
      specifications: Object.fromEntries(specifications.map(({ key, value }) => [key, value])),
    };


    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product added successfully!');
        // Clear the form
        setProductId('');
        setTitle('');
        setPrice('');
        setDescription('');
        setDetails('');
        setImage('');
        setImage2('');
        setImage3('');
        setImage4('');
        setFeatured(false);
        setBrand('');
        setStock('');
        setSpecifications([{ key: '', value: '' }]);
      } else {
        const data = await response.json();
        alert(`Failed to add product: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Error adding product');
    }
  };

  const addSpecification = () => {
    if (specifications.length < 6) {
      setSpecifications([...specifications, { key: '', value: '' }]);
    }
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      
      <div className="bg-gray-800 my-10 p-10 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="productId">
              Product ID
            </label>
            <input
              id="productId"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="details">
              Details
            </label>
            <textarea
              id="details"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="image">
              Main Image URL
            </label>
            <input
              id="image"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="image2">
              Image 2 URL
            </label>
            <input
              id="image2"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="image3">
              Image 3 URL
            </label>
            <input
              id="image3"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="image4">
              Image 4 URL
            </label>
            <input
              id="image4"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="brand">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="featured">
              Featured
            </label>
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
          </div>


          <div className="space-y-2">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  className="bg-gray-700 text-white text-lg font-semibold w-1/2 py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                />
                <input
                  type="text"
                  className="bg-gray-700 text-white text-lg font-semibold w-1/2 py-2 px-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Add Specification
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
