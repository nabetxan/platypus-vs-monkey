import Cell from "../models/cell";
import Player from "../models/player";

export type Gameboard = Cell[][];

export type GameStatus = {
  P1: Player;
  P2: Player;
  isP1CurrentPlayer: boolean;
  selectedPnP?: SelectedPieceAndPlayer;
  winner?: Player;
};

export type SelectedPieceAndPlayer = {
  index?: number;
  pieceSize?: Size;
  isSelectedFromBoard?: boolean;
  positionOnBoard?: number[];
  pieceInfo?: Piece;
};

export type Piece = {
  character: string;
  index: number;
  size: Size;
  player: Player;
};

export type Status = "P1" | "P2" | "not-in-play";

export type Size = "small" | "medium" | "large";

export type PlayerRecord = {
  win: number;
};
