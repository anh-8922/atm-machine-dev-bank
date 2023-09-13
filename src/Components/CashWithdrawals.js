import React, { useState } from 'react';
import noteData from '../Data/NoteData'; // Import noteData from your file
import '../StyleSheet/cash-withdraw.css';
import MainLayout from '../MainLayout';

const ATMApp = () => {
  const [balance, setBalance] = useState(220);
  const overdraftAllowance = 100;
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [dispensedAmount, setDispensedAmount] = useState(0);
  const [notesDispensed, setNotesDispensed] = useState([]);

  const handleWithdrawal = () => {
    // Calculate the remaining balance after withdrawal
    const remainingBalance = balance - withdrawalAmount;

    // Check if the withdrawal is within overdraft allowance
    if (remainingBalance >= -overdraftAllowance) {
      // Initialize variables to keep track of notes dispensed
      let remainingAmountToDispense = withdrawalAmount;
      const dispensedNotes = [];

      // Iterate through available notes and dispense them
      for (const note of noteData) {
        const noteValue = note.value;
        const availableNotes = note.count;

        const notesToDispense = Math.min(
          Math.floor(remainingAmountToDispense / noteValue),
          availableNotes
        );

        if (notesToDispense > 0) {
          dispensedNotes.push({ noteValue, count: notesToDispense });
          remainingAmountToDispense -= notesToDispense * noteValue;
        }

        if (remainingAmountToDispense === 0) break;
      }

      // Update state with dispensed amount and notes
      setDispensedAmount(withdrawalAmount - remainingAmountToDispense);
      setNotesDispensed(dispensedNotes);

      // Update balance
      setBalance(remainingBalance);
    } else {
      // User is going overdrawn, handle as needed
      // You can show an error message or take other actions here
    }
  };

  return (
    <MainLayout>
      <div className='cash-withdrawal-box'>
        <h1>ATM App</h1>
        <p>Current Balance: £{balance}</p>
        <p>Overdraft Allowance: £{overdraftAllowance}</p>

        <div>
          <h2>Available Notes</h2>
          <ul>
            {noteData.map((note) => (
              <li key={note.value}>
                £{note.value} notes: {note.count} available
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Withdrawal</h2>
          <label>
            Enter Withdrawal Amount: £
            <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
            />
          </label>
          <button onClick={handleWithdrawal}>Submit</button>
        </div>

        {dispensedAmount > 0 && (
          <div>
            <h2>Dispensed Amount</h2>
            <p>Dispensed Amount: £{dispensedAmount}</p>
            <p>Total Notes Dispensed:</p>
            <ul>
              {notesDispensed.map((note) => (
                <li key={note.noteValue}>
                  £{note.noteValue} notes: {note.count}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ATMApp;
