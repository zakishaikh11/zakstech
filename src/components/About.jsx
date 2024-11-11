import React from 'react';
import store from './Images/store.jpeg';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div>
     <div className="flex flex-col md:flex-row bg-background text-foreground p-6">
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img src={store} alt="ZAKSTECH store front" className="rounded-2xl"/>
        </div>
        <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-primary mb-4 self-center mx-auto underline md:self-start text-blue-500">ABOUT US</h2>
          <h3 className="text-3xl font-semibold text-primary mt-10 mb-5 self-center md:self-start text-blue-400">ZACKSTECH ELECTRONICS</h3>
          <p className="text-muted-foreground mb-4 self-center md:self-start text-gray-500">Zakstech, based in Pune, is your trusted source for the latest in electronics and technology. Our extensive selection includes laptops, mobile phones, tablets, smartwatches, and a variety of accessories to meet all your tech needs. We are committed to providing exceptional customer service both in-store and online, ensuring you have a seamless shopping experience. Whether you prefer to shop in person or from the comfort of your home, our knowledgeable staff is here to offer personalized assistance and expert advice. Explore our user-friendly online store to discover competitive prices, exclusive deals, and fast delivery options. Shop with Zakstech and stay ahead with the latest tech innovations.
           
          </p>
          <div className="flex space-x-4 self-center md:self-start">
            <button className="text-primary-foreground py-2 px-4 rounded-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <Link to="/">Go Back to Home</Link>
            </button>
            <button className="text-secondary-foreground py-2 px-4 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Link to="/contact">CONTACT US</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
