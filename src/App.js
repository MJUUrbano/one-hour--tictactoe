import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [player, setPlayer] = useState(1);
  const emptyBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [board, setBoard] = useState(emptyBoard);
  const [winner, setWinner] = useState(0);

  const checkBoard = () => {
    let isDraw = 1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          isDraw = 0;
          continue;
        }
      }
    }

    if (isDraw) return setBoard(emptyBoard);

    for (let i = 0; i < 3; i++) {
      console.log(board[i][0], board[i][1], board[i][2]);
      //row checks
      if (
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][0]
      ) {
        setWinner(player);
      }
      //col checks
      if (
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[0][i]
      ) {
        setWinner(player);
      }
    }
    //left diagonal check
    if (
      board[0][0] == board[1][1] &&
      board[1][1] == board[2][2] &&
      board[0][0]
    ) {
      setBoard(emptyBoard);
      setWinner(player);
    }

    //right diagonal check
    if (
      board[0][2] == board[1][1] &&
      board[1][1] == board[2][0] &&
      board[0][2]
    ) {
      setBoard(emptyBoard);
      setWinner(player);
    }
  };

  const handleOnClick = (e) => {
    if (winner) return;

    const row = e.target.getAttribute("row");
    const col = e.target.getAttribute("col");

    let tempBoard = board;
    if (!tempBoard[row][col]) {
      tempBoard[row][col] = player;
    }
    setPlayer((prevPlayer) => {
      if (prevPlayer == 1) return 2;
      return 1;
    });
    setBoard(tempBoard);
    checkBoard();
  };

  const handleReset = () => {
    setBoard(emptyBoard);
    setWinner(0);
    setPlayer((prevPlayer) => {
      if (prevPlayer == 1) return 2;
      return 1;
    });
  };

  return (
    <div className="App">
      <h1>
        Player {player} Turn ({player == 1 ? "X" : "O"})
      </h1>
      <div className="Sudoku">
        {board.map((row, rowIndex) => {
          return row.map((col, colIndex) => {
            return (
              <div
                className="Tile"
                key={Math.random()}
                row={rowIndex}
                col={colIndex}
                onClick={handleOnClick}
              >
                {board[rowIndex][colIndex] == 0
                  ? ""
                  : board[rowIndex][colIndex] == 1
                  ? "X"
                  : "O"}
              </div>
            );
          });
        })}
      </div>
      {winner ? (
        <>
          <h2>Player {player} won!</h2>{" "}
          <button onClick={handleReset}>
            <h2>RESTART</h2>
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
