import Cell from "../Board/Cell";
import Player from "../Player/Player";
import { SelectedPieceAndPlayer } from "../Player/PlayerField";

export const isCellEmpty = function (cell: Cell) {
  if (cell.pieces.length === 0) {
    return true;
  } else {
    return false;
  }
};
export const checkWin = function (updatedGameboard: Cell[][]) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      !isCellEmpty(updatedGameboard[i][0]) &&
      updatedGameboard[i][0].pieces[0]?.character ===
        updatedGameboard[i][1].pieces[0]?.character &&
      updatedGameboard[i][1].pieces[0]?.character ===
        updatedGameboard[i][2].pieces[0]?.character
    ) {
      return {
        winnerPos: [
          [i, 0],
          [i, 1],
          [i, 2]
        ],
        winner: updatedGameboard[i][0].pieces[0].player
      };
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
      return {
        winnerPos: [
          [0, j],
          [1, j],
          [2, j]
        ],
        winner: updatedGameboard[0][j].pieces[0].player
      };
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
    return {
      winnerPos: [
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      winner: updatedGameboard[0][0].pieces[0].player
    };
  }

  if (
    !isCellEmpty(updatedGameboard[2][0]) &&
    updatedGameboard[2][0].pieces[0]?.character ===
      updatedGameboard[1][1].pieces[0]?.character &&
    updatedGameboard[1][1].pieces[0]?.character ===
      updatedGameboard[0][2].pieces[0]?.character
  ) {
    return {
      winnerPos: [
        [2, 0],
        [1, 1],
        [0, 2]
      ],
      winner: updatedGameboard[2][0].pieces[0].player
    };
  }

  return false;
};

export const handleCellClick = function (
  P1: Player,
  P2: Player,
  gameboard: Cell[][],
  selectedPieceAndPlayer: SelectedPieceAndPlayer,
  currentPlayer: Player,
  cell: Cell,
  r: number,
  c: number,
  onSelectPP: (selectPP: SelectedPieceAndPlayer) => void,
  onPlayPiece: (
    updatedCurrentPlayer: Player,
    updatedGameboard: Cell[][],
    selectedPieceAndPlayer: SelectedPieceAndPlayer
  ) => void,
  winnerPlayer?: Player
) {
  // if the game is already finished --> noop
  if (winnerPlayer) return;

  // when nothing is selected for selectedPieceAndPlayer
  // you clicked an empty cell? --> noop
  // you clicked an cell with opponent char on top? --> noop

  if (!selectedPieceAndPlayer.index) {
    if (isCellEmpty(cell) || cell.pieces[0]?.player !== currentPlayer) {
      return;
    } else if (cell.pieces[0]?.player === currentPlayer) {
      // you clicked an cell with your character on top? --> select
      const swapSelectedPieceIndex = cell.pieces[0].index;
      const swapSelectedPieceSize = cell.pieces[0].size;
      const pieceInfo = cell.pieces[0];
      onSelectPP({
        index: swapSelectedPieceIndex,
        currentPlayer: currentPlayer,
        pieceSize: swapSelectedPieceSize,
        isSelectedFromBoard: true,
        positionOnBoard: [r, c],
        pieceInfo: pieceInfo
      });
      return;
    }
  }

  // when a piece is already selected from hand pieces
  if (!selectedPieceAndPlayer.isSelectedFromBoard) {
    // when the cell is not empty and and the piece is equal or bigger --> noop
    if (!isCellEmpty(cell)) {
      if (selectedPieceAndPlayer.pieceSize === "small") return;
      if (
        selectedPieceAndPlayer.pieceSize === "medium" &&
        cell.pieces[0].size !== "small"
      ) {
        return;
      }
      if (
        selectedPieceAndPlayer.pieceSize === "large" &&
        cell.pieces[0].size !== "small" &&
        cell.pieces[0].size !== "medium"
      ) {
        return;
      }
    }
    // in other cases (if it's smaller or the cell is empty), play the piece

    const updatedGameboard = [...gameboard];
    const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

    const pieceIndex = currentPlayer.piece.findIndex(
      (piece) => piece.index === selectedPieceAndPlayer.index
    );
    updatedGameboard[r][c].pieces.unshift(currentPlayer.piece[pieceIndex]);
    const updatePlayerPiece = [...currentPlayer.piece];
    updatePlayerPiece.splice(pieceIndex, 1);
    currentPlayer.piece = updatePlayerPiece;
    // TODO: あってる？？
    //元々setPlayer2Piece(updatePlayer2Piece);のように管理していた
    onPlayPiece(updatedCurrentPlayer, updatedGameboard, {});

    const winnerPos = checkWin(updatedGameboard);

    if (winnerPos) {
      console.log("win");
      // setWinnerCells(winnerPos);
      // setWinnerPlayer(winnerPos.winner.name);

      // if (winnerPos.winner === P1) {
      //   const newScore = scoreKeep[0] + 1;
      //   setScoreKeep([newScore, scoreKeep[1]]);
      //   addConfetti(document.getElementById("score-board"));
      // } else {
      //   const newScore = scoreKeep[1] + 1;
      //   setScoreKeep([scoreKeep[0], newScore]);
      //   addConfetti(document.getElementById("score-board"));
      // }

      // setWinnerPlayer(currentPlayer.name);
    }
  } else if (selectedPieceAndPlayer.isSelectedFromBoard) {
    // when a piece is already selected from the board
    // when the cell is not empty and and the piece is equal or bigger --> noop

    if (!isCellEmpty(cell)) {
      if (selectedPieceAndPlayer.pieceSize === "small") {
        return;
      }

      if (
        selectedPieceAndPlayer.pieceSize === "medium" &&
        cell.pieces[0].size !== "small"
      ) {
        return;
      }
      if (
        selectedPieceAndPlayer.pieceSize === "large" &&
        cell.pieces[0].size !== "small" &&
        cell.pieces[0].size !== "medium"
      ) {
        return;
      }
    }
    // in other cases (if it's smaller or the cell is empty),
    // first remove the piece from the original cell

    const updatedGameboard = [...gameboard];
    updatedGameboard[selectedPieceAndPlayer.positionOnBoard[0]][
      selectedPieceAndPlayer.positionOnBoard[1]
    ].pieces.shift();

    //then, play the piece
    const updatedCurrentPlayer = currentPlayer === P1 ? P2 : P1;

    updatedGameboard[r][c].pieces.unshift(selectedPieceAndPlayer.pieceInfo);

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
