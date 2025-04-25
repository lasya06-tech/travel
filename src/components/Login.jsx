import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null); // Store CAPTCHA value
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert('Please complete the CAPTCHA!');
      return;
    }

    // Save the username in localStorage or state
    localStorage.setItem('username', username);

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
        navigate('/traindashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Handle CAPTCHA value change
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Login to book your next adventure ✈️</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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

          {/* reCAPTCHA Component */}
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LcZiSMrAAAAAFzxhQTIJ9FgZtczWkiTKKfe3iSA"
              // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange}
            />
          </div>

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
