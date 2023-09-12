import React, { useState } from 'react';
import AmountOptions from './AmountOptions'; // Import the component for amount options

const ATMApp = () => {
  const [pin, setPin] = useState('');
  const [balance, setBalance] = useState(null);
  const [overdraft, setOverdraft] = useState(false);
  const [showAmountOptions, setShowAmountOptions] = useState(false); // Track if the amount options page should be displayed

  const handlePinChange = (e) => {
    setPin(e.target.value);
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
        setShowAmountOptions(true); // Show the amount options page
      } else if (response.status === 403) {
        console.error('Incorrect PIN');
      } else {
        console.error('Error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleWithdrawal = async (amount) => {
    if (balance !== null && balance - amount >= -100) {
      // Check if sufficient funds or within overdraft limit
      // Implement withdrawal logic here
      // Update balance and withdrawals accordingly
    } else {
      setOverdraft(true);
    }
  };

  return (
    <div>
      <h1>ATM App</h1>
      {balance !== null ? (
        <div>
          <p>Current Balance: £{balance}</p>
          {showAmountOptions ? (
            <AmountOptions handleWithdrawal={handleWithdrawal} />
          ) : (
            <button onClick={() => setShowAmountOptions(true)}>Choose Amount</button>
          )}
        </div>
      ) : (
        <div>
          <p>Enter Your PIN:</p>
          <input type="password" value={pin} onChange={handlePinChange} />
          <button onClick={handlePinSubmit}>Submit</button>
        </div>
      )}
      {overdraft && <p>You've exceeded the overdraft limit!</p>}
    </div>
  );
};

export default ATMApp;
