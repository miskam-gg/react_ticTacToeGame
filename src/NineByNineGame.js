import React, { useState } from 'react';
import './App.css';

const NineByNineGame = ({ onBack }) => {
  const [board, setBoard] = useState(Array(81).fill(null));
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

    if (newMoves.length >= 18) {
      const firstMoveIndex = newMoves.shift();
      newBoard[firstMoveIndex] = null;
    }

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [];
    // Горизонтальные линии
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 7; j++) {
        lines.push([i * 9 + j, i * 9 + j + 1, i * 9 + j + 2]);
      }
    }
    // Вертикальные линии
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 7; j++) {
        lines.push([i + j * 9, i + (j + 1) * 9, i + (j + 2) * 9]);
      }
    }
    // Диагональные линии (слева направо)
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        lines.push([i * 9 + j, (i + 1) * 9 + j + 1, (i + 2) * 9 + j + 2]);
      }
    }
    // Диагональные линии (справа налево)
    for (let i = 0; i < 7; i++) {
      for (let j = 2; j < 9; j++) {
        lines.push([i * 9 + j, (i + 1) * 9 + j - 1, (i + 2) * 9 + j - 2]);
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(81).fill(null));
    setXIsNext(true);
    setMoves([]);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.filter(square => square !== null).length >= 81) {
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
      <div className="board-9x9">
        {board.map((square, index) => (
          <button key={index} className="square-9x9" onClick={() => handleClick(index)} disabled={gameOver || square}>
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

export default NineByNineGame;