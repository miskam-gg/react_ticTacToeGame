import React from 'react';
import './App.css';

const GameSelector = ({ onSelectGame }) => {
  return (
    <div className="game-selector">
      <h1 className="game-title">Select a Game</h1>
      <button onClick={() => onSelectGame('3x3')} className="pixel-button">Play 3x3</button>
      <button onClick={() => onSelectGame('9x9')} className="pixel-button">Play 9x9</button>
    </div>
  );
};

export default GameSelector;