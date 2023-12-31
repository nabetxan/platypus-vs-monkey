import Player, { Piece, Size } from "./Player";

export type SelectedPieceAndPlayer = {
  index?: number;
  currentPlayer?: Player;
  pieceSize?: Size;
  isSelectedFromBoard?: boolean;
  positionOnBoard?: number[];
  pieceInfo?: Piece;
};

const PlayerField: React.FC<{
  player: Player;
  opponent: Player;
  currentPlayer: Player;
  selectedPnP: SelectedPieceAndPlayer;
  onChange: (selectedPP: SelectedPieceAndPlayer) => void;
  winner?: Player;
  scoreKeep: number[];
}> = function ({
  player,
  opponent,
  currentPlayer,
  selectedPnP,
  onChange,
  winner,
  scoreKeep
}) {
  const handlePieceSelect = function (index: number, player: Player) {
    // if it's not your turn, return
    if (currentPlayer !== player) return;
    // if the game is finished, return
    if (winner) return;
    // if it's in the middle of piece swap, return
    if (selectedPnP.isSelectedFromBoard) return;

    let currentPlayerPiece;
    currentPlayer === player
      ? (currentPlayerPiece = [...player.piece])
      : (currentPlayerPiece = [...opponent.piece]);

    const currentSelectedPieceIndex = currentPlayerPiece.findIndex(
      (piece) => piece.index === index
    );

    const currentSelectedPieceSize =
      currentPlayerPiece[currentSelectedPieceIndex].size;

    if (
      index === selectedPnP.index &&
      currentSelectedPieceSize === selectedPnP.pieceSize
    ) {
      return;
      // TODO:default valueを渡すべき？
    } else {
      onChange({
        index: index,
        currentPlayer: currentPlayer,
        pieceSize: currentSelectedPieceSize,
        isSelectedFromBoard: false
      });
    }
  };
  return (
    <>
      <div id="player-field">
        <div className="name">{player.name}</div>
        <div className="score">{scoreKeep[0]}</div>
        <div id="player-fieldーpieces">
          {player.piece.map((piece: Piece) => {
            let classname = "piece";
            classname = classname + " " + piece.size;

            if (currentPlayer === player && selectedPnP.index === piece.index) {
              classname = classname + " selected";
            }
            return (
              <div
                className={classname}
                onClick={() => handlePieceSelect(piece.index, player)}
                style={{ borderColor: player.color }}
              >
                <img src={player.char} alt="player-character"></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayerField;
