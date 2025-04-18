import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Redirect based on selected role
    switch (role) {
      case 'user':
        navigate('/');
        break;
      case 'admin':
        navigate('/admindashboard');
        break;
      case 'hotel':
        navigate('/hoteldashboard');
        break;
      case 'flight':
        navigate('/flightdashboard');
        break;
      case 'cab':
        navigate('/cabdashboard');
        break;
      case 'train':
        navigate('/train-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Login to book your next adventure ✈️</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="hotel">Hotel Admin</option>
            <option value="flight">Flight Admin</option>
            <option value="cab">Cab Admin</option>
            <option value="train">Train Admin</option>
          </select>

          <button type="submit">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
