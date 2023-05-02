import "./App.css";
import { Player } from "./Player";
import { Cell } from "./Cell";
import { useState } from "react";
import platypus from "./vector-platypus.png";
import monkey from "./vector-monkey.png";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const P1 = new Player("Perry", platypus);
const P2 = new Player("Mino", monkey);

// game strategy
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
      return [[i, 0], [i, 1], [i, 2], updatedGameboard[i][0].pieces[0].player];
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
      return [[0, j], [1, j], [2, j], updatedGameboard[0][j].pieces[0].player];
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
    return [[0, 0], [1, 1], [2, 2], updatedGameboard[0][0].pieces[0].player];
  }

  if (
    !isCellEmpty(updatedGameboard[2][0]) &&
    updatedGameboard[2][0].pieces[0]?.character ===
      updatedGameboard[1][1].pieces[0]?.character &&
    updatedGameboard[1][1].pieces[0]?.character ===
      updatedGameboard[0][2].pieces[0]?.character
  ) {
    return [[2, 0], [1, 1], [0, 2], updatedGameboard[2][0].pieces[0].player];
  }

  return false;
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
  const [scoreKeep, setScoreKeep] = useState([0, 0]);
  const [openRule, setOpenRule] = useState(false);
  const [openEditPlayerName, setOpenEditPlayerName] = useState(false);

  const handleClickOpenRule = () => {
    setOpenRule(true);
  };

  const handleCloseRule = () => {
    setOpenRule(false);
  };

  const handleClickOpenEditPlayerName = () => {
    setOpenEditPlayerName(true);
  };

  const handleCloseEditPlayerName = () => {
    setOpenEditPlayerName(false);
  };

  const reMatch = function () {
    setGameboard([
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell()],
    ]);
    setCurrentPlayer(P1);
    setWinnerPlayer();
    setPlayer1Piece(P1.piece);
    setPlayer2Piece(P2.piece);
    setSelectedPieceAndPlayer([]);
    setWinnerCells([]);
  };

  const deleteMatchRecord = function () {
    reMatch();
    setScoreKeep([0, 0]);
  };

  const canChangePlayerTurn = function () {
    const updatedGameboard = [...gameboard];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (isCellEmpty(updatedGameboard[i][j])) {
        } else {
          console.log(isCellEmpty(updatedGameboard[i][j]));
          if (!winnerPlayer) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const changePlayerTurn = function () {
    if (!canChangePlayerTurn()) {
      return;
    }

    reMatch();
    if (currentPlayer === P1) {
      setCurrentPlayer(P2);
    } else {
      setCurrentPlayer(P1);
    }
  };
  const handlePieceSelect = function (index, player) {
    // if it's not your turn, return
    if (currentPlayer !== player) {
      return;
    }

    // if the game is finished, return
    if (winnerPlayer) {
      return;
    }

    // if it's in the middle of piece swap, return
    if (selectedPieceAndPlayer[3]) {
      return;
    }

    let currentPlayerPiece;
    if (currentPlayer === P1) {
      currentPlayerPiece = [...player1Piece];
    } else {
      currentPlayerPiece = [...player2Piece];
    }

    const currentSelectedPieceIndex = currentPlayerPiece.findIndex(
      (piece) => piece.index === index
    );

    const currentSelectedPieceSize =
      currentPlayerPiece[currentSelectedPieceIndex].size;

    if (
      index === selectedPieceAndPlayer[0] &&
      currentSelectedPieceSize === selectedPieceAndPlayer[2]
    ) {
      setSelectedPieceAndPlayer([]);
    } else {
      setSelectedPieceAndPlayer([
        index,
        currentPlayer,
        currentSelectedPieceSize,
        //is the piece selected from board?
        false,
      ]);
    }
  };

  const handleCellClick = function (cell, r, c) {
    // if the game is already finished --> noop
    if (winnerPlayer) {
      return;
    }

    // when nothing is selected for selectedPieceAndPlayer
    // you clicked an empty cell? --> noop
    // you clicked an cell with opponent char on top? --> noop

    if (selectedPieceAndPlayer[0] === undefined && isCellEmpty(cell)) {
      return;
    } else if (
      selectedPieceAndPlayer[0] === undefined &&
      cell.pieces[0]?.player !== currentPlayer
    ) {
      return;
    } else if (
      selectedPieceAndPlayer[0] === undefined &&
      cell.pieces[0]?.player === currentPlayer
    ) {
      // you clicked an cell with your character on top? --> select
      const swapSelectedPieceIndex = cell.pieces[0].index;
      const swapSelectedPieceSize = cell.pieces[0].size;
      const pieceInfo = cell.pieces[0];
      setSelectedPieceAndPlayer([
        swapSelectedPieceIndex,
        currentPlayer,
        swapSelectedPieceSize,
        //is the piece selected from board?
        true,
        [r, c],
        pieceInfo,
      ]);
      return;
    }

    // when a piece is already selected from hand pieces
    if (!selectedPieceAndPlayer[3]) {
      // when the cell is not empty and and the piece is equal or bigger --> noop

      if (!isCellEmpty(cell)) {
        if (selectedPieceAndPlayer[2] === "S") {
          return;
        }

        if (selectedPieceAndPlayer[2] === "M" && cell.pieces[0].size !== "S") {
          return;
        }
        if (
          selectedPieceAndPlayer[2] === "L" &&
          cell.pieces[0].size !== "S" &&
          cell.pieces[0].size !== "M"
        ) {
          return;
        }
      }
      // in other cases (if it's smaller or the cell is empty), play the piece

      const updatedGameboard = [...gameboard];
      const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

      if (currentPlayer === P1) {
        const pieceIndex = player1Piece.findIndex(
          (piece) => piece.index === selectedPieceAndPlayer[0]
        );
        updatedGameboard[r][c].pieces.unshift(player1Piece[pieceIndex]);
        const updatePlayer1Piece = [...player1Piece];
        updatePlayer1Piece.splice(pieceIndex, 1);
        setPlayer1Piece(updatePlayer1Piece);
      } else {
        const pieceIndex = player2Piece.findIndex(
          (piece) => piece.index === selectedPieceAndPlayer[0]
        );
        updatedGameboard[r][c].pieces.unshift(player2Piece[pieceIndex]);
        const updatePlayer2Piece = [...player2Piece];
        updatePlayer2Piece.splice(pieceIndex, 1);
        setPlayer2Piece(updatePlayer2Piece);
      }

      setCurrentPlayer(updatedCurrentPlayer);
      setGameboard(updatedGameboard);
      setSelectedPieceAndPlayer([]);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        setWinnerCells(winnerPos);
        setWinnerPlayer(winnerPos[3].name);

        if (winnerPos[3] === P1) {
          const newScore = scoreKeep[0] + 1;
          setScoreKeep([newScore, scoreKeep[1]]);
        } else {
          const newScore = scoreKeep[1] + 1;
          setScoreKeep([scoreKeep[0], newScore]);
        }

        // setWinnerPlayer(currentPlayer.name);
      }
    } else if (selectedPieceAndPlayer[3]) {
      // when a piece is already selected from the board
      // when the cell is not empty and and the piece is equal or bigger --> noop

      if (!isCellEmpty(cell)) {
        if (selectedPieceAndPlayer[2] === "S") {
          return;
        }

        if (selectedPieceAndPlayer[2] === "M" && cell.pieces[0].size !== "S") {
          return;
        }
        if (
          selectedPieceAndPlayer[2] === "L" &&
          cell.pieces[0].size !== "S" &&
          cell.pieces[0].size !== "M"
        ) {
          return;
        }
      }
      // in other cases (if it's smaller or the cell is empty),
      // first remove the piece from the original cell

      const updatedGameboard = [...gameboard];
      updatedGameboard[selectedPieceAndPlayer[4][0]][
        selectedPieceAndPlayer[4][1]
      ].pieces.shift();

      //then, play the piece
      const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

      updatedGameboard[r][c].pieces.unshift(selectedPieceAndPlayer[5]);

      setCurrentPlayer(updatedCurrentPlayer);
      setGameboard(updatedGameboard);
      setSelectedPieceAndPlayer([]);

      const winnerPos = checkWin(updatedGameboard);

      if (winnerPos) {
        setWinnerCells(winnerPos);
        setWinnerPlayer(winnerPos[3].name);
        // setWinnerPlayer(currentPlayer.name);
      }
    }
  };

  return (
    <div className="App">
      <div id="game-content">
        <div id="player1-field">
          <div class="name">{P1.name}</div>
          <div class="score">{scoreKeep[0]}</div>
          <div id="player1-fieldーpieces">
            {player1Piece.map((piece) => {
              let classname = "piece";
              if (
                currentPlayer === P1 &&
                selectedPieceAndPlayer[0] === piece.index
              ) {
                classname = classname + " selected";
              }
              if (piece.size === "S") {
                classname = classname + " small";
              }
              if (piece.size === "M") {
                classname = classname + " medium";
              }
              if (piece.size === "L") {
                classname = classname + " large";
              }
              return (
                <div
                  className={classname}
                  onClick={() => handlePieceSelect(piece.index, P1)}
                >
                  {" "}
                  <img src={platypus} alt="platypus"></img>
                </div>
              );
            })}
          </div>
        </div>

        <div id="center-content">
          <div id="score-board">
            {winnerPlayer ? (
              <div id="message">
                {winnerPlayer} wins!{" "}
                <button id="reMatch-btn" onClick={reMatch}>
                  Re-match?
                </button>
              </div>
            ) : (
              <div>It's {currentPlayer.name}'s turn</div>
            )}
          </div>

          <div id="gameboard">
            {gameboard.map((row, r) => {
              return (
                <div className="row">
                  {row.map((cell, c) => {
                    let classname = "cell";
                    // if a piece is selected from the board, highlight it
                    if (selectedPieceAndPlayer[4] !== undefined) {
                      if (
                        selectedPieceAndPlayer[4][0] === r &&
                        selectedPieceAndPlayer[4][1] === c
                      ) {
                        classname = classname + " selected-cell";
                      }
                    }

                    if (
                      winnerPlayer &&
                      ((winnerCells[0][0] === r && winnerCells[0][1] === c) ||
                        (winnerCells[1][0] === r && winnerCells[1][1] === c) ||
                        (winnerCells[2][0] === r && winnerCells[2][1] === c))
                    ) {
                      classname = classname + " win";
                    }

                    if (cell.pieces[0]) {
                      if (cell.pieces[0].size === "S") {
                        classname = classname + " small";
                      }
                      if (cell.pieces[0].size === "M") {
                        classname = classname + " medium";
                      }
                      if (cell.pieces[0].size === "L") {
                        classname = classname + " large";
                      }
                    }
                    return (
                      <div
                        className={classname}
                        onClick={() => handleCellClick(cell, r, c)}
                      >
                        {cell.pieces[0] && (
                          <img src={cell.pieces[0].character} alt="piece"></img>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div id="option-menu">
            <div>
              <Tooltip title="How to Play" placement="top">
                <IconButton onClick={handleClickOpenRule}>
                  <HelpOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Dialog
                open={openRule}
                onClose={handleCloseRule}
                aria-labelledby="How to Play the Platypus vs Monkey Game"
                aria-describedby="It's a very fun game!"
              >
                <DialogTitle id="how-to-play-dialog-title">
                  {"⭐️How to Play⭐️"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="how-to-play-dialog-description">
                    1. The game starts with an empty 3x3 grid. <br />
                    2. Player has 6 Platypuses or 6 Monkeys. There are 2 small
                    pieces, 2 medium pieces, and 2 large pieces for each player.{" "}
                    <br />
                    3. Player place one of their pieces to the gameboard cell in
                    turn. <br />
                    4. Just like the Tic Tac Toe, the game ends when one player
                    lines up three cells in a row with their character, either
                    horizontally, vertically or diagonally. <br />
                    5. The big difference from Tic Tac Toe is that the player
                    can either put their piece from their hand OR move the piece
                    which is already on the gameboard. <br />
                    6. Even if there is already another piece on the cell,
                    regardless of whether it belongs to you or your opponent, if
                    the piece is smaller, you can place your piece over it.{" "}
                    <br />
                    7. Player cannot move the piece if it's underneath of
                    another bigger piece. <br />
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <IconButton onClick={handleCloseRule}>Close</IconButton>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <Tooltip title="Change Player Name" placement="top">
                <IconButton onClick={handleClickOpenEditPlayerName}>
                  <ModeEditOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Dialog
                open={openEditPlayerName}
                onClose={handleCloseEditPlayerName}
              >
                <DialogTitle>Edit Player Name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please input player's name.
                  </DialogContentText>
                  <div className="player1-name-edit">
                    <img id="icon-platypus" src={platypus} alt="platypus"></img>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="p1-name"
                      label="Player1 Name"
                      defaultValue="Perry"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </div>
                  <div className="player2-name-edit">
                    <img id="icon-monkey" src={monkey} alt="monkey"></img>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="p2-name"
                      label="Player2 Name"
                      defaultValue="Mino"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <IconButton onClick={handleCloseEditPlayerName}>
                    Cancel
                  </IconButton>
                  <IconButton onClick={handleCloseEditPlayerName}>
                    Save
                  </IconButton>
                </DialogActions>
              </Dialog>
            </div>
            <div>
              <Tooltip title="Change Player Turn" placement="top">
                <IconButton onClick={changePlayerTurn} disabled={!canChangePlayerTurn()}>
                  <ChangeCircleOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>

            <div>
              <Tooltip title="Delete Match Record" placement="top">
                <IconButton onClick={deleteMatchRecord}>
                  <DeleteOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
        <div id="player2-field">
          <div class="name">{P2.name}</div>
          <div class="score">{scoreKeep[1]}</div>
          <div id="player2-fieldーpieces">
            {player2Piece.map((piece) => {
              let classname = "piece";
              if (
                currentPlayer === P2 &&
                selectedPieceAndPlayer[0] === piece.index
              ) {
                classname = classname + " selected";
              }
              if (piece.size === "S") {
                classname = classname + " small";
              }
              if (piece.size === "M") {
                classname = classname + " medium";
              }
              if (piece.size === "L") {
                classname = classname + " large";
              }
              return (
                <div
                  className={classname}
                  onClick={() => handlePieceSelect(piece.index, P2)}
                >
                  <img src={monkey} alt="monkey"></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
