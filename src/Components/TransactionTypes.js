import { Link } from 'react-router-dom';
import MainLayout from '../MainLayout';
import '../StyleSheet/transactiontypes.css'

const TransactionTypes = () => {
  return (
    <MainLayout>
        <div className="transaction-types">
          <h1 style={{fontSize:'4rem'}}>Transaction Types</h1>
          <ul className='type-list'>
            <li>
              <Link className='type-items' to="/balance">Check Balance</Link>
            </li>
            <li>
              <Link className='type-items' to="/user/transaction-types/cash-withdrawals">Cash Withdrawals</Link>
            </li>
            <li>
              <Link className='type-items' to="/bill-payments">Deposit</Link>
            </li>
            <li>
              <Link className='type-items' to="/transfers">Change PIN</Link>
            </li>
          </ul>
        </div>
    </MainLayout>
  );
};

export default TransactionTypes;
