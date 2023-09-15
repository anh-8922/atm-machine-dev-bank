import './StyleSheet/stylesheet.css';
import {BsQuestionCircle} from 'react-icons/bs';
import React, { useState } from 'react';

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
                <h1 style={{fontSize:'2.5rem'}}>
                    <span style={{color:'var(--orange)', fontSize:'2.5rem'}}>Dev</span>Bank
                </h1>
                <BsQuestionCircle style={{fontSize:'2rem', color:'var(--orange)'}} onClick={handlePinChangeClick}/>
                {showPopup && (
                    <div className="question" style={{  }}>
                    <p>If you have any questions, please contact us at: <br/>
                        Phone: +44 123-456-789 <br/>
                        Email: info@dev.bank"</p>
                    <button onClick={handlePopupClose}>Close</button>
                    </div>
                )}
            </div>
            <div>{children}</div>
        </div>
    )
}