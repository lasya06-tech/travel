import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="nav-container">
      <div className="logo">TravelNow</div>
      <div className="nav-links">
        <Link to="#">About Us</Link>
        <Link to="#">Contact Us</Link>

        {/* Conditionally render based on if the user is logged in */}
        {!username ? (
          <>
            <Link to="/login">Login</Link> {/* Link to /login route */}
            <Link to="/signup">Sign Up</Link> {/* Link to /signup route */}
          </>
        ) : (
          <>
            <Link to="/profile" className="username-link">Welcome, {username}</Link>
            <button onClick={handleLogout}>Logout</button> {/* Logout button */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;