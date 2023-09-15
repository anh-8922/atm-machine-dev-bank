import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../MainLayout';
import '../StyleSheet/transactiontypes.css';
import CancelButton from './LogoutButtons';

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
        <h1 style={{ fontSize: '3rem' }}>Transaction Types</h1>
        <ul className="type-list">
          <li>
            <Link className="type-items" to="/user/transaction-types/cash-withdrawals">
              Cash Withdrawals
            </Link>
          </li>
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>Transfer</Link>
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
        <div className="popup" style={{  }}>
          <p>The service is not available</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
      <CancelButton/>
    </MainLayout>
  );
};

export default TransactionTypes;
