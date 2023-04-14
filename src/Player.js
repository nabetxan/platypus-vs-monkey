export class Player {
  constructor(name, char) {
    this.name = name;
    this.char = char;
    this.piece = [
      { character: this.char, index: 0, size: "S" },
      { character: this.char, index: 1, size: "S" },
      { character: this.char, index: 2, size: "M" },
      { character: this.char, index: 3, size: "M" },
      { character: this.char, index: 4, size: "L" },
      { character: this.char, index: 5, size: "L" },
    ];
  }
}
