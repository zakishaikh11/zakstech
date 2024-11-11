// src/components/AdminCustomers.jsx
import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../../api'; // Adjust the import according to your file structure

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error loading customers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-4 text-center">Customers</h2>
      <p className="mb-4 text-center text-gray-600">Total Customers: {customers.length}</p>
      <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b-2 border-gray-300 p-4 text-left">Customer ID</th>
            <th className="border-b-2 border-gray-300 p-4 text-left">Username</th>
            <th className="border-b-2 border-gray-300 p-4 text-left">Name</th>
            <th className="border-b-2 border-gray-300 p-4 text-left">Email</th>
            <th className="border-b-2 border-gray-300 p-4 text-left">Phone</th>
            {/* You can add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
  <tr key={customer.customer_id}> {/* Ensure _id or any other unique identifier is used */}
    <td className="border-b border-gray-300 p-4">{customer._id}</td>
    <td className="border-b border-gray-300 p-4">{customer.username}</td>
    <td className="border-b border-gray-300 p-4">{customer.name}</td>
    <td className="border-b border-gray-300 p-4">{customer.email}</td>
    <td className="border-b border-gray-300 p-4">{customer.phone}</td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomers;
