import React, { useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X"); // Start with Player X
  const [winner, setWinner] = useState("");
  const [lock, setLock] = useState(false);

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setLock(true);
        if (board[a] === "X") setWinner("You Won!");
        else setWinner("You Lost!");
        return;
      }
    }

    // Check for draw
    if (board.every(cell => cell !== "")) {
      setWinner("It's a Draw!");
      setLock(true);
    }
  };

  const handleClick = (index) => {
    if (data[index] !== "" || lock) return;

    const newData = [...data];
    newData[index] = turn;
    setData(newData);
    checkWinner(newData);
    setTurn(turn === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setTurn("X");
    setWinner("");
    setLock(false);
  };

  const getIcon = (val) => {
    if (val === "X") return <img src={cross_icon} alt="X" />;
    if (val === "O") return <img src={circle_icon} alt="O" />;
    return null;
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>

      {winner && (
        <div className="result-message">
          <h2>{winner}</h2>
        </div>
      )}

      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="row" key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => handleClick(index)}
                >
                  {getIcon(data[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
