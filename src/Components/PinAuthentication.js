import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PinAuthentication() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handlePinSubmit = () => {
    // Check if the PIN is correct (replace with your PIN verification logic)
    if (pin === '1111') {
      // Redirect to the user page
      navigate('/user/transaction-types');
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  return (
    <div className="pin-authentication">
      <h1>PIN Authentication</h1>
      <p>Enter your PIN:</p>
      <input
        type="password"
        placeholder="Enter PIN"
        value={pin}
        onChange={handlePinChange}
      />
      <button onClick={handlePinSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}