import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Signup from './components/Signup';
import './index.css';
import Login from './components/Login';
import HotelAdmin from './components/HotelAdmin';
import FlightAdmin from './components/FlightAdmin';
import AddHotel from './components/AddHotel';
import Hotels from './components/Hotels';

function App() {
  // Define the routes where Nav should NOT be visible
  const hiddenNavRoutes = ['/hoteldashboard', '/flightdashboard'];

  // State to manage the list of hotels
  const [hotelsData, setHotelsData] = useState([
    {
      id: 1,
      name: 'Sunshine Grand',
      location: 'New York, USA',
      type: 'Luxury Hotel',
      stars: 5,
      image: 'https://source.unsplash.com/featured/?hotel,1',
    },
    {
      id: 2,
      name: 'Ocean Breeze',
      location: 'Goa, India',
      type: 'Beach Resort',
      stars: 4,
      image: 'https://source.unsplash.com/featured/?resort,2',
    },
    {
      id: 3,
      name: 'Mountain View Inn',
      location: 'Zermatt, Switzerland',
      type: 'Budget Stay',
      stars: 3,
      image: 'https://source.unsplash.com/featured/?mountain,hotel',
    },
    {
      id: 4,
      name: 'Cityscape Suites',
      location: 'Tokyo, Japan',
      type: 'Urban Hotel',
      stars: 5,
      image: 'https://source.unsplash.com/featured/?city,hotel',
    },
  ]);

  // Function to add a new hotel
  const handleAddHotel = (newHotel) => {
    const updatedHotels = [...hotelsData, { ...newHotel, id: hotelsData.length + 1 }];
    setHotelsData(updatedHotels);
  };

  return (
    <Router>
      <RouteHandler 
        hiddenNavRoutes={hiddenNavRoutes} 
        hotelsData={hotelsData} 
        onAddHotel={handleAddHotel} 
      />
    </Router>
  );
}

function RouteHandler({ hiddenNavRoutes, hotelsData, onAddHotel }) {
  const location = useLocation();

  // Check if the current path is in the list of routes where Nav should be hidden
  const isNavVisible = !hiddenNavRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Nav based on the current route */}
      {isNavVisible && <Nav />}

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hoteldashboard" element={<HotelAdmin />} />
        <Route path="/flightdashboard" element={<FlightAdmin />} />
        <Route 
          path="/addhotel" 
          element={<AddHotel onAddHotel={onAddHotel} />} 
        />
        <Route 
          path="/hotels" 
          element={<Hotels hotelsData={hotelsData} />} 
        />
      </Routes>
    </>
  );
}

export default App;