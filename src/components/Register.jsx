// src/components/Register.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './Images/zakstechLogo.png';
import { registerCustomer } from '../api'; // Adjust the path if necessary

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerCustomer({ username, email, name, phone, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500 w-full max-w-md my-10 hover:shadow-md hover:shadow-white">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-36" />
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Create Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="text-white text-center mb-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login Now
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-lg font-bold py-3 rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
