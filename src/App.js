import React, { useState } from 'react';
import './App.css';
import TicTacToeGame from './TicTacToeGame';
import NineByNineGame from './NineByNineGame';
import GameSelector from './GameSelector';

const App = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
  };

  return (
    <div className="App">
      {!selectedGame ? (
        <GameSelector onSelectGame={handleSelectGame} />
      ) : selectedGame === '3x3' ? (
        <div>
          <h2 className="game-title">3x3 Game</h2>
          <TicTacToeGame onBack={handleBackToMenu} />
        </div>
      ) : (
        <div>
          <h2 className="game-title">9x9 Game</h2>
          <NineByNineGame onBack={handleBackToMenu} />
        </div>
      )}
    </div>
  );
};

export default App;