import { Piece } from "../Player/Player";

export default class Cell {
  pieces: Piece[];
  constructor() {
    this.pieces = [];
  }
}

export type Gameboard = Cell[][];

export const generateBlankGameboard = function () {
  return [
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell()]
  ];
};
