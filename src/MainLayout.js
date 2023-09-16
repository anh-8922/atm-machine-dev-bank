import './StyleSheet/stylesheet.css';
import {BsQuestionCircle} from 'react-icons/bs';
import { useState } from 'react';

export default function MainLayout({children}) {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handlePinChangeClick = () => {
        setShowPopup(true);
    };
    return(
        <div  className="layout-body">
            <div className="heading">
                <h1 style={{fontSize:'2.5rem', color:'whitesmoke'}}>
                    <span style={{color:'var(--orange)', fontSize:'2.5rem'}}>Dev</span>Bank
                </h1>
                <BsQuestionCircle className='question-icon' onClick={handlePinChangeClick}/>
                {showPopup && (
                    <div className="question" style={{  }}>
                    <p>If you have any question, please contact us at: <br/>
                        Phone: +44 123-456-789 <br/>
                        Email: info@dev.bank</p>
                    <button style={{padding:'0.3rem 0.8rem', margin: '1rem 0', borderRadius:'0.5rem'}} onClick={handlePopupClose}>Close</button>
                    </div>
                )}
            </div>
            <div style={{}}>{children}</div>
        </div>
    )
}