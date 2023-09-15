import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PinAuthentication from '../Components/PinAuthentication';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ currentBalance: 1000 }),
  })
);

describe('PinAuthentication', () => {
  it('renders without errors', () => {
    render(<PinAuthentication />);
    
    expect(screen.getByText('Enter Your PIN:')).toBeInTheDocument();
  });

  it('handles correct PIN input and submission', async () => {
    render(
      <MemoryRouter>
        <PinAuthentication />
        <Route path="/user/transaction-types">Transaction Types Page</Route>
      </MemoryRouter>
    );
    const pinInput = screen.getByRole('textbox', { name: /enter your pin/i });
    const enterButton = screen.getByRole('button', { name: /enter/i });

    // Simulate user input
    fireEvent.change(pinInput, { target: { value: '1111' } });
    expect(pinInput.value).toBe('1111');

    // Simulate button click
    fireEvent.click(enterButton);

    // Wait for the fetch request to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://frontend-challenge.screencloud-michael.now.sh/api/pin/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin: '1111' }),
        })
      );
    });

    // Ensure the component updated accordingly
    expect(screen.queryByText('Incorrect PIN. Please enter a valid PIN.')).toBeNull();
    expect(screen.getByText('Good job! PIN is correct!')).toBeInTheDocument();
    expect(screen.getByText('Transaction Types Page')).toBeInTheDocument();
  });

  it('handles incorrect PIN input', async () => {
    // Mock a 403 error response
    global.fetch.mockResolvedValueOnce({ status: 403 });

    render(<PinAuthentication />);
    const pinInput = screen.getByRole('textbox', { name: /enter your pin/i });
    const enterButton = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(pinInput, { target: { value: '0000' } });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://frontend-challenge.screencloud-michael.now.sh/api/pin/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin: '0000' }),
        })
      );
    });

    expect(screen.queryByText('Good job! PIN is correct!')).toBeNull();
    expect(screen.getByText('Incorrect PIN. Please enter a valid PIN.')).toBeInTheDocument();
  });

  it('handles network error', async () => {
    // Mock a network error
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));

    render(<PinAuthentication />);
    const pinInput = screen.getByRole('textbox', { name: /enter your pin/i });
    const enterButton = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(pinInput, { target: { value: '1111' } });
    fireEvent.click(enterButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://frontend-challenge.screencloud-michael.now.sh/api/pin/',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin: '1111' }),
        })
      );
    });

    expect(screen.queryByText('Good job! PIN is correct!')).toBeNull();
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
