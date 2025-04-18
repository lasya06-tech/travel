import React, { useState } from 'react';
import './Hotels.css';

const Hotels = ({ hotelsData }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchStars, setSearchStars] = useState('');

  const filteredHotels = hotelsData.filter((hotel) => {
    const matchesLocation = hotel.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesStars = searchStars ? hotel.stars === parseInt(searchStars) : true;
    return matchesLocation && matchesStars;
  });

  return (
    <div className="container">
      <h1 className="heading">Top Hotels</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <select
          value={searchStars}
          onChange={(e) => setSearchStars(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Star</option>
          <option value="4">4 Star</option>
          <option value="3">3 Star</option>
        </select>
      </div>

      {/* Hotel Cards */}
      <div className="hotel-container">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <div className="hotel-image">
                <img src={hotel.image} alt={hotel.name} />
              </div>
              <div className="hotel-info">
                <div className="hotel-name">{hotel.name}</div>
                <div className="hotel-location">{hotel.location}</div>
                <div className="hotel-type">{hotel.type}</div>
                <div className="hotel-stars">{'⭐'.repeat(hotel.stars)}</div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;