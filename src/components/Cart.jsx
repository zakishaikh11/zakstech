import React, { useEffect, useState } from 'react';
import { fetchCartItems, updateCartItem, removeCartItem, fetchProductById } from '../api';
import { useNavigate } from 'react-router-dom';
import logo from './Images/zakstechLogo.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.username) {
          alert("Please log in to view your cart.");
          navigate('/login');
          return;
        }

        const cartData = await fetchCartItems(user.username);
        const itemsWithDetails = await Promise.all(
          cartData.items.map(async (item) => {
            const product = await fetchProductById(item.product_id);
            return { ...item, ...product };
          })
        );

        setCartItems(itemsWithDetails);
      } catch (err) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleUpdateQuantity = async (product_id, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const product = await fetchProductById(product_id);
      const price = product.price;

      await updateCartItem(user.username, product_id, quantity, price);

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product_id === product_id
            ? { ...item, quantity, total: price * quantity } // Update total in state
            : item
        )
      );
    } catch (error) {
      console.error('Failed to update item quantity:', error);
      alert('Failed to update item quantity.');
    }
  };

  const handleRemoveItem = async (product_id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await removeCartItem(user.username, product_id);
      setCartItems(prevItems => prevItems.filter(item => item.product_id !== product_id));
    } catch (error) {
      alert('Failed to remove item.');
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotal = () => {
    return formatPrice(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 lg:m-10 rounded-2xl shadow-lg">
      <img src={logo} alt="logo" className='w-60 mx-auto my-3 rounded-lg shadow-md' />
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center p-4 text-lg font-semibold text-gray-400">Your cart is empty.</div>
      ) : (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-md text-center">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="border border-gray-600 p-2">Image</th>
                <th className="border border-gray-600 p-2">Title</th>
                <th className="border border-gray-600 p-2">Cost</th>
                <th className="border border-gray-600 p-2">Quantity</th>
                <th className="border border-gray-600 p-2">Total</th>
                <th className="border border-gray-600 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.product_id}>
                  <td className="border border-gray-700 py-3">
                    <img src={item.image} alt={item.title} className="w-16 h-16 bg-white px-1 mx-auto object-contain border-2 border-gray-600 rounded-md" />
                  </td>
                  <td className="border border-gray-700 p-2 font-semibold text-gray-200">{item.title.length > 18 ? item.title.substring(0, 18) + "..." : item.title}</td>
                  <td className="border border-gray-700 p-2 font-semibold text-gray-200">₹{formatPrice((item.price).toFixed(2))}</td>
                  <td className="border border-gray-700 p-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.product_id, parseInt(e.target.value))}
                      className="ml-2 border p-1 border rounded bg-gray-800 text-gray-200"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-700 p-2 font-semibold text-gray-200">₹{formatPrice((item.price * item.quantity).toFixed(2))}</td>
                  <td className="border border-gray-700 p-2">
                    <button className="bg-red-600 text-white p-2 rounded font-bold hover:bg-red-700 transition duration-300" onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-md text-gray-200 p-4 w-full sm:w-1/2 text-center">
        <h2 className="text-xl font-bold mb-4">Summary</h2>
        <div className="border border-gray-600 p-2 flex justify-between items-center">
          <span>Subtotal:</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className="border border-gray-600 p-2 flex justify-between items-center">
          <span>Shipping Fee:</span>
          <span>₹0</span>
        </div>
        <div className="border border-gray-600 p-2 flex justify-between items-center font-bold">
          <span>Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <div className="mt-4">
          <button className="border-2 border-blue-500 text-blue-500 hover:bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 hover:text-white hover:border-blue-950 py-4 px-6 rounded-lg w-full sm:w-auto my-2 shadow-lg transition duration-300" onClick={() => navigate('/')} >
            Continue Shopping
          </button>
          <br />
          <button className="border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r from-pink-500 to-red-500 hover:text-white hover:border-pink-950 py-4 px-6 rounded-lg w-full sm:w-auto shadow-lg transition duration-300 mt-2" onClick={() => navigate('/checkout')} >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
