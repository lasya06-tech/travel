import React, { useState } from 'react';
import './Cab.css';

const Cabs = ({ cabsData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCabs = cabsData.filter((cab) => {
    return (
      cab.cabNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cab.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cab.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cab.to.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="cabs-list">
      <h2>Available Cabs</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Cab Number, Driver, From, or To"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display filtered cabs */}
      <div className="cabs-grid">
        {filteredCabs.map((cab, index) => (
          <div key={index} className="cab-card">
            <img src={cab.image} alt={cab.cabNumber} />
            <div className="cab-info">
              <p><strong>Cab Number:</strong> {cab.cabNumber}</p>
              <p><strong>Driver:</strong> {cab.driver}</p>
              <p><strong>From:</strong> {cab.from}</p>
              <p><strong>To:</strong> {cab.to}</p>
              <p><strong>Pickup Time:</strong> {cab.pickupTime}</p>
              <p><strong>Status:</strong> {cab.isAvailable ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cabs;