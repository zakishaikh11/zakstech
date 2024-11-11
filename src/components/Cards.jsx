import React from 'react';

const Cards = ({ image, title, description, price, featured }) => {
  return (
    <div className="relative max-w-sm mx-auto bg-black rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-2xl transition-shadow duration-500">
      
      <div className="relative h-64 bg-gradient-to-t from-gray-50 to-white p-5">
        <img
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          src={image}
          alt={title}
        />
        {featured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white py-1 px-3 rounded-full text-xs shadow-md">
            Featured
          </span>
        )}
      </div>
        <hr />
      <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-base">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-500">₹{price}/-</span>
        </div>
        <button className="mt-2 w-full p-5 border-2 text-blue-500 font-bold border-blue-500 bg-primary text-primary-foreground py-2 rounded-3xl flex items-center justify-center hover:text-gray-200 hover:border-2 hover:border-gray-200 hover:bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 ...">
          See Details
        </button>
      </div>
    </div>
  );
};

export default Cards;
