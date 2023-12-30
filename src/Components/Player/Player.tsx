export type Piece = {
  character: string;
  index: number;
  size: Size;
  player: Player;
};

export type Size = "small" | "medium" | "large";

export default class Player {
  name: string;
  char: string;
  color: string;
  piece: Piece[];
  constructor(name: string, char: string, color: string) {
    this.name = name;
    this.char = char;
    this.color = color;
    this.piece = [
      { character: this.char, index: 0, size: "small", player: this },
      { character: this.char, index: 1, size: "small", player: this },
      { character: this.char, index: 2, size: "medium", player: this },
      { character: this.char, index: 3, size: "medium", player: this },
      { character: this.char, index: 4, size: "large", player: this },
      { character: this.char, index: 5, size: "large", player: this }
    ];
  }
}
