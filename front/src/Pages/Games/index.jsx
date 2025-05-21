import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

export const GamesPage = () => {
  return (
    <div>
      <h1>Games</h1>
      <div style={{ marginTop: '20px' }}> {/* Optional: simple styling for spacing */}
        <Link to="/games/tic-tac-toe" style={{ display: 'block', marginBottom: '10px' }}>
          Play Tic-Tac-Toe
        </Link>
        <Link to="/games/snake" style={{ display: 'block' }}>
          Play Snake
        </Link>
      </div>
    </div>
  );
};
