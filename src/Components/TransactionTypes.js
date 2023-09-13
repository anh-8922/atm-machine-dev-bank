import { Link } from 'react-router-dom';

const TransactionTypes = () => {
  return (
    <div className="transaction-types">
      <h1>Transaction Types</h1>
      <ul>
        <li>
          <Link to="/deposits">Deposits</Link>
        </li>
        <li>
          <Link to="/user/transaction-types/cash-withdrawals">Cash Withdrawals</Link>
        </li>
        <li>
          <Link to="/bill-payments">Bill Payments</Link>
        </li>
        <li>
          <Link to="/transfers">Transfers Between Accounts</Link>
        </li>
      </ul>
    </div>
  );
};

export default TransactionTypes;
