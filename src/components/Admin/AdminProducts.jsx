// src/components/admin/AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${product_id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Update the product list after deletion
      setProducts(products.filter(product => product.product_id !== product_id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Admin Products</h2>
      <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Add New Product
      </Link>
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="w-full bg-gray-700 text-white">
            <th className="py-2 px-4">Product ID</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id} className="bg-gray-800 text-white border-b border-gray-600">
              <td className="py-2 px-4">{product.product_id}</td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                <Link to={`/admin/products/edit/${product.product_id}`} className="text-yellow-500 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(product.product_id)} className="text-red-500 hover:underline ml-4">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
