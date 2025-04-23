import React from 'react';
import './HotelAdmin.css';
import { Link } from 'react-router-dom';

const FlightAdmin = () => {
  return (
    <div className="hotel-dashboard">
      <nav className="navbar">
        <div className="logo">Travel</div>
        <ul className="nav-links">
          <li><Link to="/addflight">Add Flight</Link></li>
          <li><Link to="/viewflights">View Flight</Link></li>
          <li><Link to="/hotel/viewproduct">Customer Feedback</Link></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <h2>Welcome, FlightAdmin!</h2>
        <p>Add Your Flights</p>
      </div>
    </div>
  );
};

export default FlightAdmin;