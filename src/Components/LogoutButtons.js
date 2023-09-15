import {VscSignOut} from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

export default function CancelButton() {
    const navigate = useNavigate();

    const handleCancelClick = () => {
    // Use the navigate function to navigate to the home page
    navigate('/');
  };
   


    const myStyle = {
        background: 'none',
        color: 'whitesmoke',
        borderRadius: '50%',
        position: 'fixed',
        cursor: 'pointer',
        bottom: '0',
        right: '0',
        fontSize: '1rem',
        margin:'1rem 2rem',   
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem'
    }

    return(
        <>
            <div style={myStyle} onClick={handleCancelClick}>
                <p style={{paddingTop:'0.7rem'}}>Cancel</p><VscSignOut style={{fontSize:'3rem'}}/>
            </div>
        </>
    )
}