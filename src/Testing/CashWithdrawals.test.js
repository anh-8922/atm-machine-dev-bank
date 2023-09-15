import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ATMApp from "../Components/CashWithdrawals"; // Adjust the import to your file structure

// Mock noteData
const mockNoteData = [
  { value: 50, count: 10 },
  { value: 20, count: 10 },
  { value: 10, count: 10 },
];

jest.mock("../Data/NoteData", () => mockNoteData);

describe("ATMApp Component", () => {
  it("displays the initial balance and overdraft allowance", () => {
    render(<ATMApp />);
    expect(screen.getByText("Your Current Balance: £220")).toBeInTheDocument();
    expect(
      screen.getByText("Monthly Overdraft Allowance: £100")
    ).toBeInTheDocument();
  });

  it("handles withdrawal correctly", async () => {
    render(<ATMApp />);
    const input = screen.getByLabelText(/Enter Amount: £/i);
    const submitButton = screen.getByText(/Submit/i);

    userEvent.type(input, "70");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Dispensed Amount: £70")).toBeInTheDocument();
      expect(screen.getByText("Total Notes Dispensed: 3")).toBeInTheDocument();
    });
  });

  it("shows a confirmation modal and updates the balance when confirmed", async () => {
    render(<ATMApp />);
    const input = screen.getByLabelText(/Enter Amount: £/i);
    const submitButton = screen.getByText(/Submit/i);

    userEvent.type(input, "70");
    userEvent.click(submitButton);

    await waitFor(() => {
      const yesButton = screen.getByText(/Yes/i);
      userEvent.click(yesButton);
    });

    expect(screen.getByText("Your Current Balance: £150")).toBeInTheDocument();
  });

  it('navigates to the home page when "Cancel" is clicked', () => {
    render(
      <MemoryRouter initialEntries={["/atm"]}>
        <Route path="/atm" component={ATMApp} />
        <Route path="/" render={() => <div>Home Page</div>} />
      </MemoryRouter>
    );

    const cancelButton = screen.getByText(/Cancel/i);
    userEvent.click(cancelButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it('navigates to the transaction types page when "Back" is clicked', () => {
    render(
      <MemoryRouter initialEntries={["/atm"]}>
        <Route path="/atm" component={ATMApp} />
        <Route
          path="/user/transaction-types"
          render={() => <div>Transaction Types Page</div>}
        />
      </MemoryRouter>
    );

    const backButton = screen.getByText(/Back/i);
    userEvent.click(backButton);

    expect(screen.getByText("Transaction Types Page")).toBeInTheDocument();
  });
});
