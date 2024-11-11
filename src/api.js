const BASE_URL = 'https://zakstech-backend.onrender.com/api';

// Fetch products with optional filters
export const fetchProducts = async (filters = {}) => {
  try {
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
    );
    const queryString = new URLSearchParams(filteredFilters).toString();
    console.log(`API Request URL: ${BASE_URL}/products?${queryString}`); 
    const response = await fetch(`${BASE_URL}/products?${queryString}`); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchCustomers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/customers`);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Register a new customer
export const registerCustomer = async (customerData) => {
  try {
    const response = await fetch(`${BASE_URL}/customers/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error registering customer:', error);
    throw error;
  }
};

// Login a customer
export const loginCustomer = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/customers/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Fetch cart items by username
export const fetchCartItems = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/${username}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (username, product_id, quantity, price) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, product_id, quantity, price }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeCartItem = async (username, product_id) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/remove`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, product_id }),
    });
    if (!response.ok) throw new Error('Failed to remove cart item');
    return await response.json();
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};

// Place an order
export const placeOrder = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    if (!response.ok) throw new Error('Failed to place order');
    return await response.json();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const addPayment = async (paymentData) => {
  const response = await fetch(`${BASE_URL}/payments/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to process payment');
  }
  
  return await response.json();
};


export const fetchOrderById = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// export const fetchOrderStats = async () => {
//   try {
//       const response = await fetch('http://192.168.21.168:5000/api/orders/stats', {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//               // Add any other necessary headers (e.g., Authorization)
//           },
//       });
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error('Error fetching order stats:', error);
//       throw error; // Re-throw the error to handle it in your component
//   }
// };
export const fetchAllOrders = async () => {
  const response = await fetch(`${BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return await response.json();
};

export const fetchReviewsForProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/reviews/${productId}`);
  const data = await response.json();
  return data;
};

export const addReview = async (reviewData) => {
  const response = await fetch(`${BASE_URL}/reviews/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Failed to add review');
  }

  return response.json();
};
