import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteData from '../Data/NoteData'; // Import noteData 
import '../StyleSheet/cashwithdraw.css';
import MainLayout from '../MainLayout';
import { TiArrowBackOutline } from 'react-icons/ti';
import { VscSignOut } from 'react-icons/vsc';
import polygon from '../Assets/polygon.jpg';

// CashWithdraw component for handling cash withdrawals
export default function CashWithdraw() {
  // Initial balance and overdraft allowance
  const initialBalance = 220;
  const overdraftAllowance = 100;

  // State variables to manage cash withdrawal process
  const [balance, setBalance] = useState(initialBalance);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [dispensedAmount, setDispensedAmount] = useState(0);
  const [totalNotesDispensed, setTotalNotesDispensed] = useState(0); // New state for total notes dispensed
  const [overdraftAmount, setOverdraftAmount] = useState(0); // New state for overdraft amount
  const [notesDispensed, setNotesDispensed] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [updatedNotesData, setUpdatedNotesData] = useState(noteData);

  // Create copies of the state values before showing the confirmation modal
  const [prevBalance, setPrevBalance] = useState(balance);
  const [prevUpdatedNotesData, setPrevUpdatedNotesData] = useState(updatedNotesData);
  const [prevOverdraftAmount, setPrevOverdraftAmount] = useState(0);

  // Function to handle the cash withdrawal process
  const handleWithdrawal = () => {
    // Calculate the remaining balance after withdrawal
    const remainingBalance = balance - withdrawalAmount;

    if (remainingBalance >= 0) {
      // Withdrawal within the balance, no overdraft
      setOverdraftAmount(0);
    } else {
      // Calculate the overdraft amount
      setOverdraftAmount(-remainingBalance);
    }

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

  // Function to handle 'Yes' option in the confirmation modal
  const handleConfirmationYes = () => {
    // Update balance
    const newBalance = balance - withdrawalAmount;
    setPrevBalance(newBalance); // Update the previous balance
    setBalance(newBalance);

    // Reset withdrawal input
    setWithdrawalAmount(0);

    // Reset overdraft amount
    setPrevOverdraftAmount(0); // Update the previous overdraft amount
    setOverdraftAmount(0);

    // Reset confirmation modal
    setShowConfirmationModal(false);
    alert('Please take your cash. Do you want to carry on?');
  };

  // Function to handle 'No' option in the confirmation modal
  const handleConfirmationNo = () => {
    // Revert balance to previous value
    setBalance(prevBalance);

    // Revert notes data to previous value
    setUpdatedNotesData(prevUpdatedNotesData);

    // Revert overdraft amount to previous value
    setOverdraftAmount(prevOverdraftAmount);

    setShowConfirmationModal(false);
    alert('Thank you for using the service.');
  };

  // Function to navigate back to the previous page or leave the transaction and back to home page
  const navigate = useNavigate();

  const handleCancelClick = () => {
    // Use the navigate function to navigate to the home page
    navigate('/');
  };
    // Use the navigate function to navigate to transaction types
  const handleBackClick = () => {
    navigate('/user/transaction-types');
  };

  return (
    <MainLayout>
      <div style={{ 
        backgroundImage: `url("${polygon}")`,backgroundSize:'cover', 
        textAlign: 'center', height: '100vh', minWidth: '100%' 
      }}>
        <h1 className='withdrawal-title'>Quick Cash Withdrawal</h1>
        <div className='cash-withdrawal-box'>
          <div className='balance'>
            <p>Your Current Balance: £{balance}</p>
            <p>Monthly Overdraft Allowance: £{overdraftAllowance}</p>
            {overdraftAmount > 0 && <p>Overdraft Amount: £{overdraftAmount}</p>}
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem' }}>Available Notes</h2>
            <ul className='available-notes'>
              {updatedNotesData.map((note) => (
                <li key={note.value}>
                  <span>£{note.value}</span> notes: <span>{note.count}</span> available
                </li>
              ))}
            </ul>
          </div>

          <div className='withdraw-input'>
            <h2 style={{ fontSize: '1.3rem' }}>How much cash would you like to withdraw?</h2>
            <label>
              <span style={{ paddingRight: '1rem' }}>Enter Amount: £</span>
              <input style={{ fontSize: '1.5rem' }}
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              />
            </label>
            <button className='submit-button' onClick={handleWithdrawal}>Submit</button>
          </div>

          {showConfirmationModal && (
            <div className="confirmation-modal">
              <div className='modal-content'>
                <p>Dispensed Amount: £{dispensedAmount}</p>
                {overdraftAmount > 0 && <p>Overdraft Amount: £{overdraftAmount} <br/>
                  <span style={{color:'green', fontWeight:'500'}}>Insufficient balance. Accept overdraft for withdrawal?</span></p>
                }
                <p>Total Notes Dispensed: {totalNotesDispensed}</p>
                <p style={{ fontWeight: 'bold' }}>Do you want to process?</p>
                <button className='confirmation-options' onClick={handleConfirmationYes}>Yes</button>
                <button className='confirmation-options' onClick={handleConfirmationNo}>No</button>
              </div>
              
            </div>
          )}
        </div>
        <div className="cancel-option" style={{ left: '0' }} onClick={handleBackClick}><TiArrowBackOutline />Back</div>
        <div className="cancel-option" style={{ right: '0' }} onClick={handleCancelClick}>Cancel<VscSignOut /></div>
      </div>
    </MainLayout>
  );
};
