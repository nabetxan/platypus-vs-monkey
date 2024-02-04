import { GameStatus, Piece } from "../lib/types";
import Player from "../models/player";

const PlayerField: React.FC<{
  player: Player;
  opponent: Player;
  gameStatus: GameStatus;
  onChange: (gameStatus: GameStatus) => void;
}> = function ({ player, opponent, gameStatus, onChange }) {
  const currentPlayer = gameStatus.isP1CurrentPlayer
    ? gameStatus.P1
    : gameStatus.P2;
  const PnP = gameStatus.selectedPnP;
  const handlePieceSelect = function (index: number, player: Player) {
    // if it's not your turn, return
    if (currentPlayer !== player) return;
    // if the game is finished, return
    if (gameStatus.winner) return;
    // if it's in the middle of piece swap, return
    if (PnP?.isSelectedFromBoard) return;

    let currentPlayerPiece;
    currentPlayer === player
      ? (currentPlayerPiece = [...player.piece])
      : (currentPlayerPiece = [...opponent.piece]);
    const currentSelectedPieceIndex = currentPlayerPiece.findIndex(
      (piece) => piece.index === index
    );
    const currentSelectedPieceSize =
      currentPlayerPiece[currentSelectedPieceIndex].size;

    if (index === PnP?.index && currentSelectedPieceSize === PnP.pieceSize) {
      return;
    } else {
      const newGameStatus = {
        ...gameStatus,
        selectedPnP: {
          ...gameStatus.selectedPnP,
          index: index,
          pieceSize: currentSelectedPieceSize,
          isSelectedFromBoard: false
        }
      };
      onChange(newGameStatus);
    }
  };
  return (
    <div id="player-field">
      <div id="name_and_score">
        <div id="name">{player.name}</div>
        <div id="score">{player.record.win}</div>
      </div>
      <div id="player-field-pieces">
        {player.piece.map((piece: Piece) => {
          let classname = "piece";
          if (currentPlayer !== player) {
            classname = "disabled-piece";
          }
          classname = classname + " " + piece.size;
          if (currentPlayer === player && PnP?.index === piece.index) {
            classname = classname + " selected";
          }
          return (
            <div
              className={classname}
              onClick={() => handlePieceSelect(piece.index, player)}
              style={{ borderColor: player.color }}
              key={`${piece.index}`}
            >
              <img src={player.char} alt="player-character"></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerField;
