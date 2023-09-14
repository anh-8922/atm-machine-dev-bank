import React, { useState } from 'react';
import noteData from '../Data/NoteData'; // Import noteData from your file
import '../StyleSheet/cash-withdraw.css';
import MainLayout from '../MainLayout';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const ATMApp = () => {
  const initialBalance = 220;
  const overdraftAllowance = 100;
  const [balance, setBalance] = useState(initialBalance);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [dispensedAmount, setDispensedAmount] = useState(0);
  const [notesDispensed, setNotesDispensed] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [updatedNotesData, setUpdatedNotesData] = useState(noteData);

  const handleWithdrawal = () => {
    // Calculate the remaining balance after withdrawal
    const remainingBalance = balance - withdrawalAmount;

    // Check if the withdrawal is within overdraft allowance
    if (remainingBalance >= -overdraftAllowance) {
      // Initialize variables to keep track of notes dispensed
      let remainingAmountToDispense = withdrawalAmount;
      const dispensedNotes = [];

      // Create a copy of the notes data to update
      const updatedNotes = [...updatedNotesData];

      // Iterate through available notes and dispense them
      for (const [index, note] of updatedNotes.entries()) {
        const noteValue = note.value;
        let availableNotes = note.count;

        const notesToDispense = Math.min(
          Math.floor(remainingAmountToDispense / noteValue),
          availableNotes
        );

        if (notesToDispense > 0) {
          dispensedNotes.push({ noteValue, count: notesToDispense });
          remainingAmountToDispense -= notesToDispense * noteValue;
          availableNotes -= notesToDispense;
          updatedNotes[index] = { ...note, count: availableNotes };
        }

        if (remainingAmountToDispense === 0) break;
      }

      // Update state with dispensed amount and notes
      setDispensedAmount(withdrawalAmount - remainingAmountToDispense);
      setNotesDispensed(dispensedNotes);
      setUpdatedNotesData(updatedNotes);

      // Show the withdrawal confirmation modal
      setShowConfirmationModal(true);
    } else {
      alert('Withdrawal amount exceeds overdraft allowance.');
    }
  };

  const handleConfirmationYes = () => {
    // Update balance
    const newBalance = balance - withdrawalAmount;
    setBalance(newBalance);

    // Reset withdrawal input
    setWithdrawalAmount(0);

    // Reset confirmation modal
    setShowConfirmationModal(false);
    alert('thank you')
  };

  const handleConfirmationNo = () => {
    setShowConfirmationModal(false);
    alert('Thank you for using the service.');
  };

  return (
    <MainLayout>
      <div className='cash-withdrawal-box'>
        <div className='balance'>
          <h1>Get Cash Now</h1>
          <p>YourCurrent Balance: £{balance}</p>
          <p>Your Overdraft Allowance: £{overdraftAllowance}</p>
        </div>
        <div>
          <h2>Available Notes</h2>
          <ul>
            {updatedNotesData.map((note) => (
              <li key={note.value}>
                £{note.value} notes: {note.count} available
              </li>
            ))}
          </ul>
        </div>

        <div className='withdraw-input'>
          <h2>How much do you want to withdraw?</h2>
          <label>
            Enter Amount: £
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
            />
          </label>
          <button onClick={handleWithdrawal}>Submit</button>
        </div>

        {showConfirmationModal && (
          <div className="confirmation-modal">
            <p>Dispensed Amount: £{dispensedAmount}</p>
            <p>Total Notes Dispensed: {notesDispensed.length}</p>
            <p>Do you want to process?</p>
            <button onClick={handleConfirmationYes}>Yes</button>
            <button onClick={handleConfirmationNo}>No</button>
          </div>
        )}
      </div>
      
    </MainLayout>
  );
};

export default ATMApp;
