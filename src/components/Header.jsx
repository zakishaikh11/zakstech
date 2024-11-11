import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBars, faTimes, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo className="w-24 md:w-32" /> {/* Adjusted logo size */}
            <div className="hidden md:flex space-x-4 ml-10">
              <Link
                to="/"
                className="text-cyan-100 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-cyan-100 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-cyan-100 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-cyan-100 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 ml-4">
            <div className="relative">
              <input
                type="text"
                className="bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:bg-gray-700"
                placeholder="Search..."
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-3 text-gray-400"
              />
            </div>
            <Link
              to="/cart"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Cart
            </Link>
            {user ? (
              <span className="text-cyan-100 hover:text-cyan-300 flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                <FontAwesomeIcon icon={faUser} />
                <span>Hello, {getFirstName(user.name)}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-400 flex items-center ml-4"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                  Logout
                </button>
              </span>
            ) : (
              <Link
                to="/login"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Login
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {user && (
              <Link
                to="/cart"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center mr-4"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-md"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center text-red-600"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
                <span className="block px-3 py-2 rounded-md text-base font-medium text-cyan-100 hover:text-cyan-300 transition-colors duration-300">
                  Hello, <span className='text-cyan-100'>{getFirstName(user.name)}</span>
                </span>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
