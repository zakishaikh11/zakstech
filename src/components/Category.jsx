import React from 'react';
import { useNavigate } from 'react-router-dom';
import catLaptop from './Images/catLaptop.png';
import catMobile from './Images/catMobile.png';
import catTablet from './Images/catTablet.png';
import catHeadphone from './Images/catHeadphone.png';
import catSmartWatch from './Images/catSmartWatch.png';
import catTV from './Images/catTV.png';
import catCompEss from './Images/catCompEss.png';
import catSpeaker from './Images/catSpeaker.png';

const categories = [
  { id: 'Mobiles', name: 'Mobile', image: catMobile },
  { id: 'Laptops', name: 'Laptop', image: catLaptop },
  { id: 'Tablets', name: 'Tablet', image: catTablet },
  { id: 'Headphones', name: 'Headphone', image: catHeadphone },
  { id: 'Smartwatches', name: 'Smartwatches', image: catSmartWatch },
  { id: 'Televisions', name: 'Television', image: catTV },
  { id: 'ComputerEssentials', name: 'Computer Essential', image: catCompEss },
  { id: 'Speakers', name: 'Speaker', image: catSpeaker },
];

function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate('/products', { state: { category: categoryName } });
  };

  return (
    <div className="mt-10">
      <div className="text-4xl font-bold text-center text-blue-500 mb-8">CATEGORY</div>
      <hr />
      <div className="flex flex-wrap justify-center mt-10">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div 
              className="bg-gradient-to-br from-gray-100 via-white to-gray-200 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-40 object-cover rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
