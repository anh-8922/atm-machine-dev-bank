import React, { useState } from 'react';

const ATMApp = () => {
    const [pin, setPin] = useState('');
    const [balance, setBalance] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [overdraft, setOverdraft] = useState(false);
  
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
          <button onClick={handleWithdrawal}>Withdraw</button>
        </div>
      ) : (
        <div>
          <p>Enter Your PIN:</p>
          <input type="password" value={pin} onChange={handlePinChange} />
          <button onClick={handlePinSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default ATMApp;
