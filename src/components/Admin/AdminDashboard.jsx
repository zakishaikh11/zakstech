import React, { useEffect, useState } from 'react';
import { fetchAllOrders, fetchProducts } from '../../api'; // Assuming you have API methods here
import { Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registering chart elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function AdminDashboard() {
  // States for storing order statistics, order list, total products, sales data, profit data, and recent products
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, totalAmount: 0 });
  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [salesData, setSalesData] = useState({ labels: [], data: [] });
  const [profitData, setProfitData] = useState({ profit: 0, profitPercentage: 11 });
  const [recentProducts, setRecentProducts] = useState([]); // New state for recent products

  // Fetch orders and products data once the component is mounted
  useEffect(() => {
    const getAllOrdersAndProducts = async () => {
      try {
        const orders = await fetchAllOrders();
        const products = await fetchProducts();

        // Calculate total number of orders and total amount of orders
        const totalOrders = orders.length;
        const totalAmount = orders.reduce((acc, order) => acc + order.grandTotal, 0);
        const totalProductsCount = products.length;

        setOrderStats({ totalOrders, totalAmount });
        setOrders(orders);
        setTotalProducts(totalProductsCount);

        // Assuming a fixed 11% profit, calculate the total profit
        const profit = (11 / 100) * totalAmount;
        setProfitData({ profit, profitPercentage: 11 });

        // Prepare sales data for the current week
        const salesByDay = Array(7).fill(0);
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of the week
        startOfWeek.setHours(0, 0, 0, 0); // Midnight

        orders.forEach(order => {
          const orderDate = new Date(order.createdAt);
          if (orderDate >= startOfWeek && orderDate <= today) {
            const dayIndex = (orderDate.getDay() + 6) % 7; // Adjusting Sunday as the last day
            salesByDay[dayIndex] += order.grandTotal;
          }
        });

        // Labels for the sales chart
        const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        setSalesData({ labels, data: salesByDay });

        // Get recent products (first 5)
        const recentProductsList = products.reverse().slice(0, 5);
        setRecentProducts(recentProductsList);
      } catch (error) {
        console.error('Error fetching orders and products:', error);
      }
    };

    getAllOrdersAndProducts();
  }, []);

  // Format price for displaying in ₹ format
  const formatPrice = (price) => {
    return `₹${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-gray-100">
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
        </div>
        <nav className="mt-10 space-y-2">
          <Link to="/admin"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Dashboard</p></Link>
          <Link to="/admin/products"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Products</p></Link>
          <Link to="/admin/add-product"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Add A Product</p></Link>
          <Link to="/admin/customers"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Customers</p></Link>
          <Link to="/admin/sales"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Sales</p></Link>
          <Link to="/admin/sales-reports"><p className="block py-2.5 px-4 rounded hover:bg-gray-700">Sales Reports</p></Link>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <div className="flex flex-col flex-1 w-full">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="text-xl font-semibold">Welcome, Admin!</div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded">Logout</button>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Sale</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600">{formatPrice(orderStats.totalAmount.toFixed(2))}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="mt-2 text-3xl font-bold text-green-500">{orderStats.totalOrders}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">No. of Products</h2>
              <p className="mt-2 text-3xl font-bold text-yellow-500">{totalProducts}</p>
            </div>
          </div>

          {/* Sales and Profit Overview */}
          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            {/* Sales Overview (60% Width) */}
            <div className="lg:w-3/5 w-full p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
              <div className="h-48">
                <Bar
                  data={{
                    labels: salesData.labels,
                    datasets: [
                      {
                        label: 'Sales Amount',
                        data: salesData.data,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `₹${value}`,
                        },
                      },
                    },
                  }}
                  height={200} // Chart height
                />
              </div>
            </div>

            {/* Profit Overview (40% Width) */}
            <div className="lg:w-2/5 w-full p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Profit Overview</h2>
              <div className="h-44">
                <Doughnut
                  data={{
                    labels: ['Profit', 'Remaining'],
                    datasets: [
                      {
                        data: [profitData.profitPercentage, 100 - profitData.profitPercentage],
                        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            return tooltipItem.label === 'Profit'
                              ? `Profit: ₹${formatPrice(profitData.profit)}`
                              : `${tooltipItem.label}: ${tooltipItem.formattedValue}%`;
                          },
                        },
                      },
                    },
                  }}
                  height={200} // Chart height
                />
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <h2 className="mt-6 text-lg font-semibold">Recent Orders</h2>
          <table className="min-w-full mt-2 bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Total Amount</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td className="px-4 py-2 border">{order.orderId}</td>
                  <td className="px-4 py-2 border">{order.user}</td>
                  <td className="px-4 py-2 border">{formatPrice(order.grandTotal)}</td>
                  <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Recent Products Table */}
          <h2 className="mt-6 text-lg font-semibold">Recent Products</h2>
          <table className="min-w-full mt-2 bg-white border border-gray-300">
  <thead>
    <tr>
      <th className="px-4 py-2 border text-center">Product Image</th>
      <th className="px-4 py-2 border text-center">Product ID</th>
      <th className="px-4 py-2 border text-center">Product Name</th>
      <th className="px-4 py-2 border text-center">Price</th>
    </tr>
  </thead>
  <tbody>
    {recentProducts.map(product => (
      <tr key={product.product_id}>
        <td className="px-4 py-2 border text-center">
          <img src={product.image} alt={product.title} className="w-16 h-16 bg-white px-1 mx-auto object-contain border-2 border-gray-600 rounded-md" />
        </td>
        <td className="px-4 py-2 border text-center">{product.product_id}</td>
        <td className="px-4 py-2 border text-center">{product.title}</td>
        <td className="px-4 py-2 border text-center">{formatPrice(product.price)}</td>
      </tr>
    ))}
  </tbody>
</table>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
