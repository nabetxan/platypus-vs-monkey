import { Piece, PlayerRecord, Status } from "../lib/types";

export default class Player {
  name: string;
  char: string;
  color: string;
  piece: Piece[];
  status: Status;
  record: PlayerRecord;
  constructor(
    name: string,
    char: string,
    color: string,
    status: Status,
    record: number
  ) {
    this.name = name;
    this.char = char;
    this.color = color;
    this.status = status;
    this.record = {
      win: record
    };
    this.piece = this.generateDefaultPieces();
  }

  private generateDefaultPieces(): Piece[] {
    return [
      { character: this.char, index: 0, size: "small", player: this },
      { character: this.char, index: 1, size: "small", player: this },
      { character: this.char, index: 2, size: "medium", player: this },
      { character: this.char, index: 3, size: "medium", player: this },
      { character: this.char, index: 4, size: "large", player: this },
      { character: this.char, index: 5, size: "large", player: this }
    ];
  }

  resetPiece() {
    this.piece = this.generateDefaultPieces();
  }
}
