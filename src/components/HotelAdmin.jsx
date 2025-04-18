import React from 'react';
import './HotelAdmin.css';
import { Link } from 'react-router-dom';

const HotelAdmin = () => {
  return (
    <div className="hotel-dashboard">
      <nav className="navbar">
        <div className="logo">Travel</div>
        <ul className="nav-links">
          <li><Link to="/addhotel">Add Hotel</Link></li>
          <li><Link to="/hotel/viewproduct">Customer Feedback</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Welcome, HotelAdmin!</h2>
        <p>Add Your Hotels</p>
      </div>
    </div>
  );
};

export default HotelAdmin;