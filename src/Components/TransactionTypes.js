import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../MainLayout';

import '../StyleSheet/transactiontypes.css';

const TransactionTypes = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePinChangeClick = () => {
    setShowPopup(true);
  };

  return (
    <MainLayout>
      <div className="transaction-types">
        <h1 style={{ fontSize: '4rem' }}>Transaction Types</h1>
        <ul className="type-list">
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>Check Balance</Link>
          </li>
          <li>
            <Link className="type-items" to="/user/transaction-types/cash-withdrawals">
              Cash Withdrawals
            </Link>
          </li>
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>
              Deposit
            </Link>
          </li>
          <li>
            <span className="type-items" onClick={handlePinChangeClick}>
              Change PIN
            </span>
          </li>
        </ul>
      </div>
      {showPopup && (
        <div className="popup" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', color:'black' }}>
          <p>The service is not available</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
    </MainLayout>
  );
};

export default TransactionTypes;
