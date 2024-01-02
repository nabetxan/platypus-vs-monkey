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
    this.piece = [
      { character: this.char, index: 0, size: "small", player: this },
      { character: this.char, index: 1, size: "small", player: this },
      { character: this.char, index: 2, size: "medium", player: this },
      { character: this.char, index: 3, size: "medium", player: this },
      { character: this.char, index: 4, size: "large", player: this },
      { character: this.char, index: 5, size: "large", player: this }
    ];
    this.generateDefaultPieces();
  }

  private generateDefaultPieces() {
    this.piece = [
      { character: this.char, index: 0, size: "small", player: this },
      { character: this.char, index: 1, size: "small", player: this },
      { character: this.char, index: 2, size: "medium", player: this },
      { character: this.char, index: 3, size: "medium", player: this },
      { character: this.char, index: 4, size: "large", player: this },
      { character: this.char, index: 5, size: "large", player: this }
    ];
  }

  resetPiece() {
    this.generateDefaultPieces();
  }
}
