import Cell from "../Board/Cell";

// game strategy
export const isCellEmpty = function (cell: Cell) {
  if (cell.pieces.length === 0) {
    return true;
  } else {
    return false;
  }
};

// export const checkWin = function (updatedGameboard) {
//   // Check rows
//   for (let i = 0; i < 3; i++) {
//     if (
//       !isCellEmpty(updatedGameboard[i][0]) &&
//       updatedGameboard[i][0].pieces[0]?.character ===
//         updatedGameboard[i][1].pieces[0]?.character &&
//       updatedGameboard[i][1].pieces[0]?.character ===
//         updatedGameboard[i][2].pieces[0]?.character
//     ) {
//       return [[i, 0], [i, 1], [i, 2], updatedGameboard[i][0].pieces[0].player];
//     }
//   }

//   // Check columns
//   for (let j = 0; j < 3; j++) {
//     if (
//       !isCellEmpty(updatedGameboard[0][j]) &&
//       updatedGameboard[0][j].pieces[0]?.character ===
//         updatedGameboard[1][j].pieces[0]?.character &&
//       updatedGameboard[1][j].pieces[0]?.character ===
//         updatedGameboard[2][j].pieces[0]?.character
//     ) {
//       return [[0, j], [1, j], [2, j], updatedGameboard[0][j].pieces[0].player];
//     }
//   }

//   // Check diagonals
//   if (
//     !isCellEmpty(updatedGameboard[0][0]) &&
//     updatedGameboard[0][0].pieces[0]?.character ===
//       updatedGameboard[1][1].pieces[0]?.character &&
//     updatedGameboard[1][1].pieces[0]?.character ===
//       updatedGameboard[2][2].pieces[0]?.character
//   ) {
//     return [[0, 0], [1, 1], [2, 2], updatedGameboard[0][0].pieces[0].player];
//   }

//   if (
//     !isCellEmpty(updatedGameboard[2][0]) &&
//     updatedGameboard[2][0].pieces[0]?.character ===
//       updatedGameboard[1][1].pieces[0]?.character &&
//     updatedGameboard[1][1].pieces[0]?.character ===
//       updatedGameboard[0][2].pieces[0]?.character
//   ) {
//     return [[2, 0], [1, 1], [0, 2], updatedGameboard[2][0].pieces[0].player];
//   }

//   return false;
// };

// const handleCellClick = function (cell, r, c) {
//   // if the game is already finished --> noop
//   if (winnerPlayer) {
//     return;
//   }

//   // when nothing is selected for selectedPieceAndPlayer
//   // you clicked an empty cell? --> noop
//   // you clicked an cell with opponent char on top? --> noop

//   if (selectedPieceAndPlayer[0] === undefined && isCellEmpty(cell)) {
//     return;
//   } else if (
//     selectedPieceAndPlayer[0] === undefined &&
//     cell.pieces[0]?.player !== currentPlayer
//   ) {
//     return;
//   } else if (
//     selectedPieceAndPlayer[0] === undefined &&
//     cell.pieces[0]?.player === currentPlayer
//   ) {
//     // you clicked an cell with your character on top? --> select
//     const swapSelectedPieceIndex = cell.pieces[0].index;
//     const swapSelectedPieceSize = cell.pieces[0].size;
//     const pieceInfo = cell.pieces[0];
//     setSelectedPieceAndPlayer([
//       swapSelectedPieceIndex,
//       currentPlayer,
//       swapSelectedPieceSize,
//       //is the piece selected from board?
//       true,
//       [r, c],
//       pieceInfo
//     ]);
//     return;
//   }

//   // when a piece is already selected from hand pieces
//   if (!selectedPieceAndPlayer[3]) {
//     // when the cell is not empty and and the piece is equal or bigger --> noop

//     if (!isCellEmpty(cell)) {
//       if (selectedPieceAndPlayer[2] === "small") {
//         return;
//       }

//       if (selectedPieceAndPlayer[2] === "medium" && cell.pieces[0].size !== "small") {
//         return;
//       }
//       if (
//         selectedPieceAndPlayer[2] === "large" &&
//         cell.pieces[0].size !== "small" &&
//         cell.pieces[0].size !== "medium"
//       ) {
//         return;
//       }
//     }
//     // in other cases (if it's smaller or the cell is empty), play the piece

//     const updatedGameboard = [...gameboard];
//     const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

//     if (currentPlayer === P1) {
//       const pieceIndex = player1Piece.findIndex(
//         (piece) => piece.index === selectedPieceAndPlayer[0]
//       );
//       updatedGameboard[r][c].pieces.unshift(player1Piece[pieceIndex]);
//       const updatePlayer1Piece = [...player1Piece];
//       updatePlayer1Piece.splice(pieceIndex, 1);
//       setPlayer1Piece(updatePlayer1Piece);
//     } else {
//       const pieceIndex = player2Piece.findIndex(
//         (piece) => piece.index === selectedPieceAndPlayer[0]
//       );
//       updatedGameboard[r][c].pieces.unshift(player2Piece[pieceIndex]);
//       const updatePlayer2Piece = [...player2Piece];
//       updatePlayer2Piece.splice(pieceIndex, 1);
//       setPlayer2Piece(updatePlayer2Piece);
//     }

//     setCurrentPlayer(updatedCurrentPlayer);
//     setGameboard(updatedGameboard);
//     setSelectedPieceAndPlayer([]);

//     const winnerPos = checkWin(updatedGameboard);

//     if (winnerPos) {
//       setWinnerCells(winnerPos);
//       setWinnerPlayer(winnerPos[3].name);

//       if (winnerPos[3] === P1) {
//         const newScore = scoreKeep[0] + 1;
//         setScoreKeep([newScore, scoreKeep[1]]);
//         addConfetti(document.getElementById("score-board"));
//       } else {
//         const newScore = scoreKeep[1] + 1;
//         setScoreKeep([scoreKeep[0], newScore]);
//         addConfetti(document.getElementById("score-board"));
//       }

//       // setWinnerPlayer(currentPlayer.name);
//     }
//   } else if (selectedPieceAndPlayer[3]) {
//     // when a piece is already selected from the board
//     // when the cell is not empty and and the piece is equal or bigger --> noop

//     if (!isCellEmpty(cell)) {
//       if (selectedPieceAndPlayer[2] === "small") {
//         return;
//       }

//       if (selectedPieceAndPlayer[2] === "medium" && cell.pieces[0].size !== "small") {
//         return;
//       }
//       if (
//         selectedPieceAndPlayer[2] === "large" &&
//         cell.pieces[0].size !== "small" &&
//         cell.pieces[0].size !== "medium"
//       ) {
//         return;
//       }
//     }
//     // in other cases (if it's smaller or the cell is empty),
//     // first remove the piece from the original cell

//     const updatedGameboard = [...gameboard];
//     updatedGameboard[selectedPieceAndPlayer[4][0]][
//       selectedPieceAndPlayer[4][1]
//     ].pieces.shift();

//     //then, play the piece
//     const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

//     updatedGameboard[r][c].pieces.unshift(selectedPieceAndPlayer[5]);

//     setCurrentPlayer(updatedCurrentPlayer);
//     setGameboard(updatedGameboard);
//     setSelectedPieceAndPlayer([]);

//     const winnerPos = checkWin(updatedGameboard);

//     if (winnerPos) {
//       setWinnerCells(winnerPos);
//       setWinnerPlayer(winnerPos[3].name);
//       // setWinnerPlayer(currentPlayer.name);
//     }
//   }
// };

// const reMatch = function () {
//   setGameboard([
//     [new Cell(), new Cell(), new Cell()],
//     [new Cell(), new Cell(), new Cell()],
//     [new Cell(), new Cell(), new Cell()]
//   ]);
//   setCurrentPlayer(P1);
//   setWinnerPlayer();
//   setPlayer1Piece(P1.piece);
//   setPlayer2Piece(P2.piece);
//   setSelectedPieceAndPlayer([]);
//   setWinnerCells([]);

//   const parent = document.getElementById("score-board");
//   const childToRemove = document.getElementById("confetti-container");
//   if (childToRemove) {
//     parent.removeChild(childToRemove);
//   }
// };
