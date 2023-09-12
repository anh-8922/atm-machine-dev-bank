import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../StyleSheet/landingpage.css';

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
    <div className="landing-page">
      <h1>Welcome to the ATM App</h1>
      <div className={`slide-button-container ${isSliding ? 'sliding' : ''}`}>
        <p>Slide to Enter</p>
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
      {isSliding && (
        <p className="redirect-message">Release to enter PIN page...</p>
      )}
    </div>
  );
}