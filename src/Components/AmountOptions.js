import React from 'react';

const AvailableNotes = () => {
  // Define the available notes
  const availableNotes = [
    { value: 5, label: '£5' },
    { value: 10, label: '£10' },
    { value: 20, label: '£20' },
    { value: 30, label: '£30' },
    { value: 50, label: '£50' },
    { value: 100, label: '£100' },
    { value: 200, label: '£200' },
    { value: 500, label: '£500' },
  ];

  return (
    <div>
      <h2>Available Notes for Withdrawal</h2>
      <ul>
        {availableNotes.map((note) => (
          <li key={note.value}>{note.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableNotes;
