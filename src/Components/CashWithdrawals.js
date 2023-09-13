import React, { useState } from 'react';
import noteData from '../Data/NoteData'; // Import noteData from your file

export default function AmountOptions() {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmExitPopupVisible, setConfirmExitPopupVisible] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(220); // Initial balance
  const [overdraftAllowance, setOverdraftAllowance] = useState(100); // Initial overdraft allowance
  const [dispensedAmount, setDispensedAmount] = useState(0);
  const [totalNotesDispensed, setTotalNotesDispensed] = useState({});
  const [transactionTypesPageVisible, setTransactionTypesPageVisible] = useState(false);

  const handleWithdrawal = (e) => {
    e.preventDefault();

    // Convert the withdrawalAmount to a number
    const amountToWithdraw = parseInt(withdrawalAmount);

    if (amountToWithdraw <= currentBalance) {
      // Sufficient balance
      handleSuccessfulWithdrawal(amountToWithdraw);
    } else if (amountToWithdraw <= currentBalance + overdraftAllowance) {
      // Withdrawal exceeding balance but within overdraft allowance
      setPopupVisible(true);
    } else {
      // Insufficient balance and overdraft allowance
      setPopupVisible(true);
    }
  };

  const handleSuccessfulWithdrawal = (amountToWithdraw) => {
    // Calculate dispensed amount and notes
    const dispensedNotes = calculateDispensedNotes(amountToWithdraw);
    const remainingAmount = amountToWithdraw - dispensedNotes.totalValue;

    // Deduct the withdrawal amount from the current balance
    setCurrentBalance(currentBalance - amountToWithdraw);

    // Set dispensed amount and notes
    setDispensedAmount(amountToWithdraw - remainingAmount);
    setTotalNotesDispensed(dispensedNotes.notes);

    // Clear withdrawal amount
    setWithdrawalAmount('');
  };

  const handleOverdraftWithdrawal = () => {
    // Deduct the overdraft amount used from the overdraft allowance
    setOverdraftAllowance(overdraftAllowance - (withdrawalAmount - currentBalance));

    // Deduct the withdrawal amount from the current balance
    setCurrentBalance(0);

    // Calculate dispensed amount and notes
    const dispensedNotes = calculateDispensedNotes(withdrawalAmount);
    
    // Set dispensed amount and notes
    setDispensedAmount(withdrawalAmount - dispensedNotes.totalValue);
    setTotalNotesDispensed(dispensedNotes.notes);

    // Clear withdrawal amount
    setWithdrawalAmount('');

    // Hide the popup
    setPopupVisible(false);
  };

  const calculateDispensedNotes = (amount) => {
    let remainingAmount = amount;
    const dispensedNotes = {};

    for (const note of noteData) {
      const { note: denomination, value, count } = note;

      const noteCount = Math.min(Math.floor(remainingAmount / value), count);
      if (noteCount > 0) {
        dispensedNotes[denomination] = noteCount;
        remainingAmount -= noteCount * value;
        note.count -= noteCount;
      }

      if (remainingAmount === 0) break;
    }

    return {
      notes: dispensedNotes,
      totalValue: amount - remainingAmount,
    };
  };

  const handleConfirmExit = (confirm) => {
    if (confirm) {
      // Navigate to transaction types page
      setTransactionTypesPageVisible(true);
    } else {
      // Show a thank you message and navigate to the landing page
      alert('Thank you for using our service!');
  
      // Simulate navigation to the landing page
      // In a real application, replace this with your actual routing logic
      setTransactionTypesPageVisible(false); // Hide the transaction types page
    }
    setConfirmExitPopupVisible(false);
  };
  return (
    <div>
      {transactionTypesPageVisible ? (
        // Render the transaction types page here
        <div>
          {/* Add the content for the transaction types page */}
          <h2>Transaction Types Page</h2>
          {/* ... */}
        </div>
      ) : (
        // Render the main ATM interface
        <div>
          <h2>Available Notes for Withdrawal</h2>
          <p>Current Balance is: £{currentBalance}</p>
          <p>Overdraft Allowance is: £{overdraftAllowance}</p>

          <form onSubmit={handleWithdrawal}>
            <label>
              Enter Withdrawal Amount: £
              <input
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </label>
            <button type="submit">Get Money</button>
          </form>

          {popupVisible && (
            <div className="popup">
              <h3>Insufficient Balance</h3>
              <p>Your balance and overdraft allowance are insufficient for withdrawal.</p>
              {overdraftAllowance > 0 && (
                <div>
                  <p>Do you want to use your overdraft allowance?</p>
                  <button onClick={handleOverdraftWithdrawal}>Yes</button>
                  <button onClick={() => setPopupVisible(false)}>No</button>
                </div>
              )}
            </div>
          )}

          <div className="dispensed-info">
            <p>Dispensed Amount: £{dispensedAmount}</p>
            <p>Total Notes Dispensed:</p>
            <ul>
              {Object.entries(totalNotesDispensed).map(([denomination, count]) => (
                <li key={denomination}>
                  £{denomination} Notes: {count}
                </li>
              ))}
            </ul>
          </div>

          {confirmExitPopupVisible && (
  <div className="popup">
    <h3>Confirmation</h3>
    <p>Do you want to carry on using our service?</p>
    <button onClick={() => handleConfirmExit(true)}>Yes</button>
    <button onClick={() => handleConfirmExit(false)}>No</button>
  </div>
)}
        </div>
      )}
    </div>
  );
}
