import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import { Link, useLocation } from 'react-router-dom';
import { fetchProducts } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    price_min: '',
    price_max: '',
    category: '',
    brand: '',
    sort: '',
    featured: '',
    ratings: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sticky, setSticky] = useState(false);

  const location = useLocation();

  useEffect(() => {
  const timer = setTimeout(() => {
    if (location.state?.category) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: location.state.category,
        ...location.state.filters // Add this line to merge filters
      }));
    }
  }, 1000);
  return () => clearTimeout(timer);
}, [location.state]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(filters);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, [filters]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts(filters).then(fetchedProducts => {
      setProducts(fetchedProducts);
      setShowFilters(false);
    });
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const truncateTitle = (title) => {
    if (title.length > 18) {
      return title.substring(0, 18) + "...";
    }
    return title;
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + "...";
    }
    return description;
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div
        className={`fixed left-0 md:relative md:w-1/5 bg-gray-900 text-white p-4 shadow-md ${sticky ? 'top-0' : 'top-16'} md:sticky h-screen transition-all z-40 ${showFilters ? 'block' : 'hidden md:block'}`}
        style={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        {showFilters && (
          <button
            onClick={handleCloseFilters}
            className="md:hidden fixed top-0 right-0 m-4 z-50 bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 w-12 h-12 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        <form onSubmit={handleFilterSubmit} className="flex flex-col space-y-4">
          <input
            type="number"
            name="price_min"
            placeholder="Min Price"
            value={filters.price_min}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-7/8 border border-gray-600 m-2"
          />
          <input
            type="number"
            name="price_max"
            placeholder="Max Price"
            value={filters.price_max}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-7/8 border border-gray-600 m-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-7/8 border border-gray-600 m-2"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-6/8 border border-gray-600 m-2"
          />
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-6/8 border border-gray-600 m-2"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="best_sellers">Best Sellers</option>
          </select>
          <select
            name="featured"
            value={filters.featured}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-6/8 border border-gray-600 m-2"
          >
            <option value="">Featured</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <input
            type="number"
            name="ratings"
            placeholder="Min Ratings"
            value={filters.ratings}
            onChange={handleFilterChange}
            className="bg-gray-700 p-2 rounded-lg text-white w-6/8 border border-gray-600 m-2"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-3 rounded-lg w-6/8 m-2 transition-all duration-500 shadow"
          >
            Apply Filters
          </button>
        </form>
      </div>

      <div className="w-full md:w-6/8 flex flex-wrap justify-center mt-6 p-4">
        {products.map((product) => (
          <div key={product.product_id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4">
            <Link to={`/product/${product.product_id}`}>
              <Cards
                image={product.image}
                title={truncateTitle(product.title)}
                description={truncateDescription(product.description)}
                price={product.price}
              />
            </Link>
          </div>
        ))}
      </div>

      {!showFilters && (
        <button
          className="md:hidden fixed top-20 right-2 z-60 bg-gray-700 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-800"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      )}
    </div>
  );
}

export default ProductsPage;
