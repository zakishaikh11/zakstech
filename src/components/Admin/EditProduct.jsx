import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${product_id}`);
      if (!response.ok) {
        console.error('Error fetching product:', response.statusText);
        return;
      }
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [product_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/products/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert('Product updated successfully!');
    } else {
      alert('Failed to update product.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="bg-gray-200 w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="bg-gray-200 w-full p-2 rounded"
            required
          />
        </div>
        {/* Add more fields as needed */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
