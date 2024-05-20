import React, { useState } from 'react';
import './App.css';

const TicTacToeGame = ({ onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moves, setMoves] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameOver || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const newMoves = [...moves, index];
    setMoves(newMoves);

    if (newMoves.length >= 6) {
      const firstMoveIndex = newMoves.shift();
      newBoard[firstMoveIndex] = null;
    }

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setMoves([]);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.filter(square => square !== null).length >= 9) {
    status = 'Draw';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">
        <div className="status-text">{status}</div>
        <button onClick={onBack} className="back-button">Back</button>
      </div>
      <div className="board">
        {board.map((square, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)} disabled={gameOver || square}>
            <span className={`pixel-font ${square === 'X' ? 'x' : 'o'}`}>{square}</span>
          </button>
        ))}
        {gameOver && (
          <div className="restart-button">
            <button onClick={resetGame} className="pixel-button">Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToeGame;