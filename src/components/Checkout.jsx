import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems, fetchProductById, addPayment } from '../api'; 

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const formatPrice = (price) => price.toLocaleString('en-IN');

  const handlePayment = async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please log in to proceed with checkout.");
      navigate('/login');
      return;
    }

    // Prepare payment data
    const paymentData = {
      username: user.username,
      totalAmount,
      cardNumber,
      expiryDate,
      cvv,
    };

    try {
      // First, make the payment
      const paymentResponse = await addPayment(paymentData);

      // Only proceed with order creation if payment is successful
      if (paymentResponse) {
        const orderData = {
          user: user.username,
          items: cartItems,
          total: totalAmount,
          tax,
          grandTotal,
          paymentInfo: {
            method: 'Card',
            amount: grandTotal,
          },
        };

        // Create the order
        const response = await fetch('http://localhost:5000/api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const order = await response.json();

        if (response.ok) {
          alert('Payment and Order successful!');
          localStorage.setItem('orderId', order.orderId);

      // Navigate to the OrderConfirmation page
      navigate('/order-confirmation');
        }
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert("Please log in to proceed with checkout.");
        navigate('/login');
        return;
      }

      const cartData = await fetchCartItems(user.username);
      const updatedCartItems = await Promise.all(
        cartData.items.map(async (item) => {
          const product = await fetchProductById(item.product_id);
          return {
            ...item,
            title: product.title,
          };
        })
      );

      setCartItems(updatedCartItems);
      setTotalAmount(updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));

      const calculatedTax = totalAmount * 0.05; // Assuming 5% tax
      setTax(calculatedTax);
      setGrandTotal(totalAmount + calculatedTax + 100); // Assuming fixed shipping cost of 100
    };

    fetchCart();
  }, [navigate, totalAmount]);

  return (
    <div className="checkout-container flex flex-col lg:flex-row">
      <div className="cart-summary w-full lg:w-2/3 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="py-2">Product Title</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.product_id} className="border-b">
                <td className="py-2">{item.title}</td>
                <td className="py-2">₹{formatPrice(item.price.toFixed(2))}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">₹{formatPrice((item.price * item.quantity).toFixed(2))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-lg font-semibold">
          <h3>Subtotal: ₹{formatPrice(totalAmount)}</h3>
          <h3>Tax: ₹{formatPrice(tax)}</h3>
          <h3>Grand Total: ₹{formatPrice(grandTotal)}</h3>
        </div>
      </div>

      <div className="payment-form w-full lg:w-1/3 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <form onSubmit={handlePayment} className="space-y-4">   
          <div>
            <label className="block text-sm font-semibold mb-1">Card Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Expiry Date</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">CVV</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded font-semibold"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
