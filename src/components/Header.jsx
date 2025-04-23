// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const categories = [
    'Hotel',
    'Flight',
    'Cab',
    'Train',
    'Holiday Package',
    'Designated Trips',
  ];

  const handleCategoryClick = (category) => {
    if (category === 'Hotel') {
      navigate('/hotels');
    }
    else if (category === 'Flight') {
      navigate('/flights');
    }
    else if (category === 'Cab') {
      navigate('/cabs');
    }
    
     

    else {
      alert(`${category} page coming soon!`);
    }
  };

  return (
    <div className="header-container">
      <div className="main-categories">
        {categories.map((item, index) => (
          <button
            key={index}
            className="category-btn"
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="home-section">
        <div className="overlay-text">
          <h2>Discover Amazing Places</h2>
          <p>Plan your dream vacation with us — it's fast, easy, and reliable!</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 TravelNow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Header;