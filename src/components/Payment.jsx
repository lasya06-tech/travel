import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const handlePayment = () => {
    alert('Payment Successful!');
    navigate('/hotels');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Secure Payment</h2>

      <div style={styles.switcher}>
        <button
          onClick={() => setShowQR(false)}
          style={{ ...styles.switchButton, backgroundColor: !showQR ? '#007bff' : '#ccc' }}
        >
          Card Payment
        </button>
        <button
          onClick={() => setShowQR(true)}
          style={{ ...styles.switchButton, backgroundColor: showQR ? '#007bff' : '#ccc' }}
        >
          QR / UPI
        </button>
      </div>

      {showQR ? (
        <div style={styles.qrContainer}>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=Example"
            alt="Scan to Pay"
            style={styles.qr}
          />
          <p style={styles.qrText}>Scan with any UPI App</p>
        </div>
      ) : (
        <div style={styles.form}>
          <label>
            Card Number:
            <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx" style={styles.input} maxLength="19" />
          </label>
          <label>
            Expiry Date:
            <input type="text" placeholder="MM/YY" style={styles.input} maxLength="5" />
          </label>
          <label>
            CVV:
            <input type="password" placeholder="CVV" style={styles.input} maxLength="3" />
          </label>
          <button onClick={handlePayment} style={styles.button}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '420px',
    margin: '40px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '16px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  switcher: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '10px'
  },
  switchButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  },
  qrContainer: {
    textAlign: 'center'
  },
  qr: {
    width: '200px',
    height: '200px'
  },
  qrText: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555'
  }
};

export default Payment;
