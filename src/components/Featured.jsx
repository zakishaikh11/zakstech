import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faArrowLeft, faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons';
import './carousel.css';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api'; 
import { fetchProductById } from '../api'; 

const Featured = ({ product, onNext, onPrev }) => {
  const [animation, setAnimation] = useState('');

  const handleNext = () => {
    setAnimation('slide-out-left');
    setTimeout(() => {
      onNext();
      setAnimation('slide-in-right');
    }, 500);
  };

  const handlePrev = () => {
    setAnimation('slide-out-right');
    setTimeout(() => {
      onPrev();
      setAnimation('slide-in-left');
    }, 500);
  };

  const truncateDetails = (details) => {
    const words = details.split(' ');
    if (words.length > 40) {
      return words.slice(0, 40).join(' ') + "...";
    }
    return details;
  };
  return (
    <div className="carousel-container relative flex justify-center items-center px-0 md:px-6 py-20 bg-sky-950 rounded-xl shadow-xl">
      <button className="absolute left-4 text-white bg-black p-3 rounded-full px-4 shadow-lg z-10" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      
      <div className={`carousel-item ${animation} flex flex-col md:flex-row items-center bg-gradient-to-br from-sky-950 via-blue-950 to-sky-950 rounded-lg shadow-lg p-10 w-full md:w-3/4 lg:w-4/5 transition-transform duration-500  shadow-gray-900`}>
        <div className="relative w-full py-10 px-5 bg-white md:w-1/2  rounded-lg shadow-xl">
          <img src={product.image} alt={product.title} className="relative z-10 w-full h-full object-contain transition-transform duration-500 hover:scale-105" />
        </div>
        
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10 text-center md:text-left">
          <h2 className="text-4xl font-bold text-blue-500 mb-2">FEATURED PRODUCT</h2>
          <h1 className="text-5xl font-extrabold mb-3 text-gray-100">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-300 mt-2 mb-4">{truncateDetails(product.details)} </p>
          <p className="text-3xl font-bold text-blue-500 mb-6">₹{product.price}/-</p>
          
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
          <Link to={`/product/${product.product_id}`}>
            <button className="border-2 border-blue-500 text-blue-500 hover:bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 hover:text-white hover:border-blue-950 py-4 px-6 rounded-lg font-semibold flex items-center shadow-lg">
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            
              See Details
            </button>
            </Link>
            <button className="border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r from-pink-500 to-red-500 hover:text-white hover:border-blue-950 py-4 px-6 rounded-lg font-semibold flex items-center shadow-lg">
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <button className="absolute right-4 text-white bg-black p-3 px-4 rounded-full shadow-lg" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      
    </div>
  );
};

export default Featured;
