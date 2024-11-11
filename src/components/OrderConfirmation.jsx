// import React, { useState, useEffect, useRef } from 'react';
// import { fetchOrderById } from '../api'; // Function to fetch order by ID
// import { useNavigate } from 'react-router-dom';
// // eslint-disable-next-line
// import html2pdf from 'html2pdf.js';
// import Logo from './Logo'; // Importing your company logo

// const OrderConfirmation = () => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [orderId, setOrderId] = useState('');
//   const navigate = useNavigate();
//   const orderRef = useRef(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const storedOrderId = localStorage.getItem('orderId');
//         if (!storedOrderId) {
//           alert('No order found. Redirecting to cart.');
//           navigate('/cart');
//           return;
//         }

//         setOrderId(storedOrderId);

//         // Fetch order based on orderId
//         const orderData = await fetchOrderById(storedOrderId);
//         if (!orderData) {
//           alert('Order not found.');
//           navigate('/cart');
//           return;
//         }

//         setOrder(orderData);
//       } catch (err) {
//         console.error('Failed to fetch order data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [navigate]);

//   // const formatPrice = (price) => price.toLocaleString('en-IN'); 
//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const calculateTotal = () =>
//     order?.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

//   const handleDownloadPDF = () => {
//     const element = orderRef.current;
//     const options = {
//       margin: 1,
//       filename: `order_${orderId}.pdf`,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//     };
//     html2pdf().from(element).set(options).save();
//   };

//   if (loading) return <div>Loading...</div>;

//   if (!order) return <div>No order found.</div>; 

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white border border-border rounded-lg shadow-lg">
//       <div ref={orderRef} className="bg-white p-8 rounded-lg shadow-md border-2 border-text-blue-800">
//         {/* Company Header with Logo */}
//         <div className="text-center mb-6">
//           <Logo className="mx-auto mb-4" /> {/* Display Zakstech logo */}
//           <h1 className="text-3xl font-bold text-blue-800">Zakstech Enterprises</h1>
//           <p className="text-lg text-muted-foreground ">INVOICE #{orderId}</p>
//           <p className="text-sm text-muted-foreground">367, Ganj Peth Pune - 42</p>
//         </div>

//         {/* Table for Products */}
//         <table className="min-w-full border-collapse border border-border">
//           <thead>
//             <tr className="bg-muted text-left">
//               <th className="border border-border p-2 text-gray-700">ITEM DESCRIPTION</th>
//               <th className="border border-border p-2 text-gray-700">QTY</th>
//               <th className="border border-border p-2 text-gray-700">PRICE</th>
//               <th className="border border-border p-2 text-gray-700">TOTAL</th>
//             </tr>
//           </thead>
//           <tbody>
//             {order.items?.map((item) => (
//               <tr key={item.product_id}>
//                 <td className="border border-border p-2">{item.title}</td>
//                 <td className="border border-border p-2">{item.quantity}</td>
//                 <td className="border border-border p-2">₹{formatPrice(item.price)}</td>
//                 <td className="border border-border p-2">₹{formatPrice(item.price * item.quantity)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>


//         {/* Payment Summary */}
//         <div className="mt-4">
//           <div className="flex justify-between font-bold">
//             <span className="text-gray-700">SUB TOTAL</span>
//             <span>₹{formatPrice(calculateTotal())}</span>
//           </div>
//           <div className="flex justify-between font-bold">
//             <span className="text-gray-700">TAX (18%)</span>
//             <span>₹{formatPrice((calculateTotal() * 0.18).toFixed(2))}</span>
//           </div>
//           <div className="flex justify-between font-bold">
//             <span className="text-gray-700">GRAND TOTAL</span>
//             <span>₹{formatPrice((calculateTotal() * 1.18).toFixed(2))}</span>
//           </div>
//         </div>

//         {/* Paid To Section */}
//         <div className="mt-6">
//           <h2 className="text-lg font-bold text-gray-700">PAID TO</h2>
//           <p>Zakstech Enterprises</p>
//           <p>367, Ganj Peth Pune - 42</p>
//         </div>

//         {/* Thank You Message */}
//         <div className="text-center mt-6">
//           <p className="text-2xl font-semibold text-blue-800">Thank You for Shopping with Zakstech</p>
//         </div>

//         {/* Footer */}
//         <footer className="mt-6 text-center text-sm text-muted-foreground">
//           Zakstech Enterprises - 7888119786 - zakstech@info.com
//         </footer>
//       </div>

//       {/* Button to Save as PDF */}
//       <div className="mt-6 text-center">
//         <button
//           className="bg-blue-500 text-white p-3 rounded-lg shadow-md"
//           onClick={handleDownloadPDF}
//         >
//           Save as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;
import React, { useState, useEffect, useRef } from 'react';
import { fetchOrderById } from '../api'; // Function to fetch order by ID
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import html2pdf from 'html2pdf.js'; // This will ignore the warning for the missing source map
import Logo from './Logo'; // Importing your company logo

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const orderRef = useRef(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const storedOrderId = localStorage.getItem('orderId');
        if (!storedOrderId) {
          alert('No order found. Redirecting to cart.');
          navigate('/cart');
          return;
        }

        setOrderId(storedOrderId);

        // Fetch order based on orderId
        const orderData = await fetchOrderById(storedOrderId);
        if (!orderData) {
          alert('Order not found.');
          navigate('/cart');
          return;
        }

        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [navigate]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotal = () =>
    order?.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleDownloadPDF = () => {
    const element = orderRef.current;
    const options = {
      margin: 1,
      filename: `order_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
  };

  if (loading) return <div>Loading...</div>;

  if (!order) return <div>No order found.</div>; 

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-border rounded-lg shadow-lg">
      <div ref={orderRef} className="bg-white p-8 rounded-lg shadow-md border-2 border-text-blue-800">
        {/* Company Header with Logo */}
        <div className="text-center mb-6">
          <Logo className="mx-auto mb-4" /> {/* Display Zakstech logo */}
          <h1 className="text-3xl font-bold text-blue-800">Zakstech Enterprises</h1>
          <p className="text-lg text-muted-foreground ">INVOICE #{orderId}</p>
          <p className="text-sm text-muted-foreground">367, Ganj Peth Pune - 42</p>
        </div>

        {/* Table for Products */}
        <table className="min-w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border p-2 text-gray-700">ITEM DESCRIPTION</th>
              <th className="border border-border p-2 text-gray-700">QTY</th>
              <th className="border border-border p-2 text-gray-700">PRICE</th>
              <th className="border border-border p-2 text-gray-700">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item) => (
              <tr key={item.product_id}>
                <td className="border border-border p-2">{item.title}</td>
                <td className="border border-border p-2">{item.quantity}</td>
                <td className="border border-border p-2">₹{formatPrice(item.price)}</td>
                <td className="border border-border p-2">₹{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Payment Summary */}
        <div className="mt-4">
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">SUB TOTAL</span>
            <span>₹{formatPrice(calculateTotal())}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">TAX (18%)</span>
            <span>₹{formatPrice((calculateTotal() * 0.18).toFixed(2))}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">GRAND TOTAL</span>
            <span>₹{formatPrice((calculateTotal() * 1.18).toFixed(2))}</span>
          </div>
        </div>

        {/* Paid To Section */}
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">PAID TO</h2>
          <p>Zakstech Enterprises</p>
          <p>367, Ganj Peth Pune - 42</p>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-6">
          <p className="text-2xl font-semibold text-blue-800">Thank You for Shopping with Zakstech</p>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-muted-foreground">
          Zakstech Enterprises - 7888119786 - zakstech@info.com
        </footer>
      </div>

      {/* Button to Save as PDF */}
      <div className="mt-6 text-center">
        <button
          className="bg-blue-500 text-white p-3 rounded-lg shadow-md"
          onClick={handleDownloadPDF}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
