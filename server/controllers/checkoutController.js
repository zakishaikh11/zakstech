const Order = require('../models/orderModel'); // Assuming you have an Order model
const Cart = require('../models/cartModel'); // Assuming you have a Cart model
const Product = require('../models/productModel'); // Assuming you have a Product model
const Payment = require('../models/paymentModel'); // Assuming you have a Payment model
const Shipment = require('../models/shipmentModel'); // Assuming you have a Shipment model

// Handle checkout
exports.checkout = async (req, res) => {
  try {
    const { customerId, paymentMethod } = req.body;

    // Fetch cart items
    const cartItems = await Cart.find({ customerId }).populate('productId');

    // Create order
    const totalAmount = cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    const order = new Order({
      customerId,
      orderDate: new Date(),
      totalAmount,
      status: 'Pending'
    });
    await order.save();

    // Create payment
    const payment = new Payment({
      orderId: order._id,
      paymentDate: new Date(),
      amount: totalAmount,
      paymentMethod,
      paymentStatus: 'Completed'
    });
    await payment.save();

    // Create shipment
    const shipment = new Shipment({
      orderId: order._id,
      shipmentDate: new Date(),
      deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Example delivery date
      trackingNumber: '1234567890',
      carrier: 'CarrierName'
    });
    await shipment.save();

    // Clear cart
    await Cart.deleteMany({ customerId });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};