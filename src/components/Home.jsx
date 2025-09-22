import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const joinAsUser = (userType) => {
    navigate(`/call/${userType}`);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Agora Video Call Demo</h1>
        <p>Choose your user type to join the video call</p>
        
        <div className="button-container">
          <button 
            className="user-button user-a-button"
            onClick={() => joinAsUser('userA')}
          >
            Join as User A
          </button>
          
          <button 
            className="user-button user-b-button"
            onClick={() => joinAsUser('userB')}
          >
            Join as User B
          </button>
        </div>
        
        <div className="info">
          <p><strong>Instructions:</strong></p>
          <ul>
            <li>Open this app in two browser windows</li>
            <li>Click "Join as User A" in one window</li>
            <li>Click "Join as User B" in the other window</li>
            <li>Allow camera and microphone permissions</li>
            <li>You should see each other's video!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;