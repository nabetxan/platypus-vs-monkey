import Player, { Piece, Size } from "./Player";

export type SelectedPieceAndPlayer = {
  index?: number;
  currentPlayer?: Player;
  currentSelectedPieceSize?: Size;
  isPieceSelectedFromBoard?: boolean;
  positionOnBoard?: number[];
  pieceInfo: Piece;
};

const PlayerField: React.FC<{
  P: Player;
  scoreKeep: number[];
  playerPiece: Piece[];
  opponentPiece: Piece[];
  currentPlayer: Player;
  selectedPieceAndPlayer: SelectedPieceAndPlayer;
  onChange: (selectedPP: SelectedPieceAndPlayer) => void;
  winnerPlayer?: Player;
}> = function ({
  P,
  scoreKeep,
  playerPiece,
  opponentPiece,
  currentPlayer,
  selectedPieceAndPlayer,
  onChange,
  winnerPlayer
}) {
  const handlePieceSelect = function (index: number, player: Player) {
    // if it's not your turn, return
    if (currentPlayer !== player) return;
    // if the game is finished, return
    if (winnerPlayer) return;
    // if it's in the middle of piece swap, return
    if (selectedPieceAndPlayer.isPieceSelectedFromBoard) return;

    let currentPlayerPiece;
    currentPlayer === P
      ? (currentPlayerPiece = [...playerPiece])
      : (currentPlayerPiece = [...opponentPiece]);

    const currentSelectedPieceIndex = currentPlayerPiece.findIndex(
      (piece) => piece.index === index
    );

    const currentSelectedPieceSize =
      currentPlayerPiece[currentSelectedPieceIndex].size;

    if (
      index === selectedPieceAndPlayer.index &&
      currentSelectedPieceSize ===
        selectedPieceAndPlayer.currentSelectedPieceSize
    ) {
      return;
      // TODO:default valueを渡すべき？
    } else {
      onChange({
        index: index,
        currentPlayer: currentPlayer,
        currentSelectedPieceSize: currentSelectedPieceSize,
        isPieceSelectedFromBoard: false
      });
    }
  };
  return (
    <>
      <div id="player-field">
        <div className="name">{P.name}</div>
        <div className="score">{scoreKeep[0]}</div>
        <div id="player-fieldーpieces">
          {playerPiece.map((piece: Piece) => {
            let classname = "piece";
            classname = classname + " " + piece.size;

            if (
              currentPlayer === P &&
              selectedPieceAndPlayer.index === piece.index
            ) {
              classname = classname + " selected";
            }
            return (
              <div
                className={classname}
                onClick={() => handlePieceSelect(piece.index, P)}
                style={{ borderColor: P.color }}
              >
                <img src={P.char} alt="player-character"></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlayerField;
