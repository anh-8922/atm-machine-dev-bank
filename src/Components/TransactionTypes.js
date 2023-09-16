import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../MainLayout';
import '../StyleSheet/transactiontypes.css';
import CancelButton from './LogoutButtons';

// This component represents the transaction types page.
export default function TransactionTypes() {
  // State to manage the visibility of the popup which tell the user that 'service is not available'.
  const [showPopup, setShowPopup] = useState(false);
  const handlePopupClose = () => {
    setShowPopup(false);
  };
  // Function to close the popup.
  const handlePinChangeClick = () => {
    setShowPopup(true);
  };

  return (
    <MainLayout>
      <div className="transaction-types">
        <h1 className='type-title'>Welcome back Michael! Choose Your Transaction Type</h1>
        <ul className="type-list">
          <li>
            <Link className="type-items" to="/user/transaction-types/cash-withdrawals">Cash Withdrawals</Link>
          </li>
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>Transfer</Link>
          </li>
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>Deposit</Link>
          </li>
          <li>
            <Link className="type-items" onClick={handlePinChangeClick}>Change PIN</Link>
          </li>
        </ul>
      </div>
      {showPopup && (
        <div className="popup" style={{  }}>
          <p>The service is not available</p>
          <button style={{
            padding:'0.3rem 0.8rem', margin: '1rem 0', borderRadius:'0.5rem'
            }} onClick={handlePopupClose}>Close
          </button>
        </div>
      )}
      <CancelButton/>
    </MainLayout>
  );
};


