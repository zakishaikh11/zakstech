import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchProductById } from '../api'; 

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [activeSection, setActiveSection] = useState('specifications');
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0); // User's selected rating
  const [reviewText, setReviewText] = useState(''); // User's review
  const [averageRating, setAverageRating] = useState(0); // Average rating for the product
  const [reviewsCount, setReviewsCount] = useState(0); // Total number of reviews

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
        setMainImage(fetchedProduct.image);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const THUMBNAIL_IMAGES = [product.image, product.image2, product.image3, product.image4];

  const changeImage = (src) => {
    setMainImage(src);
  };

  const addToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user || !user.username) {
      alert("Please log in to add items to your cart.");
      navigate('/login');
      return;
    }
  
    const payload = {
      username: user.username,
      product_id: product.product_id,
      price: product.price,
      quantity: 1,  // Default quantity
      total: product.price * 1  // Calculate total as price * quantity
    };
  
    console.log('Payload:', payload);  // Debugging step: ensure payload is correct
  
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Product added to cart!');
      } else {
        const errorData = await response.json();
        console.error('Failed to add product to cart:', errorData.message);
        alert('Error: Could not add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Something went wrong!');
    }
  };

  const rev = '2032';

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <img src={mainImage} alt="Main Product Image" className="object-contain transition-transform duration-500 hover:scale-105 w-full h-auto max-h-96 mb-8 border-4 border-white rounded-xl bg-white py-4"/>
          <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
            {THUMBNAIL_IMAGES.map((thumbnail, index) => (
              <img key={index} onClick={() => changeImage(thumbnail)} src={thumbnail} alt={`Thumbnail ${index + 1}`} className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 cursor-pointer object-contain py-3 border-2 bg-white rounded-lg hover:border-blue-500 border-gray-500" />
            ))}
          </div>
        </div>
        <div className="flex-1 ml-0 md:ml-16 mt-8 md:mt-0">
          <h1 className="text-4xl font-bold mb-4 text-blue-500">{product.title}</h1>
          <p className="text-3xl font-semibold text-blue-500 mb-4">₹{product.price}/-</p>
          <div className="flex items-center my-4">
            <span className="text-blue-500 text-2xl">★★★★</span>
            <span className="text-zinc-500 text-2xl">★</span>
            <span className="ml-4 text-zinc-500 text-xl">({rev} reviews)</span>
          </div>
          <div className="my-8">
            <h2 className="font-semibold text-xl mb-2 text-blue-500">Product Description</h2>
            <p className="text-zinc-600 text-lg">{product.description}</p>
          </div>

          <div className="flex mb-6">
            <button
              onClick={() => setActiveSection('specifications')}
              className={`flex-1 py-2 px-3 text-center font-semibold ${activeSection === 'specifications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 border-b-2 border-gray-300'}`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveSection('details')}
              className={`flex-1 py-2 text-center font-semibold ${activeSection === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 border-b-2 border-gray-300'}`}
            >
              Product Info
            </button>
            <button
              onClick={() => setActiveSection('reviews')}
              className={`flex-1 py-2 text-center font-semibold ${activeSection === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 border-b-2 border-gray-300'}`}
            >
              Write a Review
            </button>
          </div>

          {activeSection === 'specifications' && (
            <div className="my-8">
              <h2 className="font-semibold text-xl mb-2 text-blue-500">Specifications</h2>
              <ul className="list-disc pl-5 text-zinc-600 text-lg">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <strong className='text-blue-500'>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'details' && (
            <div className="my-8">
              <h2 className="font-semibold text-xl mb-2 text-blue-500">Product Info</h2>
              <p className="text-zinc-600 text-lg">{product.details}</p>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="my-8">
              <h2 className="font-semibold text-xl mb-2 text-blue-500">Write a Review</h2>
              {/* Placeholder for review form or content */}
              <p className="text-zinc-600 text-lg">Here you can write a review.</p>
            </div>
          )}

          <div className="flex items-center space-x-8">
            <button 
              className="py-3 px-6 font-bold w-full rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 hover:text-white hover:border-gray-100"
              onClick={addToCart}
            >
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              ADD TO CART
            </button>
            <button className="py-3 px-6 font-bold w-full rounded-lg border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r from-pink-500 to-red-500 hover:text-white">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
