import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Product from './components/Product';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import AdminDashoard from './components/Admin/AdminDashboard';
import AdminProductForm from './components/Admin/AdminProductForm';
import AdminProducts from './components/Admin/AdminProducts';
import EditProduct from './components/Admin/EditProduct';
import OrderConfirmation from './components/OrderConfirmation';
import AdminCustomers from './components/Admin/AdminCustomers';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/admin/products" element={<AdminProducts />} />
         <Route path="/admin/products/edit/:product_id" element={<EditProduct />} />
         <Route path="/admin" element={<AdminDashoard/>}/>
        <Route path="/admin/add-product" element={<AdminProductForm />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
