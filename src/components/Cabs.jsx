import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import for React Router v6
import './Cab.css';

const Cabs = ({ cabsData }) => {
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [availableCabs, setAvailableCabs] = useState([]);

  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  useEffect(() => {
    setAvailableCabs(cabsData.filter(cab => cab.available));
  }, [cabsData]);

  const handleFromChange = (e) => {
    setFromSearchTerm(e.target.value);
  };

  const handleToChange = (e) => {
    setToSearchTerm(e.target.value);
  };

  const filteredCabs = availableCabs.filter((cab) => {
    return (
      cab.from.toLowerCase().includes(fromSearchTerm.toLowerCase()) &&
      cab.to.toLowerCase().includes(toSearchTerm.toLowerCase())
    );
  });

  const handleSearchSubmit = () => {
    if (fromSearchTerm && toSearchTerm) {
      setIsSearchSubmitted(true);
    }
  };

  // Navigate to the CabDetail page when a cab image is clicked
  const handleCabClick = (cab) => {
    navigate(`/cab/${cab.id}`, { state: { cab } }); // Updated to use navigate() instead of history.push()
  };

  return (
    <div className="cabs-list">
      <h2>Available Cabs</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter From Destination"
          value={fromSearchTerm}
          onChange={handleFromChange}
        />
        <input
          type="text"
          placeholder="Enter To Destination"
          value={toSearchTerm}
          onChange={handleToChange}
        />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>

      {/* Display filtered available cabs only after search is submitted */}
      {isSearchSubmitted && (
        <div className="cabs-grid">
          {filteredCabs.length > 0 ? (
            filteredCabs.map((cab) => (
              <div key={cab.id} className="cab-card">
                <img
                  src={cab.image}
                  alt={cab.carNumber}
                  onClick={() => handleCabClick(cab)} // Handle image click
                />
                <div className="cab-info">
                  <p><strong>Cab Number:</strong> {cab.carNumber}</p>
                  <p><strong>Driver:</strong> {cab.driverName}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No available cabs found for the selected destinations.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cabs;