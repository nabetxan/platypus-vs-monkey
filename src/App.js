import "./App.css";
import { Player } from "./Player";
import { useState } from "react";

const EMPTY = "";
const P1 = new Player("Perry", "○");
const P2 = new Player("Minochan", "x");
console.log(P1, P1.name, P1.piece);

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
  const [currentPlayer, setCurrentPlayer] = useState(P1.name);
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [player1Piece, setPlayer1Piece] = useState(P1.piece);
  const [player2Piece, setPlayer2Piece] = useState(P2.piece);
  // const [player1Piece, setPlayer1Piece] = useState([P1, P1, P1, P1, P1, P1]);
  // const [player2Piece, setPlayer2Piece] = useState([P2, P2, P2, P2, P2, P2]);
  const [selectedPieceAndPlayer, setSelectedPieceAndPlayer] = useState([]);

  const handlePieceSelect = function (index, player) {
    if (currentPlayer !== player) {
      return;
    }
    const currentSelectedPiece = index;
    setSelectedPieceAndPlayer([currentSelectedPiece, currentPlayer]);

    console.log(currentSelectedPiece, currentPlayer);
  };

  const handleCellClick = function (cell, r, c) {
    if (selectedPieceAndPlayer[1] !== currentPlayer) {
      return;
    }

    if (cell !== EMPTY) {
      return;
    }

    if (winnerPlayer) {
      return;
    }

    const updatedGameboard = [...gameboard];
    const updatedCurrentPlayer = currentPlayer === P1.name ? P2.name : P1.name;

    if (currentPlayer === P1.name) {
      updatedGameboard[r][c] =
        player1Piece[selectedPieceAndPlayer[0]].character;
      const updatePlayer1Piece = [...player1Piece];
      updatePlayer1Piece.splice(selectedPieceAndPlayer[0], 1);
      setPlayer1Piece(updatePlayer1Piece);
    } else {
      updatedGameboard[r][c] =
        player2Piece[selectedPieceAndPlayer[0]].character;
      const updatePlayer2Piece = [...player2Piece];
      updatePlayer2Piece.splice(selectedPieceAndPlayer[0], 1);
      setPlayer2Piece(updatePlayer2Piece);
    }

    setCurrentPlayer(updatedCurrentPlayer);
    setGameboard(updatedGameboard);
    if (checkWin(updatedGameboard)) {
      setWinnerPlayer(currentPlayer);
    }

    console.log(player1Piece, player2Piece);
  };

  const isTie = checkTie(gameboard) && !winnerPlayer;

  return (
    <div className="App">
      <div id="game-content">
        <div id="player1-field">
          {player1Piece.map((piece, index) => {
            return (
              <div
                className="piece"
                onClick={() => handlePieceSelect(index, P1.name)}
              >
                {piece.character}
              </div>
            );
          })}
        </div>

        <div id="gameboard">
          {gameboard.map((row, r) => {
            // console.log(row, r);
            return (
              <div className="row">
                {row.map((cell, c) => {
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
          {player2Piece.map((piece, index) => {
            return (
              <div
                className="piece"
                onClick={() => handlePieceSelect(index, P2.name)}
              >
                {piece.character}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {winnerPlayer ? <div id="message">{winnerPlayer} wins!</div> : null}
        {isTie ? <div id="message">Its a tie!</div> : null}
      </div>
    </div>
  );
}

export default App;
