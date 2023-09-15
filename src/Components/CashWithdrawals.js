import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteData from '../Data/NoteData'; // Import noteData 
import '../StyleSheet/cashwithdraw.css';
import MainLayout from '../MainLayout';
import {TiArrowBackOutline} from 'react-icons/ti';
import {VscSignOut} from 'react-icons/vsc';

const ATMApp = () => {
  const initialBalance = 220;
  const overdraftAllowance = 100;
  const [balance, setBalance] = useState(initialBalance);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [dispensedAmount, setDispensedAmount] = useState(0);
  const [totalNotesDispensed, setTotalNotesDispensed] = useState(0); // New state for total notes dispensed
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
      let totalDispensedNotes = 0; // Initialize total dispensed notes

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
          totalDispensedNotes += notesToDispense; // Update total dispensed notes
        }

        if (remainingAmountToDispense === 0) break;
      }

      // Update state with dispensed amount, notes, and total dispensed notes
      setDispensedAmount(withdrawalAmount - remainingAmountToDispense);
      setNotesDispensed(dispensedNotes);
      setTotalNotesDispensed(totalDispensedNotes);
      setUpdatedNotesData(updatedNotes);

      // Show the withdrawal confirmation modal
      setShowConfirmationModal(true);
    } else {
      alert('Withdrawal amount exceeds overdraft allowance.');
    }
  };

  //Handle yes/no confirmation options
  const handleConfirmationYes = () => {
    // Update balance
    const newBalance = balance - withdrawalAmount;
    setBalance(newBalance);

    // Reset withdrawal input
    setWithdrawalAmount(0);

    // Reset confirmation modal
    setShowConfirmationModal(false);
    alert('Please take you cash. Do you want to carry on?');
  };

  const handleConfirmationNo = () => {
    setShowConfirmationModal(false);
    alert('Thank you for using the service.');
  };
  //Handle back/cancel buttons
  const navigate = useNavigate();

    const handleCancelClick = () => {
    // Use the navigate function to navigate to the home page
    navigate('/');
  };
    const handleBackClick = () => {
        navigate('/user/transaction-types')
    }

  return (
    <MainLayout>
      <div style={{ backgroundColor:'whitesmoke' , textAlign: 'center', height: '110vh', width:'100%'}}>
        <h1 className='withdrawal-title'>Withdrawal Request</h1>
        <div className='cash-withdrawal-box'>
          <div className='balance'>
            <p>Your Current Balance: £{balance}</p>
            <p>Monthly Overdraft Allowance: £{overdraftAllowance}</p>
          </div>
          <div>
            <h2 style={{fontSize:'1.3rem'}}>Available Notes</h2>
            <ul className='available-notes'>
              {updatedNotesData.map((note) => (
                <li key={note.value}>
                  <span>£{note.value}</span> notes: <span>{note.count}</span> available
                </li>
              ))}
            </ul>

          </div>

          <div className='withdraw-input'>
            <h2 style={{fontSize:'1.3rem'}}>How much cash would you like to access?</h2>
            <label>
              <span style={{paddingRight:'1rem'}}>Enter Amount: £</span>
              <input style={{fontSize:'1.5rem'}}
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              />
            </label>
            <button className='submit-button' onClick={handleWithdrawal}>Submit</button>
          </div>

          {showConfirmationModal && (
            <div className="confirmation-modal">
              <p>Dispensed Amount: £{dispensedAmount}</p>
              <p>Total Notes Dispensed: {totalNotesDispensed}</p>
              <p style={{ fontWeight: 'bold' }}>Do you want to process?</p>
              <button className='confirmation-options' onClick={handleConfirmationYes}>Yes</button>
              <button className='confirmation-options' onClick={handleConfirmationNo}>No</button>
            </div>
          )}
        </div>
        <div className="cancel-option" style={{left: '0'}} onClick={handleBackClick}><TiArrowBackOutline/>Back</div> 
        <div className="cancel-option" style={{right: '0'}} onClick={handleCancelClick}>Cancel<VscSignOut/></div>
      </div>
    </MainLayout>
  );
};

export default ATMApp;