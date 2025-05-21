import React, { useState } from 'react'; // Removed useEffect as per example's final state

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(square => square !== null)) {
        return 'Draw';
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) {
      return; // Ignore click if game is over or square is filled
    }
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const currentWinner = calculateWinner(newBoard);
    if (currentWinner) {
        setWinner(currentWinner);
    } else {
        setIsXNext(!isXNext);
    }
  };

  const renderSquare = (i) => {
    return (
      <button 
        className="square" // Add a class for styling
        onClick={() => handleClick(i)}
        style={{ width: '60px', height: '60px', border: '1px solid #999', fontSize: '24px', margin: '2px', background: 'white', color: 'black' }} // Basic styling
      >
        {board[i]}
      </button>
    );
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  let status;
  if (winner) {
    status = winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Tic-Tac-Toe</h2>
      <div className="status" style={{ marginBottom: '10px', fontSize: '20px' }}>{status}</div>
      <div className="board-row" style={{ display: 'flex', justifyContent: 'center' }}>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row" style={{ display: 'flex', justifyContent: 'center' }}>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row" style={{ display: 'flex', justifyContent: 'center' }}>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button 
        onClick={restartGame} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Restart Game
      </button>
    </div>
  );
};
