import React, { useEffect, useState } from "react";
import "./GamePlayScreen.css";

function GamePlayScreen({setCount, count, name}) {
  const [coins, setCoins] = useState(21);
  const [playerTurn, setPlayerTurn] = useState(true);

  const handlePlayerTurn = (amount) => {
    setCoins(coins - amount);
    setPlayerTurn(false);
  };

  const handleAITurn = () => {
    const aiAmount = (coins - 1) % 5;
    const amount = aiAmount === 0 ? 1 : aiAmount;
    setCoins(coins - amount);
    setPlayerTurn(true);
  };

  const handleRestart = () => {
    setCoins(21);
    setPlayerTurn(true);
    setCount(count+1);
    localStorage.setItem("userName", JSON.stringify({name, played : count+1}));
  };

  const renderCoins = () => {
    const result = [];
    for (let i = 0; i < coins; i++) {
      result.push(<div key={i} className="coin" />);
    }
    return result;
  };


  return (
    <div className="game-container">
      <h3>Number of times played: {count}</h3>
      <h1>Coins Remaining: {coins}</h1>
      <div className="coin-container">{renderCoins()}</div>
      {coins > 1 ? (
        playerTurn ? (
          <div>
            <button className="btn" onClick={() => handlePlayerTurn(1)}>
              Take 1
            </button>
            <button className="btn" onClick={() => handlePlayerTurn(2)}>
              Take 2
            </button>
            <button className="btn" onClick={() => handlePlayerTurn(3)}>
              Take 3
            </button>
            <button className="btn" onClick={() => handlePlayerTurn(4)}>
              Take 4
            </button>
          </div>
        ) : (
          <div>
            <h2>AI is thinking...</h2>
            {setTimeout(() => {
              handleAITurn();
            }, 1000)}
          </div>
        )
      ) : (
        <div>
          <h2 className="result">{playerTurn ? "AI" : "Player"} wins!</h2>
          <button className="btn" onClick={() => handleRestart()}>Play again</button>
          
        </div>
      )}
    </div>
  );
}

export default GamePlayScreen;