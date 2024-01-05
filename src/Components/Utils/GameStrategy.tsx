import Cell, { Gameboard } from "../Board/Cell";
import Player from "../Player/Player";
import { SelectedPieceAndPlayer } from "../Player/PlayerField";

export type GameStatus = {
  P1: Player;
  P2: Player;
  isP1CurrentPlayer: boolean;
  selectedPnP?: SelectedPieceAndPlayer;
  winner?: Player;
};

export const isCellEmpty = function (cell: Cell) {
  return cell.pieces.length === 0 ? true : false;
};

export const isGameboardEmpty = function (gameboard: Gameboard) {
  const updatedGameboard = [...gameboard];
  const cells = updatedGameboard.flat(1);
  return cells.every((cell) => isCellEmpty(cell));
};

export const checkWin = function (updatedGameboard: Gameboard) {
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
