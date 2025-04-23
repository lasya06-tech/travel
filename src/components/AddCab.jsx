import React, { useState } from 'react';
import './AddCab.css';

const AddCab = ({ onAddCab }) => {
  const [newCab, setNewCab] = useState({
    cabNumber: '',
    driver: '',
    from: '',
    to: '',
    pickupTime: '',
    isAvailable: '',
    image: '' // Added image field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCab({ ...newCab, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { cabNumber, driver, from, to, pickupTime, isAvailable, image } = newCab;

    if (!cabNumber || !driver || !from || !to || !pickupTime || isAvailable === '' || !image) {
      alert('Please fill all fields including image URL.');
      return;
    }

    const cabToAdd = {
      ...newCab,
      isAvailable: isAvailable === 'yes',
    };

    onAddCab(cabToAdd);
    setNewCab({
      cabNumber: '',
      driver: '',
      from: '',
      to: '',
      pickupTime: '',
      isAvailable: '',
      image: ''
    });
  };

  return (
    <div className="add-cab">
      <h2>Add a New Cab</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cabNumber" value={newCab.cabNumber} onChange={handleChange} placeholder="Cab Number" />
        <input type="text" name="driver" value={newCab.driver} onChange={handleChange} placeholder="Driver Name" />
        <input type="text" name="from" value={newCab.from} onChange={handleChange} placeholder="From" />
        <input type="text" name="to" value={newCab.to} onChange={handleChange} placeholder="To" />
        <input type="text" name="pickupTime" value={newCab.pickupTime} onChange={handleChange} placeholder="Pickup Time" />
        <select name="isAvailable" value={newCab.isAvailable} onChange={handleChange}>
          <option value="">Available?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input type="text" name="image" value={newCab.image} onChange={handleChange} placeholder="Cab Image URL" />
        <button type="submit">Add Cab</button>
      </form>
    </div>
  );
};

export default AddCab;