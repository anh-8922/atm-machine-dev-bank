import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PinInput from 'react-pin-input';
import '../StyleSheet/pinauthentication.css';
import MainLayout from '../MainLayout';

export default function PinAuthentication() {
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const pinInputRef = useRef(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handlePinChange = (value) => {
    setPin(value);
    setErrorMessage(''); // Clear any previous error message when the user types a new PIN
  };

  const handlePinSubmit = async () => {
    try {
      const response = await fetch('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pin: pin,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setBalance(data.currentBalance);
        console.log('Good job! PIN is correct!');
        // Navigate to the TransactionTypes page when the PIN is correct
        navigate('/user/transaction-types');
      } else if (response.status === 403) {
        setErrorMessage('Incorrect PIN. Please enter a valid PIN.');
        pinInputRef.current.clear();
      } else {
        setErrorMessage('Error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <MainLayout>
      <div className='authentication-page'>
        <p style={{fontSize:'2rem', fontWeight:'500'}}>Enter Your PIN:</p>
        <PinInput
          ref={pinInputRef}
          length={4}
          focus
          type="numeric"
          inputMode="numeric"
          pattern="\d*"
          onChange={handlePinChange}
        />
        
        <button className='pin-button' onClick={handlePinSubmit}>Enter</button> {/* Add the submit button */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </MainLayout>
  );
};

