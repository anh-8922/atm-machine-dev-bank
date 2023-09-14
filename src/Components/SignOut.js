import '../StyleSheet/landingpage.css';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
    const navigate = useNavigate();

    const handleCancelClick = () => {
    // Use the navigate function to navigate to the home page
    navigate('/');
  };
    const handleBackClick = () => {
        navigate('/user/transaction-types')
    }
    return(
        <div className='sign-out'>
            <button className="sign-options" onClick={handleBackClick}>Back</button> 
            <button className="sign-options" onClick={handleCancelClick}>Cancel</button>
            
        </div>
    )
}