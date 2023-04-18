import "./App.css";
import { Player } from "./Player";
import { Cell } from "./Cell";
import { useState } from "react";

const P1 = new Player("Perry", "○");
const P2 = new Player("Mino", "x");

const isCellEmpty = function (cell) {
  if (cell.pieces.length === 0) {
    return true;
  } else {
    return false;
  }
};

const checkWin = function (updatedGameboard) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      !isCellEmpty(updatedGameboard[i][0]) &&
      updatedGameboard[i][0].pieces[0]?.character ===
        updatedGameboard[i][1].pieces[0]?.character &&
      updatedGameboard[i][1].pieces[0]?.character ===
        updatedGameboard[i][2].pieces[0]?.character
    ) {
      return [
        [i, 0],
        [i, 1],
        [i, 2],
      ];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      !isCellEmpty(updatedGameboard[0][j]) &&
      updatedGameboard[0][j].pieces[0]?.character ===
        updatedGameboard[1][j].pieces[0]?.character &&
      updatedGameboard[1][j].pieces[0]?.character ===
        updatedGameboard[2][j].pieces[0]?.character
    ) {
      return [
        [0, j],
        [1, j],
        [2, j],
      ];
    }
  }

  // Check diagonals
  if (
    !isCellEmpty(updatedGameboard[0][0]) &&
    updatedGameboard[0][0].pieces[0]?.character ===
      updatedGameboard[1][1].pieces[0]?.character &&
    updatedGameboard[1][1].pieces[0]?.character ===
      updatedGameboard[2][2].pieces[0]?.character
  ) {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  }

  if (
    !isCellEmpty(updatedGameboard[2][0]) &&
    updatedGameboard[2][0].pieces[0]?.character ===
      updatedGameboard[1][1].pieces[0]?.character &&
    updatedGameboard[1][1].pieces[0]?.character ===
      updatedGameboard[0][2].pieces[0]?.character
  ) {
    return [
      [2, 0],
      [1, 1],
      [0, 2],
    ];
  }

  return false;
};

const checkTie = function (updatedGameboard) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (isCellEmpty(updatedGameboard[i][j])) {
        return false;
      }
    }
  }
  return true;
};

function App() {
  const [gameboard, setGameboard] = useState([
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(P1);
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [player1Piece, setPlayer1Piece] = useState(P1.piece);
  const [player2Piece, setPlayer2Piece] = useState(P2.piece);
  const [selectedPieceAndPlayer, setSelectedPieceAndPlayer] = useState([]);
  const [winnerCells, setWinnerCells] = useState([]);

  const handlePieceSelect = function (index, player) {
    if (currentPlayer !== player) {
      return;
    }
    const currentSelectedPiece = index;
    setSelectedPieceAndPlayer([currentSelectedPiece, currentPlayer]);
    // console.log(currentSelectedPiece, currentPlayer);
  };

  const handleCellClick = function (cell, r, c) {
    if (selectedPieceAndPlayer[1] !== currentPlayer) {
      return;
    }

    if (!isCellEmpty(cell)) {
      return;
    }

    if (winnerPlayer) {
      return;
    }

    const updatedGameboard = [...gameboard];
    const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

    if (currentPlayer === P1) {
      updatedGameboard[r][c].pieces.unshift(
        player1Piece[selectedPieceAndPlayer[0]]
      );
      const updatePlayer1Piece = [...player1Piece];
      updatePlayer1Piece.splice(selectedPieceAndPlayer[0], 1);
      setPlayer1Piece(updatePlayer1Piece);
    } else {
      updatedGameboard[r][c].pieces.unshift(
        player2Piece[selectedPieceAndPlayer[0]]
      );
      const updatePlayer2Piece = [...player2Piece];
      updatePlayer2Piece.splice(selectedPieceAndPlayer[0], 1);
      setPlayer2Piece(updatePlayer2Piece);
    }

    setCurrentPlayer(updatedCurrentPlayer);
    setGameboard(updatedGameboard);
    setSelectedPieceAndPlayer([]);

    const winnerPos = checkWin(updatedGameboard);
    console.log(winnerPos);

    if (winnerPos) {
      setWinnerCells(winnerPos);
      setWinnerPlayer(currentPlayer.name);
    }
  };

  const isTie = checkTie(gameboard) && !winnerPlayer;

  return (
    <div className="App">
      <div id="game-content">
        <div id="player1-field">
          {player1Piece.map((piece, index) => {
            let classname = "piece";
            if (currentPlayer === P1 && selectedPieceAndPlayer[0] === index) {
              classname = classname + " selected";
            }
            // console.log(selectedPieceAndPlayer, piece, index);
            return (
              <div
                className={classname}
                onClick={() => handlePieceSelect(index, P1)}
              >
                {piece.character}
              </div>
            );
          })}
        </div>

        <div id="gameboard">
          {gameboard.map((row, r) => {
            return (
              <div className="row">
                {row.map((cell, c) => {
                  let classname = "cell";
                  console.log(winnerCells, r, c);

                  if (
                    winnerPlayer &&
                    ((winnerCells[0][0] === r && winnerCells[0][1] === c) ||
                      (winnerCells[1][0] === r && winnerCells[1][1] === c) ||
                      (winnerCells[2][0] === r && winnerCells[2][1] === c))
                  ) {
                    classname = classname + " win";
                  }

                  return (
                    <div
                      className={classname}
                      onClick={() => handleCellClick(cell, r, c)}
                    >
                      {cell.pieces[0]?.character}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="player2-field">
          {player2Piece.map((piece, index) => {
            let classname = "piece";
            if (currentPlayer === P2 && selectedPieceAndPlayer[0] === index) {
              classname = classname + " selected";
            }

            return (
              <div
                className={classname}
                onClick={() => handlePieceSelect(index, P2)}
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
