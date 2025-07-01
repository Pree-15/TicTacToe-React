import React, { useState } from "react";
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(""); // 'won', 'lost', 'draw'

  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "X" : "O";
    setData(newData);
    setCount(prev => prev + 1);
    checkWin(newData);
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setResult("");
  };

  const getIcon = (val) => {
    if (val === "X") return <img src={cross_icon} alt="X" />;
    if (val === "O") return <img src={circle_icon} alt="O" />;
    return null;
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        if (board[a] === "X") {
          setResult("won");
        } else {
          setResult("lost");
        }
        setLock(true);
        return;
      }
    }

    // Check for draw
    if (board.every(cell => cell !== "")) {
      setResult("draw");
      setLock(true);
    }
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>

      {/* Result Message */}
      {result && (
        <div className="result-message">
          {result === "won" && <h2 className="winner">Congrats You Won!</h2>}
          {result === "lost" && <h2 className="loser"> You Lost!</h2>}
         
        </div>
      )}

      {/* Board */}
      <div className="board">
        {[0, 3, 6].map((rowStart) => (
          <div className="row" key={rowStart}>
            {data.slice(rowStart, rowStart + 3).map((val, idx) => (
              <div
                key={rowStart + idx}
                className="boxes"
                onClick={() => toggle(rowStart + idx)}
              >
                {getIcon(val)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
