type Piece = {
  character: string;
  index: number;
  size: "S" | "M" | "L";
  player: unknown;
};

export default class Player {
  name: string;
  char: string;
  piece: Piece[];
  constructor(name: string, char: string) {
    this.name = name;
    this.char = char;
    this.piece = [
      { character: this.char, index: 0, size: "S", player: this },
      { character: this.char, index: 1, size: "S", player: this },
      { character: this.char, index: 2, size: "M", player: this },
      { character: this.char, index: 3, size: "M", player: this },
      { character: this.char, index: 4, size: "L", player: this },
      { character: this.char, index: 5, size: "L", player: this }
    ];
  }
}
