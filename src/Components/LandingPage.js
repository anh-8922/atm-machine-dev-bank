import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../StyleSheet/stylesheet.css';
import MainLayout from "../MainLayout";
import card from '../Assets/card.png';

export default function Landing() {
    const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleSlideStart = () => {
    setIsSliding(true);
  };

  const handleSlideEnd = () => {
    if (isSliding) {
      setIsSliding(false);
      // Use navigate to navigate to the 'enter-pin' route
      setTimeout(() => {
        navigate('/enter-pin');
      }, 500); // Redirect after a 1-second delay
    }
  };

  return (
    <MainLayout>
      <div className="landing-content">
        <h1 className="welcome">Welcome to DevBank ATM Machine</h1>
        <div style={{ backgroundImage:`url("${card}")`, width:'13rem', height:'10rem',
                      backgroundSize:'cover', margin:'1rem 0' }}></div>
        <div className={`slide-button-container ${isSliding ? 'sliding' : ''}`}>
          <p style={{fontSize:'1.5rem'}}>Slide to Enter</p>
          <div className="slide-button-border">
            <button
              onMouseDown={handleSlideStart}
              onMouseUp={handleSlideEnd}
              onTouchStart={handleSlideStart}
              onTouchEnd={handleSlideEnd}
              className={`slide-button ${isSliding ? 'slide-complete' : ''}`}
            >
            Slide
          </button>
          </div>
        
        </div>
        {isSliding && (
          <p className="redirect-message">Release to enter PIN page...</p>
        )}
      </div>
      
    </MainLayout>
  );
}