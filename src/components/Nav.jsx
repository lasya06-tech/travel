import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav-container">
      <div className="logo">TravelNow</div>
      <div className="nav-links">
        <Link to="#">About Us</Link>
        <Link to="#">Contact Us</Link>
        <Link to="/login">Login</Link> {/* Link to /login route */}
        <Link to="/signup">Sign Up</Link> {/* Link to /signup route */}
      </div>
    </nav>
  );
};

export default Nav;