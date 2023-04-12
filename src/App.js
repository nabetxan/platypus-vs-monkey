import "./App.css";
import { useState } from "react";

const EMPTY = "";
const MARU = "○";
const BATSU = "×";
const P1 = "P1";
const P2 = "P2";

const checkWin = function (updatedGameboard) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      updatedGameboard[i][0] !== EMPTY &&
      updatedGameboard[i][0] === updatedGameboard[i][1] &&
      updatedGameboard[i][1] === updatedGameboard[i][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      updatedGameboard[0][j] !== EMPTY &&
      updatedGameboard[0][j] === updatedGameboard[1][j] &&
      updatedGameboard[1][j] === updatedGameboard[2][j]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    updatedGameboard[0][0] !== EMPTY &&
    updatedGameboard[0][0] === updatedGameboard[1][1] &&
    updatedGameboard[1][1] === updatedGameboard[2][2]
  ) {
    return true;
  }

  if (
    updatedGameboard[2][0] !== EMPTY &&
    updatedGameboard[2][0] === updatedGameboard[1][1] &&
    updatedGameboard[1][1] === updatedGameboard[0][2]
  ) {
    return true;
  }

  return false;
};

const checkTie = function (updatedGameboard) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (updatedGameboard[i][j] === EMPTY) {
        return false;
      }
    }
  }
  return true;
};

function App() {
  const [gameboard, setGameboard] = useState([
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(MARU);
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [player1Piece, setPlayer1Piece] = useState([P1, P1, P1, P1, P1, P1]);
  const [player2Piece, setPlayer2Piece] = useState([P2, P2, P2, P2, P2, P2]);

  const handleCellClick = function (cell, r, c) {
    if (cell !== EMPTY) {
      return;
    }

    if (winnerPlayer) {
      return;
    }

    const updatedGameboard = [...gameboard];
    const updatedCurrentPlayer = currentPlayer === MARU ? BATSU : MARU;
    updatedGameboard[r][c] = currentPlayer;

    setCurrentPlayer(updatedCurrentPlayer);
    setGameboard(updatedGameboard);
    if (checkWin(updatedGameboard)) {
      setWinnerPlayer(currentPlayer);
    }
  };

  const isTie = checkTie(gameboard) && !winnerPlayer;

  return (
    <div className="App">
      <div id="player1-field">
        {player1Piece.map((piece) => {
          return <div className="piece">{piece}</div>;
        })}
      </div>

      <div id="gameboard">
        {gameboard.map((row, r) => {
          console.log(row, r);
          return (
            <div className="row">
              {row.map((cell, c) => {
                // console.log(cell, c)
                return (
                  <div
                    className="cell"
                    onClick={() => handleCellClick(cell, r, c)}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div id="player2-field">
        {player2Piece.map((piece) => {
          return <div className="piece">{piece}</div>;
        })}
      </div>
      {winnerPlayer ? <div id="message">{winnerPlayer} wins!</div> : null}
      {isTie ? <div id="message">Its a tie!</div> : null}
    </div>
  );
}

export default App;
