import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleViewProfile = () => {
    alert("Profile details feature coming soon! 🚧");
  };

  return (
    <div className="profile-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>Welcome, {username} 👋</h2>
        </div>
        <div className="nav-right">
          {/* Links as List Items */}
          <ul className="nav-links">
            <li>
              <a href="#" onClick={handleViewProfile} className="nav-link">View Profile</a>
            </li>
            <li>
              <a href="#" onClick={handleLogout} className="nav-link">Logout</a>
            </li>
            {/* Room Booking Status as a Link */}
            <li>
              <a href="/status" className="status-link">Status</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
