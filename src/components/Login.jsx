// src/components/Login.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './Images/zakstechLogo.png';
import { loginCustomer } from '../api'; // Adjust path if necessary

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await loginCustomer(username, password); 
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Logged in successfully!');
            navigate('/');
          } else {
            setError(data.message || 'Login failed');
          }
        } catch (err) {
          setError('An error occurred');
        }
      };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <div className="bg-gray-800 p-10 rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-500 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="logo" className="w-36" />
                </div>
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Welcome Back!</h2>
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
                            placeholder="Enter your Username"
                            required
                        />
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-700 text-white text-lg font-semibold w-full py-3 px-4 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            placeholder="Enter your Password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <Link to="/register" className="text-blue-400 hover:underline">
                            New User? Register
                        </Link>
                        <Link to="/forgot-password" className="text-blue-400 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-lg font-bold py-3 rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
