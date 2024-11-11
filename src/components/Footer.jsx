import React from 'react';
import logo from './Images/zakstechLogo.png';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Zakstech Logo" className="h-10" />
        </div>
        <div className="text-sm">
          © 2024 Zakstech. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
