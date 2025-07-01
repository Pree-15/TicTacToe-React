import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [lock, setLock] = useState(false);
  const [message, setMessage] = useState("");

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

  const checkWinner = (updatedBoard) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        setLock(true);
        if (updatedBoard[a] === "X") setMessage("🎉 You Won!");
        else setMessage("😞 You Lost!");
        return;
      }
    }

    if (updatedBoard.every(cell => cell !== "")) {
      setMessage("🤝 It's a Draw!");
      setLock(true);
    }
  };

  const handleBoxClick = (index) => {
    if (board[index] !== "" || lock) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    checkWinner(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setLock(false);
    setMessage("");
  };

  const renderIcon = (val) => {
    if (val === "X") return <img src={cross_icon} alt="X" />;
    if (val === "O") return <img src={circle_icon} alt="O" />;
    return null;
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
      {message && <h2 className="result">{message}</h2>}

      <div className="board">
        {board.map((val, index) => (
          <div key={index} className="box" onClick={() => handleBoxClick(index)}>
            {renderIcon(val)}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
