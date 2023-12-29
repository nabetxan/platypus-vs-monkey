import Player, { Piece } from "./Player";

const PlayerField: React.FC<{
  P: Player;
  scoreKeep: number[];
  playerPiece: Piece[];
  opponentPiece: Piece[];
  currentPlayer: Player;
  selectedPieceAndPlayer: (number | Player | string | boolean)[];
  setSelectedPieceAndPlayer: React.Dispatch<React.SetStateAction<any>>;
  winnerPlayer?: Player;
}> = function ({
  P,
  scoreKeep,
  playerPiece,
  opponentPiece,
  currentPlayer,
  selectedPieceAndPlayer,
  setSelectedPieceAndPlayer,
  winnerPlayer
}) {
  const handlePieceSelect = function (index: number, player: Player) {
    // if it's not your turn, return
    if (currentPlayer !== player) return;
    // if the game is finished, return
    if (winnerPlayer) return;
    // if it's in the middle of piece swap, return
    if (selectedPieceAndPlayer[3]) return;

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
      index === selectedPieceAndPlayer[0] &&
      currentSelectedPieceSize === selectedPieceAndPlayer[2]
    ) {
      setSelectedPieceAndPlayer([]);
    } else {
      setSelectedPieceAndPlayer([
        index,
        currentPlayer,
        currentSelectedPieceSize,
        //is the piece selected from board?
        false
      ]);
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
            if (
              currentPlayer === P &&
              selectedPieceAndPlayer[0] === piece.index
            ) {
              classname = classname + " selected";
            }
            if (piece.size === "S") {
              classname = classname + " small";
            }
            if (piece.size === "M") {
              classname = classname + " medium";
            }
            if (piece.size === "L") {
              classname = classname + " large";
            }
            return (
              <div
                className={classname}
                onClick={() => handlePieceSelect(piece.index, P)}
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
